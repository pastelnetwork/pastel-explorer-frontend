import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { decode } from 'js-base64';
import parse from 'html-react-parser';

import * as ascii85 from '@utils/helpers/ascii85';
import { IApiTicket } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './Ticket.styles';

interface IApiTicketProps {
  apiTicket: string;
  actionType: string;
}

const ApiTicket: React.FC<IApiTicketProps> = ({ apiTicket, actionType }) => {
  if (!apiTicket) {
    return null;
  }
  const decodeApiTicket = () => {
    let data = null;
    try {
      data = JSON.parse(decode(apiTicket)) as IApiTicket;
    } catch {
      try {
        data = ascii85.decode(apiTicket) as IApiTicket;
      } catch (error) {
        console.error(error);
      }
    }

    return data;
  };
  const data = decodeApiTicket() as IApiTicket;

  return (
    <Box>
      {data?.data_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.dataHash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data?.data_hash}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {actionType === 'sense' ? (
        <>
          {data?.dd_and_fingerprints_max ? (
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.apiTicket.ddAndFingerprintsMax'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>{data.dd_and_fingerprints_max}</Styles.TicketContent>
              </Grid>
            </Grid>
          ) : null}
          {data?.dd_and_fingerprints_ic ? (
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.apiTicket.ddAndFingerprintsIc'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>{data.dd_and_fingerprints_ic}</Styles.TicketContent>
              </Grid>
            </Grid>
          ) : null}
          {data?.dd_and_fingerprints_ids?.length ? (
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <Styles.TicketTitle>
                  {parse(translate('components.ticket.apiTicket.ddAndFingerprintsIds'))}
                </Styles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Styles.TicketContent>
                  {data.dd_and_fingerprints_ids.join(', ')}
                </Styles.TicketContent>
              </Grid>
            </Grid>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

export default ApiTicket;
