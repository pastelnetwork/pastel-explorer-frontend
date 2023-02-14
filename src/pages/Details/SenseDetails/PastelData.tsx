import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

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
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>
            Pastel Block Hash When Request Submitted:
          </TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`}
              value={blockHash}
              title={blockHash}
              className="address-link"
            />
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>
            Pastel Block Height When Request Submitted:
          </TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${blockHeight}`}
              value={blockHeight}
              title={blockHeight.toString()}
              className="address-link"
            />
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>UTC Timestamp When Request Submitted:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {utcTimestampWhenRequestSubmitted}&nbsp;
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>PastelID of Submitter:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelIdOfSubmitter}`}
              value={pastelIdOfSubmitter}
              title={pastelIdOfSubmitter}
              className="address-link"
            />
            &nbsp;
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>PastelID of Registering Supernode 1:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {pastelIdOfRegisteringSupernode1}&nbsp;
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>PastelID of Registering Supernode 2:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {pastelIdOfRegisteringSupernode2}&nbsp;
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>PastelID of Registering Supernode 3:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {pastelIdOfRegisteringSupernode3}&nbsp;
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>Is Pastel OpenAPI Request:</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {isPastelOpenapiRequest === 1 ? 'True' : 'False'}
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <TicketStyles.TicketTitle>OpenAPI Subset String</TicketStyles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <TicketStyles.TicketContent className="break-all">
            {openApiSubsetIdString || 'NA'}
          </TicketStyles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PastelData;
