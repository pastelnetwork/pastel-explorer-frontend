import { useRef, useEffect, useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getSubHours } from '@utils/helpers/date/date';
import useTicketsType from '@hooks/useTicketsType';
import { ITicket } from '@utils/types/ITransactions';
import { blocksPeriodFilters } from '@utils/constants/filter';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import TicketsList from './TicketList';
import { TICKET_STATUS_OPTIONS } from './TicketsType.helpers';
import * as Styles from './TicketsType.styles';

interface ParamTypes {
  type: string;
}

type TPastelIdDetailsRef = {
  offset: number;
  totalTickets: number;
  type: string;
  size: number;
  defaultDateRange: {
    startDate: number;
    endDate: number | null;
  };
};

const LIMIT = 6;

const TicketsType: React.FC = () => {
  let targetHeight = 0;
  const { type } = useParams<ParamTypes>();
  const fetchParams = useRef<TPastelIdDetailsRef>({
    offset: 0,
    type,
    totalTickets: 0,
    size: 1,
    defaultDateRange: {
      startDate: 0,
      endDate: null,
    },
  });
  const [selectedType, setTicketType] = useState<string>(type);
  const [selectedStatus, setSelectedStatus] = useState<string>(TICKET_STATUS_OPTIONS[0].value);
  const [selectedTime, setSelectedTime] = useState<string>(blocksPeriodFilters[4].value);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [customDateRange, setCustomDateRange] = useState<{
    startDate: number;
    endDate: number | null;
  }>({
    startDate: 0,
    endDate: null,
  });
  const { data, senses, total, isLoading, setSize } = useTicketsType(
    selectedType,
    LIMIT,
    selectedTime,
    selectedStatus,
    customDateRange,
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
      window.scrollY + window.innerHeight >= clientHeight / 2 + offsetTop + targetHeight &&
      fetchParams.current.offset <= fetchParams.current.totalTickets
    ) {
      targetHeight = clientHeight / 2;
      fetchParams.current.offset += LIMIT;
      fetchParams.current.size += 1;
      setSize(fetchParams.current.size);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchParams.current.totalTickets = total;
      setTickets(data);
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

  const handleSelectTime = (event: MouseEvent<HTMLButtonElement>) => {
    setSize(1);
    fetchParams.current.size = 1;
    fetchParams.current.offset = 0;
    fetchParams.current.defaultDateRange = {
      startDate: 0,
      endDate: null,
    };
    let dateRange = null;
    if (event.currentTarget.value !== 'all') {
      dateRange = { startDate: getSubHours(event.currentTarget.value), endDate: Date.now() };
    } else {
      dateRange = { startDate: 0, endDate: null };
    }
    setSelectedTime(event.currentTarget.value);
    setCustomDateRange({ ...dateRange });
  };

  const handleStatusChange = (value: string) => {
    setSize(1);
    fetchParams.current.size = 1;
    fetchParams.current.offset = 0;
    setSelectedStatus(value);
  };

  const handleDateRangeApply = (_startDate: number, _endDate: number | null) => {
    fetchParams.current.offset = 0;
    fetchParams.current.totalTickets = 0;
    fetchParams.current.size = 1;
    fetchParams.current.defaultDateRange = {
      startDate: _startDate,
      endDate: _endDate,
    };
    setSize(1);
    setCustomDateRange({
      startDate: _startDate,
      endDate: _endDate,
    });
    setSelectedTime('custom');
  };

  return (
    <Styles.TicketsContainer>
      <Grid container direction="column">
        <Styles.GridStyle item id="list">
          <TicketsList
            data={tickets}
            ticketType={selectedType}
            onTicketTypeChange={handleTicketTypeChange}
            totalTickets={total}
            isLoading={isLoading}
            senses={senses}
            handleSelectTime={handleSelectTime}
            selectedTime={selectedTime}
            onStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
            onDateRangeApply={handleDateRangeApply}
          />
        </Styles.GridStyle>
      </Grid>
      {isLoading ? (
        <Styles.LoadingWrapper>
          <TransactionStyles.Loader>
            <CircularProgress size={40} />
          </TransactionStyles.Loader>
        </Styles.LoadingWrapper>
      ) : null}
    </Styles.TicketsContainer>
  );
};

export default TicketsType;
