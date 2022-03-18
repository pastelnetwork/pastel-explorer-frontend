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
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .address-wrapper {
    margin-bottom: 12px;

    & > .MuiPaper-root {
      margin-bottom: 0 !important;
    }
  }

  ${props => props.theme.breakpoints.down('md')} {
    .transaction-hash {
      max-width: calc(100vw - 225px);
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
          border-bottom: 0;

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
  }
`;
