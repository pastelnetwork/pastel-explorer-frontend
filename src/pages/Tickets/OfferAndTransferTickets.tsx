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

import { transformOfferAndTransferData, TTicketResponse } from './Tickets.helpers';
import { offerAndTransferTicketsColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface IOfferAndTransferTicketsProps {
  innerWidth: number;
  ticketsData: TTicketResponse;
}

const OfferAndTransferTickets: React.FC<IOfferAndTransferTicketsProps> = ({
  innerWidth,
  ticketsData,
}) => {
  const { data, total, isLoading, size, setSize } = ticketsData;
  const [showLess, setShowLess] = useState(false);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <Styles.BlockTitle className="latest-blocks ticket-block-title">
        {parse(translate('pages.tickets.offerTicketsAndTransferTickets'))} (
        {total > 1
          ? parse(translate('pages.tickets.totalTickets', { total: formatNumber(total) }))
          : parse(translate('pages.tickets.totalTicket', { total: formatNumber(total) }))}
        )
        <Styles.LinkWrapper>
          <Link to={`${ROUTES.TICKETS_TYPE}/offer-transfer`} className="view-all">
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
    <Styles.OtherTicketContainer id="offerTicketsAndTransferTickets">
      <InfinityTable
        rows={data ? transformOfferAndTransferData(data) : []}
        columns={offerAndTransferTicketsColumns}
        tableHeight={gettableHeight()}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table tickets-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={getRowHeight()}
        showLess={showLess}
      />
    </Styles.OtherTicketContainer>
  );
};

export default OfferAndTransferTickets;
