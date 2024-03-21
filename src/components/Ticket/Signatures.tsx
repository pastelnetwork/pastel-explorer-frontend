import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { ISignature } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';
import * as Styles from './Ticket.styles';

interface ISignaturesProps {
  signatures?: ISignature;
  signature?: string;
  variant?: string;
}

const Signatures: React.FC<ISignaturesProps> = ({ signatures, signature, variant }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (signature) {
    if (variant === 'transaction') {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.signatures.signature'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Styles.TicketContent className="break-all">{signature}</Styles.TicketContent>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.signatures.signature'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent className="break-all">{signature}</Styles.TicketContent>
        </Grid>
      </Grid>
    );
  }

  if (signatures) {
    return (
      <Box>
        <Styles.Accordion
          expanded={isExpanded}
          onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
        >
          <AccordionSummary>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.signatures.registeringSupernode'))}:
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent className="expand-more">
                  {isExpanded
                    ? parse(translate('components.ticket.actionRegistrationTicket.hideDetail'))
                    : parse(
                        translate('components.ticket.actionRegistrationTicket.clickToSeeDetail'),
                      )}{' '}
                  <ExpandMoreIcon />
                </Styles.TicketContent>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate('components.ticket.signatures.pastelIDOfUserSubmittingTicket'),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {Object.keys(signatures.principal)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.signatureOfUser'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.values(signatures.principal)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.supernode1'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.keys(signatures.mn1)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.signature1'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.values(signatures.mn1)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.supernode2'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.keys(signatures.mn2)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.signature2'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.values(signatures.mn2)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.supernode3'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.keys(signatures.mn3)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.signatures.signature3'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="break-all">
                    {Object.values(signatures.mn3)[0]}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Styles.Accordion>
      </Box>
    );
  }

  return null;
};

export default Signatures;
