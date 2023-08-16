import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import { formattedDate } from '@utils/helpers/date/date';
import { IPastelIDRegistrationTicket } from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';

import Signatures from './Signatures';
import * as Styles from './Ticket.styles';

interface IPastelIDRegistrationTicketProps {
  ticket: IPastelIDRegistrationTicket;
}

const PastelIDRegistrationTicket: React.FC<IPastelIDRegistrationTicketProps> = ({ ticket }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.pastelIDRegistrationTicket.idType'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.id_type}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.pastelIDRegistrationTicket.version'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.version}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.pastelIDRegistrationTicket.height'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.height}`}
              value={ticket.height}
              title={ticket.height?.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.pastelIDRegistrationTicket.pastelID'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.PASTEL_ID_DETAILS}/${ticket.pastelID}`}
              value={ticket.pastelID}
              title={ticket.pastelID}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Signatures signature={ticket.signature} />
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.pastelIDRegistrationTicket.address'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.ADDRESS_DETAILS}/${ticket.address}`}
              value={ticket.address}
              title={ticket.address}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket?.pq_key ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.pastelIDRegistrationTicket.pqKey'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent className="break-all view-more">
              <>
                {!isExpanded ? `${ticket.pq_key.substring(0, 200)}...` : ticket.pq_key}
                <Styles.ButtonLink onClick={() => setIsExpanded(!isExpanded)}>
                  {!isExpanded
                    ? parse(
                        translate('components.ticket.pastelIDRegistrationTicket.clickToSeeMore'),
                      )
                    : parse(
                        translate('components.ticket.pastelIDRegistrationTicket.clickToSeeLess'),
                      )}
                </Styles.ButtonLink>
              </>
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {ticket?.timeStamp ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.pastelIDRegistrationTicket.timestamp'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formattedDate(Number(ticket.timeStamp), { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default PastelIDRegistrationTicket;
