import { useEffect, useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from '@components/Pagination/Pagination';
import { getSubHours } from '@utils/helpers/date/date';
import useTicketsType from '@hooks/useTicketsType';
import { blocksPeriodFilters } from '@utils/constants/filter';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import TicketsList from './TicketList';
import { TICKET_STATUS_OPTIONS } from './TicketsType.helpers';
import * as Styles from './TicketsType.styles';

interface ParamTypes {
  type: string;
}

const LIMIT = 6;

const TicketsType: React.FC = () => {
  const { type } = useParams<ParamTypes>();
  const [selectedType, setTicketType] = useState<string>(type);
  const [selectedStatus, setSelectedStatus] = useState<string>(TICKET_STATUS_OPTIONS[0].value);
  const [selectedTime, setSelectedTime] = useState<string>(blocksPeriodFilters[4].value);
  const [currentPage, setCurrentPage] = useState(0);
  const [customDateRange, setCustomDateRange] = useState<{
    startDate: number;
    endDate: number | null;
  }>({
    startDate: 0,
    endDate: null,
  });
  const { data, senses, total, isLoading } = useTicketsType(
    selectedType,
    LIMIT,
    selectedTime,
    selectedStatus,
    customDateRange,
    currentPage * LIMIT,
  );

  const handleTicketTypeChange = (val: string) => {
    setTicketType(val);
    setCurrentPage(0);
  };

  useEffect(() => {
    (async () => {
      setTicketType(type);
      setCurrentPage(0);
    })();
  }, [type]);

  const handleSelectTime = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(0);
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
    setCurrentPage(0);
    setSelectedStatus(value);
  };

  const handleDateRangeApply = (_startDate: number, _endDate: number | null) => {
    setCurrentPage(0);
    setCustomDateRange({
      startDate: _startDate,
      endDate: _endDate,
    });
    setSelectedTime('custom');
  };

  const totalPage = Math.ceil(total / LIMIT);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Styles.TicketsContainer>
      <Grid container direction="column">
        <Styles.GridStyle item id="list">
          <TicketsList
            data={data}
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
        {totalPage > 1 && total > LIMIT ? (
          <Styles.PaginationWrapper>
            <Pagination
              totalPage={totalPage}
              onPageChange={handlePageChange}
              defaultPage={currentPage}
            />
          </Styles.PaginationWrapper>
        ) : null}
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
