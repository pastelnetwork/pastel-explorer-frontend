import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useTickets from '@hooks/useTickets';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { otherColumns, transformOtherData, DATA_LIMIT } from './Tickets.helpers';
import * as Styles from './Tickets.styles';

interface IOtherProps {
  isMobile: boolean;
}

const Other: React.FC<IOtherProps> = ({ isMobile }) => {
  const { data, total, isLoading, size, setSize } = useTickets('other', DATA_LIMIT);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks">
        {translate('pages.tickets.otherTickets')} (
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
    <Styles.OtherTicketContainer>
      <InfinityTable
        rows={data ? transformOtherData(data) : []}
        columns={otherColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 140 : 45}
      />
    </Styles.OtherTicketContainer>
  );
};

export default Other;
