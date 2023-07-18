import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import parse from 'html-react-parser';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  const [showLess, setShowLess] = useState(false);

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks ticket-block-title">
        {parse(translate('pages.tickets.cascadeTickets'))} (
        {total > 1
          ? parse(translate('pages.tickets.totalTickets', { total: formatNumber(total) }))
          : parse(translate('pages.tickets.totalTicket', { total: formatNumber(total) }))}
        )
        <Styles.LinkWrapper>
          <Link to={`${ROUTES.TICKETS_TYPE}/cascade`} className="view-all">
            <Typography align="center" className="p-16">
              {parse(translate('pages.tickets.viewAll'))} <ArrowForwardIos />
            </Typography>
          </Link>
          <IconButton
            onClick={() => setShowLess(!showLess)}
            className={`btn-toggle ${showLess ? 'show-less' : ''}`}
          >
            <ExpandMoreIcon className="toggle-icon" />
          </IconButton>
        </Styles.LinkWrapper>
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
      return 450;
    }
    if (innerWidth < 960) {
      return 240;
    }
    return 140;
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
        showLess={showLess}
      />
    </Styles.CascadeContainer>
  );
};

export default Cascade;
