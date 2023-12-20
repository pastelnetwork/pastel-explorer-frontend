import styled from 'styled-components';

import { Typography as MuiTypography } from '@mui/material';

import { getCurrencyName } from '@utils/appInfo';

export const Typography = styled(MuiTypography)`
  cursor: default;
`;

export const LatestTransactionsWrapper = styled.div`
  margin-top: 24px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  .pl-4px {
    padding-left: 4px;
  }

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .col-txid > .MuiTableCell-root {
    padding-left: 4px;
  }

  .latest-transactions-table {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0 !important;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    margin-top: 12px;
  }

  ${props => props.theme.breakpoints.down(960)} {
    .ReactVirtualized__Table__headerRow {
      display: none;
    }

    .ReactVirtualized__Grid,
    .ReactVirtualized__Table__headerRow {
      min-width: unset;
    }

    .ReactVirtualized__Table__row {
      flex-direction: column;
    }

    .ReactVirtualized__Table__rowColumn {
      display: flex;
      align-items: center;
      flex: unset !important;
      width: 100%;
      min-width: unset !important;
      padding-left: 10px;
      padding-right: 10px;

      .transaction-detail-link {
        margin-left: 10px;
      }

      .hourglass {
        margin-left: 0;
      }

      .txid-link {
        max-width: 68%;
      }

      .MuiTableCell-root {
        padding-left: 0;
        border-bottom: 0;
      }

      &:before {
        position: relative;
        width: 130px;
        min-width: 150px;
        padding-right: 0;
        font-weight: 600;
        font-size: 16px;
        color: ${props => props.theme.table.label};
      }

      &.col-block {
        &:before {
          content: 'Block';
        }
      }

      &.col-txid {
        &:before {
          content: 'TXID';
        }
      }

      &.col-recipents {
        &:before {
          content: 'Recipents';
          margin-right: 10px;
        }
      }

      &.col-amount {
        &:before {
          content: 'Amount (${getCurrencyName()})';
          margin-right: 10px;
        }
      }

      &.col-timestamp {
        &:before {
          content: 'Timestamp';
          margin-right: 10px;
        }
      }
    }
  }
`;
