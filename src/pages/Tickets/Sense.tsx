import { useState } from 'react';

import * as ROUTES from '@utils/constants/routes';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import SectionTitle from './SectionTitle';
import { transformSenseData, TTicketResponse } from './Tickets.helpers';
import { senseColumns } from './Tickets.columns';
import * as Styles from './Tickets.styles';

interface ISenseProps {
  ticketsData: TTicketResponse;
  innerWidth: number;
  usdPrice: number;
}

const Sense: React.FC<ISenseProps> = ({ ticketsData, innerWidth, usdPrice }) => {
  const { data, total, isLoading, size, setSize } = ticketsData;
  const [showMore, setShowMore] = useState(false);

  const handleFetchMoreMovements = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;
    setSize(size + 1);
    return true;
  };

  const getTitle = () => {
    return (
      <SectionTitle
        title={translate('pages.tickets.senseTickets')}
        total={total}
        toggleContent={() => setShowMore(!showMore)}
        showMore={showMore}
        viewAllLink={`${ROUTES.TICKETS_TYPE}/sense`}
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
    <Styles.SenseContainer id="senseTickets">
      <InfinityTable
        rows={data ? transformSenseData(data, usdPrice) : []}
        columns={senseColumns}
        tableHeight={gettableHeight()}
        title={getTitle()}
        onBottomReach={handleFetchMoreMovements}
        className="data-table tickets-table"
        headerBackground
        customLoading={isLoading}
        rowHeight={getRowHeight()}
        showLess={showMore}
      />
    </Styles.SenseContainer>
  );
};

export default Sense;
