import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const TicketTitle = styled(Typography)`
  font-weight: 600;
`;

export const TicketContent = styled(Typography)`
  &.capitalize {
    text-transform: capitalize;
  }

  &.break-all {
    word-break: break-all;
  }

  &.view-more {
    .address-link {
      margin-left: 8px;
    }
  }
`;
