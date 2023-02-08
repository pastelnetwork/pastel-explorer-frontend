import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const TicketsContainer = styled.div`
  width: 100%;

  .p-16 {
    padding: 16px;
  }

  .nowrap {
    white-space: nowrap;
  }

  .mb-0 {
    margin-bottom: 0;
  }

  .empty-label {
    max-width: 100%;
    padding: 10px;
  }
`;

export const SenseContainer = styled.div`
  width: 100%;
`;

export const CascadeContainer = styled.div`
  width: 100%;
`;

export const PastelContainer = styled.div`
  width: 100%;
`;

export const OtherTicketContainer = styled.div`
  width: 100%;
`;

export const GirdStyle = styled(Grid)`
  &.left {
    padding-right: 6px;
  }

  &.right {
    padding-left: 6px;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    &.left {
      padding-right: 12px;
    }

    &.right {
      padding-left: 12px;
      padding-top: 0;
    }
  }
`;
