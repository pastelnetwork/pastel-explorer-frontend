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
    return tickets.map((item, index) => {
      const ticket = TICKET_TYPE_OPTIONS.find(i => i.value === item.type);
      return (
        <React.Fragment key={item.type}>
          {ticket?.name} ({getTicketTypeTotal(item.type, ticketsTypeList)})
          {tickets.length - 1 > index ? ', ' : ''}
        </React.Fragment>
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
              <Grid item xs={4} sm={2}>
                <TicketStyles.TicketTitle>Pastel ID:</TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TicketStyles.TicketContent>{pastelId}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={2}>
                <TicketStyles.TicketTitle>Type:</TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TicketStyles.TicketContent>{renderTicketsType()}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={2}>
                <TicketStyles.TicketTitle>Total Tickets:</TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={10}>
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
