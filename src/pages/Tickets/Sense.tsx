import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { transformSenseData, TTicketResponse } from './Tickets.helpers';
import { senseColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface ISenseProps {
  isMobile: boolean;
  ticketsData: TTicketResponse;
  innerWidth: number;
  usdPrice: number;
}

const Sense: React.FC<ISenseProps> = ({ isMobile, ticketsData, innerWidth, usdPrice }) => {
  const { data, total, isLoading, size, setSize } = ticketsData;

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle>
        {translate('pages.tickets.senseTickets')} (
        {total > 1
          ? translate('pages.tickets.totalTickets', { total: formatNumber(total) })
          : translate('pages.tickets.totalTicket', { total: formatNumber(total) })}
        )
        <Link to={`${ROUTES.TICKETS_TYPE}/sense`} className="view-all">
          <Typography align="center" className="p-16">
            {translate('pages.tickets.viewAll')} <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
  };

  const getRowHeight = () => {
    if (innerWidth < 600) {
      return 370;
    }

    if (isMobile) {
      return 210;
    }
    return 120;
  };

  return (
    <Styles.SenseContainer id="senseTickets">
      <InfinityTable
        rows={data ? transformSenseData(data, usdPrice) : []}
        columns={senseColumns}
        tableHeight={innerWidth < 600 ? 800 : 600}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table tickets-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={getRowHeight()}
      />
    </Styles.SenseContainer>
  );
};

export default Sense;
