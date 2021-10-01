import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  .MuiTableCell-root {
    &.MuiTableCell-body {
      &:nth-child(2) {
        padding-left: 0;
      }
    }
  }
`;
