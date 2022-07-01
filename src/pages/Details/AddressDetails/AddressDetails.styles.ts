import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const TableWrapper = styled(Grid)`
  .latest-transaction-table {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 21px 0;

  h4 {
    margin: 0;
  }
`;
