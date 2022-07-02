import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

import { getCurrencyName } from '@utils/appInfo';

export const TableWrapper = styled(Grid)`
  .latest-transaction-table {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Wrapper = styled.div`
  .address-table-wrapper {
    padding: 10px 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: ${props => props.theme.sidebar.menu.background};
  }

  .address-wrapper {
    margin-bottom: 12px;

    & > .MuiPaper-root {
      margin-bottom: 0 !important;
    }
  }

  .table-title {
    margin: 16px 0 0;
  }

  .custom-table {
    .table__row-header {
      display: none;
    }

    .table__row {
      display: flex;
      flex-direction: column;

      td {
        display: flex;
        padding: 5px 16px;
        border-bottom: 0;
        background: ${props => props.theme.sidebar.menu.background};

        &:before {
          position: relative;
          min-width: 150px;
          display: inline-block;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
        }
      }
    }

    &.address {
      .table__row {
        td {
          &:nth-child(1) {
            &:before {
              content: 'Total Sent (${getCurrencyName})';
            }
          }

          &:nth-child(2) {
            &:before {
              content: 'Total Received (${getCurrencyName})';
            }
          }

          &:nth-child(3) {
            &:before {
              content: 'Balance (${getCurrencyName})';
            }
          }
        }
      }
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .transaction-hash,
    .transaction-hash-link {
      max-width: calc(100vw - 225px);
    }

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
      padding-left: 10px;
      padding-right: 10px;

      .hash-link {
        max-width: 68%;
      }

      .MuiTableCell-root {
        padding-left: 0;
        border-bottom: 0;
      }

      &:before {
        position: relative;
        width: 100px;
        min-width: 100px;
        padding-right: 0;
        font-weight: 600;
        font-size: 16px;
        color: ${props => props.theme.table.label};
      }

      &.col-timestamp {
        &:before {
          content: 'Timestamp';
        }
      }

      &.col-hash {
        &:before {
          content: 'Hash';
        }
      }

      &.col-amount {
        &:before {
          content: 'Amount (${getCurrencyName})';
        }
      }
    }
  }
`;

export const AddressTitleBlock = styled.div`
  display: flex;

  span {
    margin-left: 5px;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    span {
      max-width: calc(100vw - 145px);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const Title = styled.div`
  padding: 18px 16px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

export const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px 10px 0 0;
  overflow: hidden;

  h4 {
    margin: 0;
  }

  button {
    margin-left: 8px;
    margin-right: 0;
    padding: 6px 24px;
    font-size: 14px;
  }
`;
