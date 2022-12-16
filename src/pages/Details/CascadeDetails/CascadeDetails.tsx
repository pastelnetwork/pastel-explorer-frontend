import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Header from '@components/Header/Header';
import CopyButton from '@components/CopyButton/CopyButton';
import { TCascadeRequests } from '@utils/types/ITransactions';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';

import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as SenseDetailsStyles from '@pages/Details/SenseDetails/SenseDetails.styles';
import * as Styles from './CascadeDetails.styles';

import CascadeRawData from './CascadeRawData';

interface IParamTypes {
  id: string;
}

const CascadeDetails = () => {
  const { id } = useParams<IParamTypes>();
  const [cascade, setCascade] = useState<TCascadeRequests | null>(null);
  const [openRawDataModal, setOpenRawDataModal] = useState(false);

  const toggleOpenRawData = () => setOpenRawDataModal(prevState => !prevState);

  const fetchSenses = useFetch<{ data: TCascadeRequests }>({
    method: 'get',
    url: `${URLS.CASCADE_URL}/${id}`,
  });

  const handleCascadeFetch = () => {
    fetchSenses.fetchData().then(response => {
      if (response?.data) {
        setCascade(response.data);
      }
    });
  };

  useEffect(() => {
    handleCascadeFetch();
  }, [id]);

  const getRawData = () => {
    if (!cascade?.rawData) {
      return '';
    }
    const rawData = JSON.parse(cascade.rawData);
    return JSON.stringify(JSON.stringify(rawData));
  };

  return (
    <Styles.Wrapper>
      <Header title="Cascade Details" />
      <Grid container direction="column" spacing={2}>
        <TransactionStyles.TransactionDesc item>
          <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
            <AlertTitle className="alert-title">
              Cascade ID: {cascade?.cascadeId}{' '}
              <span>
                (
                <SenseDetailsStyles.RawDataWrapper>
                  <CopyButton copyText={cascade?.rawData ? JSON.parse(getRawData()) : ''} />
                  <SenseDetailsStyles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
                    View Cascade Raw Data
                  </SenseDetailsStyles.ViewTransactionRaw>
                </SenseDetailsStyles.RawDataWrapper>
                )
              </span>
            </AlertTitle>
          </TransactionStyles.ViewTransactionRawMuiAlert>
        </TransactionStyles.TransactionDesc>
      </Grid>
      <CascadeRawData
        rawData={getRawData()}
        open={openRawDataModal}
        toggleOpen={toggleOpenRawData}
      />
    </Styles.Wrapper>
  );
};

export default CascadeDetails;
