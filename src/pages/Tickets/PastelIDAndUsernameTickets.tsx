import { useState } from 'react';

import * as ROUTES from '@utils/constants/routes';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import SectionTitle from './SectionTitle';
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
      <SectionTitle
        title={translate('pages.tickets.pastelIDAndUsernameTickets')}
        total={total}
        toggleContent={() => setShowLess(!showLess)}
        showMore={showLess}
        viewAllLink={`${ROUTES.TICKETS_TYPE}/pastelid-usename`}
      />
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
