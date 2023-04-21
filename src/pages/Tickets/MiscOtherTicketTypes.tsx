import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { transformOtherData, TTicketResponse } from './Tickets.helpers';
import { otherTicketsColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface IMiscOtherTicketTypesProps {
  isMobile: boolean;
  ticketsData: TTicketResponse;
}

const MiscOtherTicketTypes: React.FC<IMiscOtherTicketTypesProps> = ({ isMobile, ticketsData }) => {
  const { data, total, isLoading, size, setSize } = ticketsData;

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks">
        {translate('pages.tickets.miscOtherTicketTypes')} (
        {total > 1
          ? translate('pages.tickets.totalTickets', { total: formatNumber(total) })
          : translate('pages.tickets.totalTicket', { total: formatNumber(total) })}
        )
        <Link to={`${ROUTES.TICKETS_TYPE}/other`} className="view-all">
          <Typography align="center" className="p-16">
            {translate('pages.tickets.viewAll')} <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
  };

  return (
    <Styles.OtherTicketContainer id="miscOtherTicketTypes">
      <InfinityTable
        rows={data ? transformOtherData(data) : []}
        columns={otherTicketsColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 140 : 50}
      />
    </Styles.OtherTicketContainer>
  );
};

export default MiscOtherTicketTypes;
