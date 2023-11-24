import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';

import * as TableStyles from '@components/Table/Table.styles';
import * as BlockDetailsStyles from '@pages/Details/BlockDetails/BlockDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import {
  TICKET_TYPE_OPTIONS,
  getTicketTypeTotal,
  TTicketsTypeProps,
} from './PastelIdDetails.helpers';

interface IOverviewProps {
  totalTickets: number;
  pastelId: string;
  ticketsTypeList: TTicketsTypeProps[];
  registeredDate: string | React.ReactNode;
  blockHeight: string;
  username?: string;
}

const Overview: React.FC<IOverviewProps> = ({
  totalTickets,
  pastelId,
  ticketsTypeList,
  registeredDate,
  blockHeight,
  username,
}) => {
  const renderTicketsType = () => {
    const tickets = ticketsTypeList.filter(i => i.total > 0);
    return tickets.map(item => {
      const ticket = TICKET_TYPE_OPTIONS.find(i => i.value === item.type);
      const total = getTicketTypeTotal(item.type, ticketsTypeList);
      return (
        <Box key={item.type}>
          {parse(translate(ticket?.name || ''))} ({total}{' '}
          {total > 1
            ? parse(translate('pages.pastelIdDetails.tickets'))
            : parse(translate('pages.pastelIdDetails.ticket'))}
          )
        </Box>
      );
    });
  };

  return (
    <BlockDetailsStyles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-20">
        <TableStyles.BlockTitle>
          {parse(translate('pages.pastelIdDetails.pastelIDOverview'))}
        </TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.pastelIdDetails.pastelId'))}:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>{pastelId}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          {username ? (
            <BlockDetailsStyles.GridStyle className="table__row">
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.pastelIdDetails.username'))}:
                  </TicketStyles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TicketStyles.TicketContent>{username}</TicketStyles.TicketContent>
                </Grid>
              </Grid>
            </BlockDetailsStyles.GridStyle>
          ) : null}
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.pastelIdDetails.blockHeight'))}:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>
                  {blockHeight ? (
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${blockHeight}`}
                      value={blockHeight}
                      title={blockHeight}
                      className="address-link"
                    />
                  ) : (
                    'NA'
                  )}
                </TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.pastelIdDetails.registeredDate'))}:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>{registeredDate}</TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.pastelIdDetails.totalTicketsCreatedUsingThisPastelID'))}:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent>
                  {totalTickets}{' '}
                  {totalTickets > 1
                    ? parse(translate('pages.pastelIdDetails.tickets'))
                    : parse(translate('pages.pastelIdDetails.ticket'))}
                </TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
          <BlockDetailsStyles.GridStyle className="table__row">
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3} className="max-w-355">
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.pastelIdDetails.type'))}:
                </TicketStyles.TicketTitle>
              </Grid>
              <Grid item xs={8} sm={9}>
                <TicketStyles.TicketContent as="div">
                  {renderTicketsType()}
                </TicketStyles.TicketContent>
              </Grid>
            </Grid>
          </BlockDetailsStyles.GridStyle>
        </Box>
      </TableStyles.BlockWrapper>
    </BlockDetailsStyles.GridStyle>
  );
};

Overview.defaultProps = {
  username: undefined,
};

export default Overview;
