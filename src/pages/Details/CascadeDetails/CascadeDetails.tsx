import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { decode } from 'js-base64';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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

const CascadeDetails = () => {
  const [status, setStatus] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const txid = getParameterByName('txid');
  const { cascadeData, isLoading } = useCascadeDetails(txid);

  const handleReloadPage = (e: BeforeUnloadEvent) => {
    if (status === 'downloading') {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleReloadPage);
    return () => {
      window.removeEventListener('beforeunload', handleReloadPage);
    };
  }, [status]);

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

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
          link.href = URL.createObjectURL(new Blob([res.data], { type: fileType }));
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
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
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
