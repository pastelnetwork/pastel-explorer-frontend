import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '@components/Header/Header';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import usePastelIdDetails from '@hooks/usePastelIdDetails';

import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as Styles from './PastelIdDetails.styles';
import TicketsList from './TicketList';
import Overview from './Overview';
import { TICKET_TYPE_OPTIONS, TTicketsTypeProps } from './PastelIdDetails.helpers';

interface ParamTypes {
  id: string;
}

const limit = 6;

type TPastelIdDetailsRef = {
  offset: number;
  totalTickets: number;
  type: string;
  size: number;
};

const PastelIdDetails = () => {
  const fetchParams = useRef<TPastelIdDetailsRef>({
    offset: 0,
    type: TICKET_TYPE_OPTIONS[0].value,
    totalTickets: 0,
    size: 1,
  });
  const { id } = useParams<ParamTypes>();
  const [ticketType, setTicketType] = useState<string>(TICKET_TYPE_OPTIONS[0].value);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [senses, setSenses] = useState<TSenseRequests[]>([]);
  const [ticketsTypeList, setTicketsTypeList] = useState<TTicketsTypeProps[]>([]);
  const pastelIdData = usePastelIdDetails(id, limit, ticketType);

  const handleTicketTypeChange = (val: string) => {
    setTicketType(val);
    fetchParams.current.type = val;
    fetchParams.current.offset = 0;
    fetchParams.current.totalTickets = 0;
    fetchParams.current.size = 1;
    pastelIdData.setSize(1);
  };

  const handleFetchMore = (newOffset: number, newSize: number) => {
    pastelIdData.setSize(newSize);
  };

  const handleScroll = () => {
    const list = document.getElementById('list');
    const clientHeight = list?.clientHeight || 0;
    const offsetTop = list?.offsetTop || 0;
    if (
      window.scrollY + window.innerHeight >= clientHeight / 2 + offsetTop &&
      fetchParams.current.offset <= fetchParams.current.totalTickets
    ) {
      fetchParams.current.offset += limit;
      fetchParams.current.size += 1;
      handleFetchMore(fetchParams.current.offset, fetchParams.current.size);
    }
  };

  useEffect(() => {
    if (!pastelIdData.isLoading) {
      setTicketsTypeList(pastelIdData.ticketsType);
      fetchParams.current.totalTickets = pastelIdData.total;
      setTickets(pastelIdData.data);
      setSenses(pastelIdData.senses);
    }
  }, [pastelIdData.isLoading, ticketType, pastelIdData.data.length]);

  useEffect(() => {
    (async () => {
      pastelIdData.setSize(1);
      fetchParams.current.size = 1;
      fetchParams.current.offset = 0;
      setTicketType(TICKET_TYPE_OPTIONS[0].value);
      window.addEventListener('scroll', handleScroll);
    })();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  return (
    <Styles.Wrapper>
      <Header title="Pastel ID Details" />
      <Grid container direction="column">
        <Styles.GridStyle item>
          <Overview
            totalTickets={pastelIdData.totalAllTickets}
            pastelId={id}
            ticketsTypeList={ticketsTypeList}
          />
        </Styles.GridStyle>
        <Styles.GridStyle item id="list">
          <TicketsList
            data={tickets}
            ticketType={ticketType}
            onTicketTypeChange={handleTicketTypeChange}
            totalTickets={pastelIdData.total}
            totalAllTickets={pastelIdData.totalAllTickets}
            ticketsTypeList={ticketsTypeList}
            isLoading={pastelIdData.isLoading}
            senses={senses}
          />
        </Styles.GridStyle>
      </Grid>
      {pastelIdData.isLoading ? (
        <TransactionStyles.LoadingWrapper className="loading-wrapper">
          <TransactionStyles.Loader>
            <CircularProgress size={40} />
          </TransactionStyles.Loader>
        </TransactionStyles.LoadingWrapper>
      ) : null}
    </Styles.Wrapper>
  );
};

export default PastelIdDetails;
