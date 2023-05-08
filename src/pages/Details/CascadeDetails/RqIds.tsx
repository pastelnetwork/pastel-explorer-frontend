import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './CascadeDetails.styles';

interface IRqIds {
  data?: string[];
}

const RqIds: React.FC<IRqIds> = ({ data }) => {
  const [opened, setOpened] = useState(false);
  if (!data) {
    return null;
  }
  return (
    <Styles.RqIdsWrapper>
      <Box>
        <TicketStyles.TicketContent
          className={`expand-more ${opened ? 'opened' : ''}`}
          onClick={() => setOpened(!opened)}
        >
          {opened
            ? translate('pages.cascade.hideAllRqIds')
            : translate('pages.cascade.displayAllRqIds')}
          <ExpandMoreIcon />
        </TicketStyles.TicketContent>
      </Box>
      {opened ? (
        <ul className="list">
          {data.map(value => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : null}
    </Styles.RqIdsWrapper>
  );
};

export default RqIds;
