import { useState } from 'react';

import * as ROUTES from '@utils/constants/routes';
import InfinityTable from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import SectionTitle from './SectionTitle';
import { transformCascadeData, TTicketResponse, useShowLess } from './Tickets.helpers';
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
  useShowLess(setShowLess);

  const getTitle = () => {
    return (
      <SectionTitle
        title={translate('pages.tickets.cascadeTickets')}
        total={total}
        toggleContent={() => setShowLess(!showLess)}
        showMore={showLess}
        viewAllLink={`${ROUTES.TICKETS_TYPE}/cascade`}
      />
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
