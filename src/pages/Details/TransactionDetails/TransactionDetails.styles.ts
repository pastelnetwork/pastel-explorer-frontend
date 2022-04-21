import styled from 'styled-components';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert as MuiAlert } from '@material-ui/lab';
import { Grid, Toolbar } from '@material-ui/core';

import { getCurrencyName } from '@utils/appInfo';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

export const Wrapper = styled('div')`
  .transaction-wrapper {
    margin-bottom: 20px;
  }

  .none-border-radius-top {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .transaction-hash {
      max-width: calc(100vw - 225px);
    }

    .address-link {
      max-width: calc(100vw - 200px);
    }

    .transaction-wrapper {
      margin-bottom: 12px;
    }

    .input-addresses-wrapper {
      margin-bottom: 0;
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
          padding-top: 6px;
          padding-bottom: 6px;
          border: 0;

          &:before {
            position: relative;
            min-width: 120px;
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }
        }
      }

      &.transaction {
        .table__row {
          &:nth-of-type(odd) {
            background-color: ${props => props.theme.sidebar.background.default} !important;
          }

          td {
            &:nth-child(1) {
              &:before {
                content: 'Block Hash';
              }
            }

            &:nth-child(2) {
              &:before {
                content: 'Confirmations';
              }
            }

            &:nth-child(3) {
              &:before {
                content: 'Recipients';
              }
            }

            &:nth-child(4) {
              &:before {
                content: 'Amount (${getCurrencyName()})';
              }
            }

            &:nth-child(5) {
              &:before {
                content: 'Timestamp';
              }
            }
          }
        }
      }

      &.input-addresses,
      &.recipients {
        .table__row {
          td {
            &:nth-child(1) {
              &:before {
                content: 'Address';
              }
            }

            &:nth-child(2) {
              &:before {
                margin-right: 8px;
                content: 'Amount (${getCurrencyName()})';
              }
            }

            &:nth-child(3) {
              &:before {
                margin-right: 8px;
                content: 'Amount (USD)';
              }
            }
          }
        }
      }
    }
  }
`;

export const Alert = styled(MuiAlert)`
  justify-content: center;
`;

export const TransactionDesc = styled(Grid)`
  margin-bottom: 12px;

  & > .MuiAlert-root {
    border-radius: 10px;
  }
`;

export const TransactionRawData = styled.pre`
  max-width: 100%;
  overflow: auto;
`;

export const TransactionRawDataToolbar = styled(Toolbar)`
  background-color: ${props => props.theme.sidebar.background.default};

  svg {
    fill: ${props => props.theme.sidebar.closeIcon};
  }

  .MuiTypography-h6 {
    color: ${props => props.theme.sidebar.closeIcon};
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
`;

export const GridStyle = styled(Grid)`
  ${props => props.theme.breakpoints.down(1024)} {
    width: 100%;
    margin-bottom: 6px;
    margin-left: 0;
    margin-right: 0;

    & > .MuiGrid-item {
      padding-left: 6px;
      padding-right: 6px;
    }
  }
`;

export const ViewTransactionRawMuiAlert = styled(MuiAlert)`
  .MuiAlert-icon {
    display: none;
  }
`;

export const ViewTransactionRaw = styled('button')`
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.link.main};

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;

export const GirdWrapper = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down('lg')} {
    flex-wrap: wrap;
  }
`;

export const LeftColumn = styled.div`
  width: 50%;
  margin-right: 12px;

  ${props => props.theme.breakpoints.down('lg')} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const RightColumn = styled.div`
  width: calc(50% - 4px);

  ${props => props.theme.breakpoints.down('lg')} {
    width: 100%;
  }
`;
