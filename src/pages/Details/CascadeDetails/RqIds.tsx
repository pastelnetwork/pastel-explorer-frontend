import Box from '@material-ui/core/Box';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './CascadeDetails.styles';

interface IRqIds {
  data?: string[];
  opened: boolean;
}

const RqIds: React.FC<IRqIds> = ({ data, opened }) => {
  if (!data || !opened) {
    return null;
  }
  return (
    <Styles.RqIdsWrapper>
      <Box>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.cascade.allRqIds'))}
        </TicketStyles.TicketTitle>
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
