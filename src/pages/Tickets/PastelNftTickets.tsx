import { useState } from 'react';

import * as ROUTES from '@utils/constants/routes';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import SectionTitle from './SectionTitle';
import { transformPastelNftTicketsData, TTicketResponse, useShowLess } from './Tickets.helpers';
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
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <SectionTitle
        title={translate('pages.tickets.pastelNFTTickets')}
        total={total}
        toggleContent={() => setShowLess(!showLess)}
        showMore={showLess}
        viewAllLink={`${ROUTES.TICKETS_TYPE}/pastel-nft`}
      />
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
        showLess={showLess}
      />
    </Styles.OtherTicketContainer>
  );
};

export default PastelNftTickets;
