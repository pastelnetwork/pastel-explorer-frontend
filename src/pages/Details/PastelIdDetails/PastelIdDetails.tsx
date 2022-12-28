import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '@components/Header/Header';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ITicket } from '@utils/types/ITransactions';
import * as URLS from '@utils/constants/urls';

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
};

const PastelIdDetails = () => {
  const fetchParams = useRef<TPastelIdDetailsRef>({
    offset: 0,
    type: TICKET_TYPE_OPTIONS[0].value,
    totalTickets: 0,
  });
  const { id } = useParams<ParamTypes>();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [ticketType, setTicketType] = useState<string>(TICKET_TYPE_OPTIONS[0].value);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalAllTickets, setTotalAllTickets] = useState(0);
  const [ticketsTypeList, setTicketsTypeList] = useState<TTicketsTypeProps[]>([]);

  const { fetchData, isLoading } = useFetch<{
    data: ITicket[];
    total: number;
    totalAllTickets: number;
    ticketsType: TTicketsTypeProps[];
  }>({
    method: 'get',
    url: `${URLS.PASTEL_ID_URL}/${id}`,
  });

  const handleFetchPastelId = async (isReplace = false) => {
    const params: Record<string, string | number> = {
      offset: fetchParams.current.offset,
      limit,
      type: fetchParams.current.type,
    };
    if (!isLoading) {
      fetchData({ params }).then(response => {
        if (response) {
          if (response?.data) {
            if (isReplace) {
              setTickets(response.data);
            } else {
              setTickets(prevState => [...prevState, ...response.data]);
            }
          } else if (isReplace) {
            setTickets([]);
          }
          setTotalTickets(response.total);
          setTotalAllTickets(response.totalAllTickets);
          setTicketsTypeList(response.ticketsType);
          fetchParams.current.totalTickets = response.total;
        }
      });
    }
  };

  const handleTicketTypeChange = (val: string) => {
    fetchParams.current.type = val;
    fetchParams.current.offset = 0;
    fetchParams.current.totalTickets = 0;
    setTicketType(val);
    handleFetchPastelId(true);
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
      handleFetchPastelId();
    }
  };

  useEffect(() => {
    (async () => {
      setTicketType(TICKET_TYPE_OPTIONS[0].value);
      await handleFetchPastelId(true);
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
            totalTickets={totalAllTickets}
            pastelId={id}
            ticketsTypeList={ticketsTypeList}
          />
        </Styles.GridStyle>
        <Styles.GridStyle item id="list">
          <TicketsList
            data={tickets}
            ticketType={ticketType}
            onTicketTypeChange={handleTicketTypeChange}
            totalTickets={totalTickets}
            totalAllTickets={totalAllTickets}
            ticketsTypeList={ticketsTypeList}
          />
        </Styles.GridStyle>
      </Grid>
      {isLoading ? (
        <TransactionStyles.LoadingWrapper>
          <TransactionStyles.Loader>
            <CircularProgress size={40} />
          </TransactionStyles.Loader>
        </TransactionStyles.LoadingWrapper>
      ) : null}
    </Styles.Wrapper>
  );
};

export default PastelIdDetails;
