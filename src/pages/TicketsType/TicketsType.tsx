import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '@components/Header/Header';
import useTicketsType from '@hooks/useTicketsType';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import { TTicketsTypeProps } from '@pages/Details/PastelIdDetails/PastelIdDetails.helpers';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import TicketsList from './TicketList';
import * as Styles from './TicketsType.styles';

interface ParamTypes {
  type: string;
}

type TPastelIdDetailsRef = {
  offset: number;
  totalTickets: number;
  type: string;
  size: number;
};

const LIMIT = 6;

const TicketsType: React.FC = () => {
  const { type } = useParams<ParamTypes>();
  const fetchParams = useRef<TPastelIdDetailsRef>({
    offset: 0,
    type,
    totalTickets: 0,
    size: 1,
  });
  const [selectedType, setTicketType] = useState<string>(type);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [senses, setSenses] = useState<TSenseRequests[]>([]);
  const [ticketsTypeList, setTicketsTypeList] = useState<TTicketsTypeProps[]>([]);
  const { data, total, isLoading, setSize, totalAllTickets, ticketsType } = useTicketsType(
    selectedType,
    LIMIT,
    true,
  );

  const handleTicketTypeChange = (val: string) => {
    setTicketType(val);
    fetchParams.current.type = val;
    fetchParams.current.offset = 0;
    fetchParams.current.totalTickets = 0;
    fetchParams.current.size = 1;
    setSize(1);
  };

  const handleScroll = () => {
    const list = document.getElementById('list');
    const clientHeight = list?.clientHeight || 0;
    const offsetTop = list?.offsetTop || 0;
    if (
      window.scrollY + window.innerHeight >= clientHeight / 2 + offsetTop &&
      fetchParams.current.offset <= fetchParams.current.totalTickets
    ) {
      fetchParams.current.offset += LIMIT;
      fetchParams.current.size += 1;
      setSize(fetchParams.current.size);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setTicketsTypeList(ticketsType);
      fetchParams.current.totalTickets = total;
      setTickets(data);
      setSenses(senses);
    }
  }, [isLoading, selectedType, data.length]);

  useEffect(() => {
    (async () => {
      setTicketType(type);
      setSize(1);
      fetchParams.current.size = 1;
      fetchParams.current.offset = 0;
      fetchParams.current.type = type;
      window.addEventListener('scroll', handleScroll);
    })();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [type]);

  return (
    <Styles.TicketsContainer>
      <Header title="Tickets" />
      <Grid container direction="column">
        <Styles.GridStyle item id="list">
          <TicketsList
            data={tickets}
            ticketType={selectedType}
            onTicketTypeChange={handleTicketTypeChange}
            totalTickets={total}
            totalAllTickets={totalAllTickets}
            ticketsTypeList={ticketsTypeList}
            isLoading={isLoading}
            senses={senses}
          />
        </Styles.GridStyle>
      </Grid>
      {isLoading ? (
        <TransactionStyles.LoadingWrapper className="loading-wrapper">
          <TransactionStyles.Loader>
            <CircularProgress size={40} />
          </TransactionStyles.Loader>
        </TransactionStyles.LoadingWrapper>
      ) : null}
    </Styles.TicketsContainer>
  );
};

export default TicketsType;
