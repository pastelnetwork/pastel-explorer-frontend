import Box from '@material-ui/core/Box';

import { TPastelData } from '@utils/types/ITransactions';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

interface IPastelData {
  data: TPastelData;
}

const PastelData: React.FC<IPastelData> = ({ data }) => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          Pastel Block Hash When Request Submitted:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {data.pastelBlockHashWhenRequestSubmitted}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          Pastel Block Height When Request Submitted
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {data.pastelBlockHeightWhenRequestSubmitted}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>UTC Timestamp When Request Submitted</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {data.utcTimestampWhenRequestSubmitted}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Submitter</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {data.pastelIdOfSubmitter}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 1</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {data.pastelIdOfRegisteringSupernode1}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 2</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {data.pastelIdOfRegisteringSupernode2}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 3</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {data.pastelIdOfRegisteringSupernode3}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Is Pastel OpenAPI Request</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {data.isPastelOpenApiRequest.toString()}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>OpenAPI Subset String</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{data.openApiSubsetIdString}</TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default PastelData;
