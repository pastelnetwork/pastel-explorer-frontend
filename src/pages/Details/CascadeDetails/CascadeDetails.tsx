import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { decode } from 'js-base64';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import useCascadeDetails from '@hooks/useCascadeDetails';
import { getParameterByName } from '@utils/helpers/url';
import { IActionTicket, ICascadeApiTicket } from '@utils/types/ITransactions';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import FileInfo from './FileInfo';
import * as Styles from './CascadeDetails.styles';

interface IBlockItemLayout {
  title: string;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  customTitle?: React.ReactNode;
}

export const BlockItemLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  customTitle,
}) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      {!customTitle ? <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle> : customTitle}
      <Styles.BlockWrapper className={childrenClassName}>{children}</Styles.BlockWrapper>
    </TableStyles.BlockWrapper>
  );
};

const CascadeDetails = () => {
  const txid = getParameterByName('txid');
  const { cascadeData, isLoading } = useCascadeDetails(txid);

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
    };
  };

  return cascadeData ? (
    <Styles.Wrapper>
      <Grid container direction="column" spacing={2}>
        <TransactionStyles.TransactionDesc item className="alert-wrapper">
          <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
            <AlertTitle className="alert-title">
              {translate('pages.cascade.ticketDetail')}:{' '}
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
          <BlockItemLayout title={translate('pages.cascade.fileInfo')} className="file-info">
            <FileInfo data={getCascadeInfo()} />
          </BlockItemLayout>
        </Styles.ContentWrapper>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {translate('pages.cascade.404')}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {translate('pages.cascade.cascadeNotFound')}
      </Typography>
    </Styles.Wrapper>
  );
};

export default CascadeDetails;
