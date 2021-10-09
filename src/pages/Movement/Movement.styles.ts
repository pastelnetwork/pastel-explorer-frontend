import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  .pl-8px {
    padding-left: 8px;
  }

  .col-txid > .MuiTableCell-root {
    padding-left: 8px;
  }

  .movement-table {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0 !important;
    overflow: unset;
  }
`;
