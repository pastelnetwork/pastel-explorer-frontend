import { useState } from 'react';

import * as ROUTES from '@utils/constants/routes';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import SectionTitle from './SectionTitle';
import { transformOfferAndTransferData, TTicketResponse, useShowLess } from './Tickets.helpers';
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
  useShowLess(setShowLess);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <SectionTitle
        title={translate('pages.tickets.offerTicketsAndTransferTickets')}
        total={total}
        toggleContent={() => setShowLess(!showLess)}
        showMore={showLess}
        viewAllLink={`${ROUTES.TICKETS_TYPE}/offer-transfer`}
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
