import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const TableContainer = styled(Grid)`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

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
