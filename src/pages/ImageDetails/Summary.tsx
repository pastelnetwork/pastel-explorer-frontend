import Box from '@material-ui/core/Box';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './ImageDetails.styles';

const Summary: React.FC = () => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Is Likely Dupe:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>False</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <img
          src="https://sensedemo.pastel.network/static/img/rare_badge.svg"
          alt="rare_badge"
          width="190px"
        />
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Sense Version:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>2.3</TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default Summary;
