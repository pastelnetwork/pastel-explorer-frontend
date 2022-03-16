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

  ${props => props.theme.breakpoints.down('md')} {
    .ReactVirtualized__Grid {
      min-width: unset;
    }

    .ReactVirtualized__Table__headerRow {
      display: none;
    }

    .ReactVirtualized__Table__row {
      flex-direction: column;
    }

    .ReactVirtualized__Table__rowColumn {
      display: flex;
      align-items: center;
      flex: unset !important;
      width: 100%;
      padding-left: 18px;
      padding-right: 10px;

      .hourglass {
        margin-left: 0;
      }

      &:first-child {
        padding-left: 10px;
      }

      .MuiTableCell-root {
        padding-left: 0;
        border-bottom: 0;
      }

      &:before {
        position: relative;
        width: 120px;
        font-weight: 600;
        font-size: 16px;
        color: ${props => props.theme.table.label};
      }

      &.col-block {
        &:before {
          content: 'Block';
        }
      }

      &.col-timestamp {
        &:before {
          content: 'Timestamp';
        }
      }

      &.col-amount {
        &:before {
          content: 'Amount';
        }
      }
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  ${props => props.theme.breakpoints.down('md')} {
    margin-bottom: 10px;
  }
`;

export const Title = styled.span`
  margin-right: 10px;
`;

export const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 340px) {
    font-size: 14px;
  }
`;
