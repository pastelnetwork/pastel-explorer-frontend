import styled from 'styled-components';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert as MuiAlert } from '@material-ui/lab';
import { Grid, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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

  .mb-10 {
    margin-bottom: 10px;
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

  .addresses-wrapper {
    margin-bottom: -8px;
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

export const RawDataWrapper = styled.span`
  .MuiButtonBase-root {
    margin: 0 5px 0 0;
    padding: 0;

    .MuiSvgIcon-root {
      width: 14px;
      height: 14px;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;
`;

export const TicketTitle = styled(Typography)`
  margin: 10px 0;
  font-weight: 600;
`;

export const TicketContent = styled(Typography)`
  margin: 10px 0;
`;

export const Loader = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 62vh;
`;

export const SenseItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SenseImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  overflow: hidden;

  img {
    width: 50px;
    height: 50px;
  }
`;

export const SenseContentWrapper = styled.div`
  width: calc(100% - 80px);
`;
