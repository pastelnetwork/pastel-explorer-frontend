import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '@components/Header/Header';
import TicketsList from '@pages/Details/BlockDetails/Tickets';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ITicket } from '@utils/types/ITransactions';
import * as URLS from '@utils/constants/urls';

import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as Styles from './PastelIdDetails.styles';

interface ParamTypes {
  id: string;
}

const PastelIdDetails = () => {
  const { id } = useParams<ParamTypes>();
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const { fetchData } = useFetch<{ data: ITicket[] }>({
    method: 'get',
    url: `${URLS.PASTEL_ID_URL}/${id}`,
  });

  useEffect(() => {
    fetchData().then(response => {
      if (response?.data) {
        setTickets(response.data);
      }
    });
  }, [id]);

  return tickets.length ? (
    <Styles.Wrapper>
      <Header title="Pastel ID Details" />
      <Grid container direction="column">
        <Styles.GridStyle item>
          <TicketsList data={tickets} />
        </Styles.GridStyle>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <TransactionStyles.LoadingWrapper>
      <TransactionStyles.Loader>
        <CircularProgress size={40} />
      </TransactionStyles.Loader>
    </TransactionStyles.LoadingWrapper>
  );
};

export default PastelIdDetails;
