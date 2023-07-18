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

import { transformPastelIdData, TTicketResponse } from './Tickets.helpers';
import { pastelIDAndUsernameTicketsColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface IPastelIDAndUsernameTicketsProps {
  isMobile: boolean;
  ticketsData: TTicketResponse;
}

const PastelIDAndUsernameTickets: React.FC<IPastelIDAndUsernameTicketsProps> = ({
  isMobile,
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
        {parse(translate('pages.tickets.pastelIDAndUsernameTickets'))} (
        {total > 1
          ? parse(translate('pages.tickets.totalTickets', { total: formatNumber(total) }))
          : parse(translate('pages.tickets.totalTicket', { total: formatNumber(total) }))}
        )
        <Styles.LinkWrapper>
          <Link to={`${ROUTES.TICKETS_TYPE}/pastelid-usename`} className="view-all">
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

  return (
    <Styles.PastelContainer id="pastelIDAndUsernameTickets">
      <InfinityTable
        rows={data ? transformPastelIdData(data) : []}
        columns={pastelIDAndUsernameTicketsColumns}
        tableHeight={495}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={isMobile ? 140 : 45}
        showLess={showLess}
      />
    </Styles.PastelContainer>
  );
};

export default PastelIDAndUsernameTickets;
