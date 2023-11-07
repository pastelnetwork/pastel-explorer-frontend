import Box from '@material-ui/core/Box';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './NftDetails.styles';

interface IRaptorQParameters {
  rqIc: number;
  rqMax: number;
  rqOti: string;
}

const RaptorQParameters: React.FC<IRaptorQParameters> = ({ rqIc, rqMax, rqOti }) => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.rqIc'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {rqIc || parse(translate('common.na'))}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.rqMax'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {rqMax || parse(translate('common.na'))}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.rqOti'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {rqOti || parse(translate('common.na'))}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default RaptorQParameters;
