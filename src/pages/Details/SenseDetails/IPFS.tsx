import Box from '@material-ui/core/Box';

import { ExternalLink } from '@components/RouterLink/RouterLink';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

interface IIPFS {
  link: string;
  hash: string;
}

const IPFS: React.FC<IIPFS> = ({ link, hash }) => {
  return (
    <Box className="py-11">
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>IPFS Link to Results:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          <ExternalLink
            href={link}
            value={link}
            className="address-link break-all"
            target="_blank"
            rel="noreferrer"
          />
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>SHA3-256 Hash of Results:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">{hash}</TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default IPFS;
