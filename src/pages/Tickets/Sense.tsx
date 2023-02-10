import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useTickets from '@hooks/useTickets';
import InfinityTable from '@components/InfinityTable/InfinityTable';

import { senseColumns, transformSenseData, DATA_LIMIT } from './Tickets.helpers';
import * as Styles from './Tickets.styles';

interface ISenseProps {
  isMobile: boolean;
}

const Sense: React.FC<ISenseProps> = ({ isMobile }) => {
  const { data, total, isLoading, size, setSize } = useTickets('sense', DATA_LIMIT);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle>
        Sense tickets (Total {formatNumber(total)} tickets)
        <Link to={`${ROUTES.TICKETS_TYPE}/sense`} className="view-all">
          <Typography align="center" className="p-16">
            View all <ArrowForwardIos />
          </Typography>
        </Link>
      </Styles.BlockTitle>
    );
  };

  return (
    <Styles.SenseContainer>
      <InfinityTable
        rows={data ? transformSenseData(data) : []}
        columns={senseColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 180 : 45}
      />
    </Styles.SenseContainer>
  );
};

export default Sense;
