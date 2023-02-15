import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import React from 'react';
import {
  TICKET_TYPE_OPTIONS,
  getTicketTypeTotal,
  TTicketsTypeProps,
} from './PastelIdDetails.helpers';

interface IOverviewProps {
  totalTickets: number;
  pastelId: string;
  ticketsTypeList: TTicketsTypeProps[];
}

const Overview: React.FC<IOverviewProps> = ({ totalTickets, pastelId, ticketsTypeList }) => {
  const renderTicketsType = () => {
    const tickets = ticketsTypeList.filter(i => i.total > 0);
    return tickets.map(item => {
      const ticket = TICKET_TYPE_OPTIONS.find(i => i.value === item.type);
      const total = getTicketTypeTotal(item.type, ticketsTypeList);
      return (
        <Box key={item.type}>
          {ticket?.name} ({total} {total > 1 ? 'tickets' : 'ticket'})
        </Box>
      );
    });
  };

  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-20">
        <TableStyles.BlockTitle>Overview</TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>Pastel ID:</TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>{pastelId}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>Type:</TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>{renderTicketsType()}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  Total Tickets Created Using This PastelID:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>
                  {totalTickets} {totalTickets > 1 ? 'Tickets' : 'Ticket'}
                </TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
        </Box>
      </TableStyles.BlockWrapper>
    </BlockDetailsStyles.GridStyle>
  );
};

export default Overview;
