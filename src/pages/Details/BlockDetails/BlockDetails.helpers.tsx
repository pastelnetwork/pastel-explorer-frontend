import { Grid, Typography } from '@material-ui/core';

import { HeaderType } from '@components/Table/Table';
import { getCurrencyName } from '@utils/appInfo';
import { ITicket } from '@utils/types/ITransactions';

import * as Styles from './BlockDetails.styles';

export const blockHeaders: Array<HeaderType> = [
  { id: 1, header: 'Height' },
  { id: 3, header: 'Confirmations' },
  { id: 4, header: 'Size (kB)' },
  { id: 6, header: 'Timestamp' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'TXID', key: 'id' },
  { id: 2, header: 'Recipients', key: 'recipientCount' },
  { id: 3, header: 'Tickets', key: 'totalTickets' },
  { id: 4, header: `Amount (${getCurrencyName()})`, key: 'totalAmount' },
];

export const generateDetailsElement = (name: string, value: string) => (
  <Styles.DetailsContainer container>
    <Styles.DetailsDescription item>
      <Typography>{name}</Typography>
    </Styles.DetailsDescription>
    <Grid item>
      <Styles.DetailsValueText>{value}</Styles.DetailsValueText>
    </Grid>
  </Styles.DetailsContainer>
);

export const countTotalTicketsByTxid = (txid: string, tickets: ITicket[]) => {
  const items = tickets.filter(t => t.transactionHash === txid);

  return items.length;
};
