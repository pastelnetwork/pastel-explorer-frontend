import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { decode } from 'js-base64';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import useCascadeDetails from '@hooks/useCascadeDetails';
import { getParameterByName } from '@utils/helpers/url';
import { IActionTicket, ICascadeApiTicket } from '@utils/types/ITransactions';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { axiosInstance } from '@utils/helpers/useFetch/useFetch';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as NftDetailsStyles from '@pages/Details/NftDetails/NftDetails.styles';

import FileInfo from './FileInfo';
import Transfers from './Transfers';
import * as Styles from './CascadeDetails.styles';

interface IBlockItemLayout {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  titleClassName?: string;
  customTitle?: React.ReactNode;
}

export const BlockItemLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  titleClassName = '',
  customTitle,
}) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      {!customTitle ? (
        <TableStyles.BlockTitle className={titleClassName}>{title}</TableStyles.BlockTitle>
      ) : (
        customTitle
      )}
      <Styles.BlockWrapper className={childrenClassName}>{children}</Styles.BlockWrapper>
    </TableStyles.BlockWrapper>
  );
};

let timeout: NodeJS.Timeout | null = null;

const CascadeDetails = () => {
  const [status, setStatus] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fileId, setFileId] = useState('');
  const [downloadStatus, setDownloadStatus] = useState({
    totalVolumes: 0,
    downloadedVolumes: 0,
    volumesDownloadInProgress: 0,
    volumesPendingDownload: 0,
    volumesDownloadFailed: 0,
    taskStatus: '',
    sizeOfTheFileMegabytes: 0,
    dataDownloadedMegabytes: 0,
    details: null,
  });
  const txid = getParameterByName('txid');
  const { cascadeData, isLoading } = useCascadeDetails(txid);

  const handleReloadPage = (e: BeforeUnloadEvent) => {
    if (status === 'downloading') {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const checkDownloadStatus = async (_fileId: string) => {
    const url = `${process.env.REACT_APP_EXPLORER_OPENNODE_API_URL}/openapi/cascade/downloads/${_fileId}/status`;
    axiosInstance
      .get(url, { responseType: 'blob' })
      .then(res => {
        if (res?.data) {
          setDownloadStatus({
            totalVolumes: res.data.total_volumes,
            downloadedVolumes: res.data.downloaded_volumes,
            volumesDownloadInProgress: res.data.volumes_download_in_progress,
            volumesPendingDownload: res.data.volumes_pending_download,
            volumesDownloadFailed: res.data.volumes_download_failed,
            taskStatus: res.data.task_status,
            sizeOfTheFileMegabytes: res.data.size_of_the_file_megabytes,
            dataDownloadedMegabytes: res.data.data_downloaded_megabytes,
            details: res.data.details,
          });
          if ((res.data.task_status === 'Completed' || res.data.task_status === 'Failed') && timeout) {
            clearInterval(timeout);
          }
        }
      })
      .catch(() => {
        setStatus('error');
        if (timeout) {
          clearInterval(timeout);
        }
      });
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleReloadPage);
    return () => {
      window.removeEventListener('beforeunload', handleReloadPage);
    };
  }, [status]);

  useEffect(() => {
    if (fileId) {
      timeout = setInterval(() => {
        checkDownloadStatus(fileId);
      }, 5000) // ~ 1s
    }
  }, [fileId])

  const decodeApiTicket = (apiTicket: string) => {
    let data = null;
    try {
      data = JSON.parse(decode(apiTicket)) as ICascadeApiTicket;
    } catch {
      try {
        data = ascii85.decode(apiTicket) as ICascadeApiTicket;
      } catch (error) {
        console.error(error);
      }
    }

    return data;
  };

  const getCascadeInfo = () => {
    if (!cascadeData?.ticket) {
      return null;
    }
    const actionTicket = cascadeData?.ticket?.action_ticket;
    const parseActionTicket = JSON.parse(decode(actionTicket)) as IActionTicket;
    const apiTicket = decodeApiTicket(parseActionTicket.api_ticket) as ICascadeApiTicket;
    return {
      ...apiTicket,
      creatorPastelID: cascadeData.creatorPastelID,
      currentOwnerPastelID: cascadeData.currentOwnerPastelID,
    };
  };

  const getCascadeMultiVolumeInfo = () => {
    if (!cascadeData?.ticket?.contract_ticket) {
      return null;
    }
    const contractTicket = cascadeData?.ticket?.contract_ticket;
    const parseActionTicket = JSON.parse(decode(contractTicket));
    return {
      ...cascadeData,
      ...parseActionTicket,
      contract_ticket: undefined,
    };
  };

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

  const handleDownloadFile = () => {
    const fileType = getCascadeInfo()?.file_type;
    const fileName = getCascadeInfo()?.file_name;

    if (fileName && fileType && txid) {
      setOpenSnackbar(true);
      setStatus('downloading');
      const url = `${process.env.REACT_APP_EXPLORER_OPENNODE_API_URL}/get_publicly_accessible_cascade_file_by_registration_ticket_txid/${txid}`;
      const link = document.createElement('a');
      link.target = '_blank';
      link.download = fileName;
      axiosInstance
        .get(url, { responseType: 'blob' })
        .then(res => {
          // link.href = URL.createObjectURL(new Blob([res.data], { type: fileType }));
          // link.click();
          // setStatus('done');
          if (res?.data?.file_id) {
            setFileId(res.data.file_id)
          }
        })
        .catch(() => {
          setStatus('error');
        });
    }
  };

  const handleDownloadMultiVolumeFile = () => {
    const cascadeInfo = getCascadeMultiVolumeInfo();

    if (cascadeInfo?.creatorPastelID && txid) {
      setOpenSnackbar(true);
      setStatus('downloading');
      const url = `${process.env.REACT_APP_EXPLORER_OPENNODE_API_URL}/openapi/cascade/v2/download?pid=${cascadeInfo?.creatorPastelID}&txid=${txid}`;
      const link = document.createElement('a');
      link.target = '_blank';
      link.download = cascadeInfo.name_of_original_file;
      axiosInstance
        .get(url, { responseType: 'blob' })
        .then(res => {
          link.href = URL.createObjectURL(new Blob([res.data]));
          link.click();
          setStatus('done');
        })
        .catch(() => {
          setStatus('error');
        });
    }
  };

  const getSummaryTitle = () => {
    const cascadeInfo = getCascadeInfo();
    if (!cascadeInfo?.make_publicly_accessible) {
      return parse(translate('pages.cascade.fileInfo'));
    }

    return (
      <NftDetailsStyles.SummaryTitleWrapper>
        {parse(translate('pages.cascade.fileInfo'))}
        <NftDetailsStyles.DownloadButton
          type="button"
          onClick={handleDownloadFile}
          disabled={!cascadeInfo.file_name || status === 'downloading'}
        >
          {status === 'downloading'
            ? parse(translate('pages.cascade.downloading'))
            : parse(translate('pages.nftDetails.downloadThisFile'))}
        </NftDetailsStyles.DownloadButton>
      </NftDetailsStyles.SummaryTitleWrapper>
    );
  };

  const getMultiVolumeSummaryTitle = () => {
    const cascadeInfo = getCascadeMultiVolumeInfo();
    return (
      <NftDetailsStyles.SummaryTitleWrapper>
        {parse(translate('pages.cascade.fileInfo'))}
        <NftDetailsStyles.DownloadButton
          type="button"
          onClick={handleDownloadMultiVolumeFile}
          disabled={!cascadeInfo?.name_of_original_file || status === 'downloading'}
        >
          {status === 'downloading'
            ? parse(translate('pages.cascade.downloading'))
            : parse(translate('pages.nftDetails.downloadThisFile'))}
        </NftDetailsStyles.DownloadButton>
      </NftDetailsStyles.SummaryTitleWrapper>
    );
  };

  if (cascadeData?.ticket?.sub_type === 'cascade_multi_volume_metadata') {
    return (
      <Styles.Wrapper>
        <Grid container direction="column" spacing={2}>
          <TransactionStyles.TransactionDesc item className="alert-wrapper">
            <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
              <AlertTitle className="alert-title">
                {parse(translate('pages.cascade.ticketDetail'))}:{' '}
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${cascadeData?.txid}`}
                  value={cascadeData?.txid || ''}
                  title={cascadeData?.txid}
                  className="address-link"
                />
              </AlertTitle>
            </TransactionStyles.ViewTransactionRawMuiAlert>
          </TransactionStyles.TransactionDesc>
          <Styles.ContentWrapper>
            <BlockItemLayout
              title={getMultiVolumeSummaryTitle()}
              className="file-info"
              titleClassName='file-info-title-block'
            >
              <FileInfo data={getCascadeMultiVolumeInfo()} />
            </BlockItemLayout>
          </Styles.ContentWrapper>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={downloadStatus?.taskStatus}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert elevation={6} variant="filled" severity="info">
            <Styles.SnackbarContent>
              <div>
                {parse(translate('pages.cascade.totalVolumes'))}: {downloadStatus.totalVolumes}
              </div>
              <div>
              {parse(translate('pages.cascade.downloadedVolumes'))}: {downloadStatus.downloadedVolumes}
              </div>
              <div>
              {parse(translate('pages.cascade.volumesDownloadInProgress'))}: {downloadStatus.volumesDownloadInProgress}
              </div>
              <div>
              {parse(translate('pages.cascade.volumesPendingDownload'))}: {downloadStatus.volumesPendingDownload}
              </div>
              <div>
              {parse(translate('pages.cascade.volumesDownloadFailed'))}: {downloadStatus.volumesDownloadFailed}
              </div>
            </Styles.SnackbarContent>
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={status === 'error'}
          onClose={() => setStatus('')}
          autoHideDuration={7000}
        >
          <Styles.AlterDownload
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => setStatus('')}
          >
            {parse(translate('pages.cascade.downloadFailedNetworkError'))}
          </Styles.AlterDownload>
        </Snackbar>
      </Styles.Wrapper>
    )
  }

  return cascadeData ? (
    <Styles.Wrapper>
      <Grid container direction="column" spacing={2}>
        <TransactionStyles.TransactionDesc item className="alert-wrapper">
          <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
            <AlertTitle className="alert-title">
              {parse(translate('pages.cascade.ticketDetail'))}:{' '}
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${cascadeData?.txid}`}
                value={cascadeData?.txid || ''}
                title={cascadeData?.txid}
                className="address-link"
              />
            </AlertTitle>
          </TransactionStyles.ViewTransactionRawMuiAlert>
        </TransactionStyles.TransactionDesc>
        <Styles.ContentWrapper>
          <BlockItemLayout
            title={getSummaryTitle()}
            className="file-info"
            titleClassName={
              getCascadeInfo()?.make_publicly_accessible ? 'file-info-title-block' : ''
            }
          >
            <FileInfo data={getCascadeInfo()} />
          </BlockItemLayout>
          <BlockItemLayout
            title={parse(translate('pages.cascade.transfers'))}
            childrenClassName="no-spacing"
          >
            <Transfers />
          </BlockItemLayout>
        </Styles.ContentWrapper>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={7000}
      >
        <Alert elevation={6} variant="filled" severity="info">
          <Styles.SnackbarContent>
            {parse(translate('pages.cascade.downloadInfo'))}
          </Styles.SnackbarContent>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={status === 'error'}
        onClose={() => setStatus('')}
        autoHideDuration={7000}
      >
        <Styles.AlterDownload
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => setStatus('')}
        >
          {parse(translate('pages.cascade.downloadFailedNetworkError'))}
        </Styles.AlterDownload>
      </Snackbar>
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid
        container
        sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        spacing={2}
      >
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {parse(translate('pages.cascade.404'))}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {parse(translate('pages.cascade.cascadeNotFound'))}
      </Typography>
    </Styles.Wrapper>
  );
};

export default CascadeDetails;
