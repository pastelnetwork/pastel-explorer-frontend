import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useTickets from '@hooks/useTickets';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { pastelIdColumns, transformPastelIdData, DATA_LIMIT } from './Tickets.helpers';
import * as Styles from './Tickets.styles';

interface IPastelNFTProps {
  isMobile: boolean;
}

const PastelNFT: React.FC<IPastelNFTProps> = ({ isMobile }) => {
  const { data, total, isLoading, size, setSize } = useTickets('pastelid', DATA_LIMIT);

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
        <Link to={`${ROUTES.TICKETS_TYPE}/pastelid`} className="view-all">
          <Typography align="center" className="p-16">
            {translate('pages.tickets.viewAll')} <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
  };

  return (
    <Styles.PastelContainer>
      <InfinityTable
        rows={data ? transformPastelIdData(data) : []}
        columns={pastelIdColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 140 : 45}
      />
    </Styles.PastelContainer>
  );
};

export default PastelNFT;
