import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import * as ROUTES from '@utils/constants/routes';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useTickets from '@hooks/useTickets';
import InfinityTable from '@components/InfinityTable/InfinityTable';

import { cascadeColumns, transformCascadeData, DATA_LIMIT } from './Tickets.helpers';
import * as Styles from './Tickets.styles';

interface ICascadeProps {
  isMobile: boolean;
}

const Cascade: React.FC<ICascadeProps> = ({ isMobile }) => {
  const { data, total, isLoading, size, setSize } = useTickets('cascade', DATA_LIMIT);

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks">
        Cascade tickets (Total {formatNumber(total)} tickets)
        <Link to={`${ROUTES.TICKETS_TYPE}/cascade`} className="view-all">
          <Typography align="center" className="p-16">
            View all <ArrowForwardIos />
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

  return (
    <Styles.CascadeContainer>
      <InfinityTable
        rows={data ? transformCascadeData(data) : []}
        columns={cascadeColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 140 : 45}
      />
    </Styles.CascadeContainer>
  );
};

export default Cascade;
