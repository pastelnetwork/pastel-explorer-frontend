import Box from '@material-ui/core/Box';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

interface IPastelData {
  blockHash: string;
  blockHeight: number;
  utcTimestampWhenRequestSubmitted: string;
  pastelIdOfSubmitter: string;
  pastelIdOfRegisteringSupernode1: string;
  pastelIdOfRegisteringSupernode2: string;
  pastelIdOfRegisteringSupernode3: string;
  isPastelOpenapiRequest: boolean;
  openApiSubsetIdString: string;
}

const PastelData: React.FC<IPastelData> = ({
  blockHash,
  blockHeight,
  utcTimestampWhenRequestSubmitted,
  pastelIdOfSubmitter,
  pastelIdOfRegisteringSupernode1,
  pastelIdOfRegisteringSupernode2,
  pastelIdOfRegisteringSupernode3,
  isPastelOpenapiRequest,
  openApiSubsetIdString,
}) => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          Pastel Block Hash When Request Submitted:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">{blockHash}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          Pastel Block Height When Request Submitted
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{blockHeight}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>UTC Timestamp When Request Submitted</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{utcTimestampWhenRequestSubmitted}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Submitter</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {pastelIdOfSubmitter}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 1</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {pastelIdOfRegisteringSupernode1}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 2</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {pastelIdOfRegisteringSupernode2}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 3</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {pastelIdOfRegisteringSupernode3}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Is Pastel OpenAPI Request</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{isPastelOpenapiRequest.toString()}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>OpenAPI Subset String</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{openApiSubsetIdString}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Submitter</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="read-more">
          {pastelIdOfSubmitter}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default PastelData;
