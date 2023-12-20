import { Grid, Typography } from '@mui/material';
import parse from 'html-react-parser';

import { HeaderType } from '@components/Table/Table';

import * as Styles from './BlockDetails.styles';

export const blockHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.blockDetails.height' },
  { id: 3, header: 'pages.blockDetails.confirmations' },
  { id: 4, header: 'pages.blockDetails.size' },
  { id: 6, header: 'pages.blockDetails.timestamp' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.blockDetails.txId', key: 'id' },
  { id: 2, header: 'pages.blockDetails.recipients', key: 'recipientCount' },
  { id: 3, header: 'pages.blockDetails.tickets', key: 'totalTickets' },
  { id: 4, header: 'pages.blockDetails.amount', key: 'totalAmount' },
];

export const generateDetailsElement = (name: string, value: string) => (
  <Styles.DetailsContainer container>
    <Styles.DetailsDescription item>
      <Typography>{parse(name)}</Typography>
    </Styles.DetailsDescription>
    <Grid item>
      <Styles.DetailsValueText>{value}</Styles.DetailsValueText>
    </Grid>
  </Styles.DetailsContainer>
);
