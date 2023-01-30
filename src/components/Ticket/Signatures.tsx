import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { ISignature } from '@utils/types/ITransactions';
import * as Styles from './Ticket.styles';

interface ISignaturesProps {
  signatures?: ISignature;
  signature?: string;
}

const Signatures: React.FC<ISignaturesProps> = ({ signatures, signature }) => {
  if (signature) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2}>
          <Styles.TicketTitle>Signature:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={10}>
          <Styles.TicketContent className="break-all">{signature}</Styles.TicketContent>
        </Grid>
      </Grid>
    );
  }

  if (signatures) {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>PastelID of User Submitting Ticket:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent>{Object.keys(signatures.principal)[0]}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Signature of User:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.values(signatures.principal)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #1 - PastelID:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.keys(signatures.mn1)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #1 - Signature:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.values(signatures.mn1)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #2 - PastelID:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.keys(signatures.mn2)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #2 - Signature:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.values(signatures.mn2)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #3 - PastelID:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.keys(signatures.mn3)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={2}>
            <Styles.TicketTitle>Registering Supernode #3 - Signature:</Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={10}>
            <Styles.TicketContent className="break-all">
              {Object.values(signatures.mn3)[0]}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return null;
};

export default Signatures;
