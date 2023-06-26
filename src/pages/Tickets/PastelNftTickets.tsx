import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { transformPastelNftTicketsData, TTicketResponse } from './Tickets.helpers';
import { pastelNftTicketsColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface IPastelNftTicketsProps {
  ticketsData: TTicketResponse;
  innerWidth: number;
  usdPrice: number;
}

const PastelNftTickets: React.FC<IPastelNftTicketsProps> = ({
  ticketsData,
  innerWidth,
  usdPrice,
}) => {
  const { data, total, isLoading, size, setSize } = ticketsData;

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks">
        {translate('pages.tickets.pastelNFTTickets')} (
        {total > 1
          ? translate('pages.tickets.totalTickets', { total: formatNumber(total) })
          : translate('pages.tickets.totalTicket', { total: formatNumber(total) })}
        )
        <Link to={`${ROUTES.TICKETS_TYPE}/pastel-nft`} className="view-all">
          <Typography align="center" className="p-16">
            {translate('pages.tickets.viewAll')} <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
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
    <Styles.OtherTicketContainer id="pastelNFTTickets">
      <InfinityTable
        rows={data ? transformPastelNftTicketsData(data, usdPrice) : []}
        columns={pastelNftTicketsColumns}
        tableHeight={gettableHeight()}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table tickets-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={getRowHeight()}
      />
    </Styles.OtherTicketContainer>
  );
};

export default PastelNftTickets;
