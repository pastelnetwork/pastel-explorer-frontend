import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';

import { formattedDate } from '@utils/helpers/date/date';
import { ITicket, TSenseRequests } from '@utils/types/ITransactions';
import usePastelIdDetails from '@hooks/usePastelIdDetails';
import { translate } from '@utils/helpers/i18n';

import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as Styles from './PastelIdDetails.styles';
import TicketsList from './TicketList';
import Overview from './Overview';
import { TICKET_TYPE_OPTIONS, TTicketsTypeProps } from './PastelIdDetails.helpers';

const limit = 6;

type TPastelIdDetailsRef = {
  totalTickets: number;
  type: string;
};

const PastelIdDetails = () => {
  const fetchParams = useRef<TPastelIdDetailsRef>({
    type: TICKET_TYPE_OPTIONS[0].value,
    totalTickets: 0,
  });
  const { id } = useParams();
  const location = useLocation();
  const currentUser = location.hash ? location.hash.substring(1, location.hash.length) : '';
  const [ticketType, setTicketType] = useState<string>(TICKET_TYPE_OPTIONS[0].value);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [senses, setSenses] = useState<TSenseRequests[]>([]);
  const [ticketsTypeList, setTicketsTypeList] = useState<TTicketsTypeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [firstLoad, setFistLoad] = useState(false);
  const pastelIdData = usePastelIdDetails(
    id as string,
    limit,
    ticketType,
    currentUser,
    currentPage * limit,
  );

  const handleTicketTypeChange = (val: string) => {
    setTicketType(val);
    fetchParams.current.type = val;
    fetchParams.current.totalTickets = 0;
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let idTimeout: NodeJS.Timeout | null = null;
    if (!pastelIdData.isLoading) {
      if (
        currentPage === 0 &&
        !pastelIdData.data.length &&
        ticketType === TICKET_TYPE_OPTIONS[2].value
      ) {
        setTicketType(TICKET_TYPE_OPTIONS[0].value);
      }
      if (
        currentPage === 0 &&
        pastelIdData.position !== -1 &&
        firstLoad &&
        ticketType === TICKET_TYPE_OPTIONS[2].value
      ) {
        const currentUsernameInPage = Math.ceil(pastelIdData.position / limit) || 0;
        const totalPage = Math.ceil(pastelIdData.totalAllTickets / limit);
        if (currentPage !== currentUsernameInPage && totalPage > 1) {
          setCurrentPage(currentUsernameInPage);
        }
      }
      setTicketsTypeList(pastelIdData.ticketsType);
      fetchParams.current.totalTickets = pastelIdData.total;
      setTickets([...pastelIdData.data]);
      setSenses(pastelIdData.senses);
      setFistLoad(false);
      if (currentUser && ticketType === TICKET_TYPE_OPTIONS[2].value) {
        idTimeout = setTimeout(() => {
          const element = document.getElementById(currentUser);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
    return () => {
      if (idTimeout) {
        clearInterval(idTimeout);
      }
    };
  }, [pastelIdData.isLoading, ticketType, pastelIdData.data]);

  useEffect(() => {
    if (location.hash) {
      setTicketType(TICKET_TYPE_OPTIONS[2].value);
    } else {
      setTicketType(TICKET_TYPE_OPTIONS[0].value);
    }
    setCurrentPage(0);
    setFistLoad(true);
  }, [id]);

  return (
    <Styles.Wrapper>
      <Grid container direction="column">
        <Styles.GridStyle item>
          <Overview
            totalTickets={pastelIdData.totalAllTickets}
            pastelId={id as string}
            ticketsTypeList={ticketsTypeList}
            registeredDate={
              pastelIdData?.registeredDate
                ? formattedDate(Number(pastelIdData.registeredDate), {
                    dayName: false,
                  })
                : parse(translate('common.na'))
            }
            blockHeight={pastelIdData?.blockHeight?.toString() || ''}
            username={pastelIdData.username}
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
            limit={limit}
            onPageChange={handlePageChange}
            defaultPage={currentPage}
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
