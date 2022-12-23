import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Wrapper = styled('div')`
  .block-wrapper {
    margin-bottom: 12px;

    & > .MuiPaper-root {
      margin-bottom: 0 !important;
    }
  }
`;

export const GridStyle = styled(Grid)`
  width: 100%;

  &.mb-20 {
    margin-bottom: 20px;
  }

  .tickets-table {
    .table__row {
      padding: 12px 16px;
      background-color: ${props => props.theme.table.odd} !important;

      &:nth-of-type(odd) {
        background-color: ${props => props.theme.table.even} !important;
      }

      &:hover {
        background-color: ${props => props.theme.table.hover} !important;
      }
    }
  }
`;
