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
  isPastelOpenapiRequest: number;
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
        <TicketStyles.TicketContent className="break-all">
          {blockHash}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          Pastel Block Height When Request Submitted
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{blockHeight}</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>UTC Timestamp When Request Submitted</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {utcTimestampWhenRequestSubmitted}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Submitter</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfSubmitter}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 1</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode1}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 2</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode2}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Registering Supernode 3</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode3}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Is Pastel OpenAPI Request</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {isPastelOpenapiRequest === 1 ? 'True' : 'False'}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>OpenAPI Subset String</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>{openApiSubsetIdString}&nbsp;</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>PastelID of Submitter</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfSubmitter}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default PastelData;
