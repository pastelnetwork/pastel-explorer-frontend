import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const TableContainer = styled(Grid)`
  margin-top: 30px;

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .block-list-table {
    padding-left: 0;
    padding-right: 0;
  }
`;
