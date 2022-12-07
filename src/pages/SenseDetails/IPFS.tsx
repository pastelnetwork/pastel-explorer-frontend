import Box from '@material-ui/core/Box';

import { ExternalLink } from '@components/RouterLink/RouterLink';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

const IPFS: React.FC = () => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>IPFS Link to Results:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          <ExternalLink
            href="https://ipfs.io/ipfs/QmZN2s7U6zNo4Rva81hPeCcfCmz1uUoFvnt7FNaRPYEeMi"
            value="https://ipfs.io/ipfs/QmZN2s7U6zNo4Rva81hPeCcfCmz1uUoFvnt7FNaRPYEeMi"
            className="address-link break-all"
            target="_blank"
            rel="noreferrer"
          />
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>SHA3-256 Hash of Results:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          cc52e53b78e5ecfb3c95f72b4c878db0189a65b42319a25061c0790160564dd1
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default IPFS;
