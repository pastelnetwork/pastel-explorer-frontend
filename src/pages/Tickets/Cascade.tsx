import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { transformCascadeData, TTicketResponse } from './Tickets.helpers';
import { cascadeColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface ICascadeProps {
  ticketsData: TTicketResponse;
  innerWidth: number;
  usdPrice: number;
}

const Cascade: React.FC<ICascadeProps> = ({ ticketsData, innerWidth, usdPrice }) => {
  const { data, total, isLoading, size, setSize } = ticketsData;

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks">
        {translate('pages.tickets.cascadeTickets')} (
        {total > 1
          ? translate('pages.tickets.totalTickets', { total: formatNumber(total) })
          : translate('pages.tickets.totalTicket', { total: formatNumber(total) })}
        )
        <Link to={`${ROUTES.TICKETS_TYPE}/cascade`} className="view-all">
          <Typography align="center" className="p-16">
            {translate('pages.tickets.viewAll')} <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
  };

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getRowHeight = () => {
    if (innerWidth < 600) {
      return 430;
    }
    if (innerWidth < 960) {
      return 220;
    }
    return 120;
  };

  const gettableHeight = () => {
    if (innerWidth < 600) {
      return 1200;
    }
    return 600;
  };

  return (
    <Styles.CascadeContainer id="cascadeTickets">
      <InfinityTable
        rows={data ? transformCascadeData(data, usdPrice) : []}
        columns={cascadeColumns}
        tableHeight={gettableHeight()}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table tickets-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={getRowHeight()}
      />
    </Styles.CascadeContainer>
  );
};

export default Cascade;
