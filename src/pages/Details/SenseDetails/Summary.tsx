import Box from '@material-ui/core/Box';

import * as TicketStyles from '@components/Ticket/Ticket.styles';
import rareBadge from '@assets/images/rare_badge.svg';
import duplicate from '@assets/images/duplicate.svg';

import * as Styles from './SenseDetails.styles';

interface ISummaryProps {
  isLikelyDupe: boolean;
  senseVersion: string;
}

const Summary: React.FC<ISummaryProps> = ({ isLikelyDupe, senseVersion }) => {
  return (
    <Box>
      <Styles.ContentItem className="flex">
        <TicketStyles.TicketTitle>Is Likely Dupe:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="ml-5 capitalize">
          {isLikelyDupe?.toString()}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem className="text-center summary-image py-10">
        <img src={isLikelyDupe ? duplicate : rareBadge} alt={isLikelyDupe ? 'Dupe!' : 'Rare!'} />
      </Styles.ContentItem>
      <Styles.ContentItem className="flex">
        <TicketStyles.TicketTitle>Sense Version:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="ml-5">{senseVersion}</TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default Summary;
