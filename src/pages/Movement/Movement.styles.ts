import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

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
