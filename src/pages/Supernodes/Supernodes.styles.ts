import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  .pl-4px {
    padding-left: 4px;
  }

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .pl-14px {
    padding-left: 14px;
  }

  .col-address {
    & > .MuiTableCell-root {
      padding-left: 0;
    }
  }

  .supernode-table {
    padding-left: 0;
    padding-right: 0;
  }
`;
