import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import { getCurrencyName } from '@utils/appInfo';

export const ExplorerWrapper = styled.div`
  .MuiPaper-elevation1 {
    &.MuiPaper-rounded {
      &::-webkit-scrollbar {
        width: 18px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.scrollbar};
      }
    }
  }

  .copy-icon {
    margin-left: 0;
  }
`;

export const Gird = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down(1024)} {
    flex-wrap: wrap;
  }
`;

export const ExplorerMapColumn = styled.div`
  width: 60%;
  margin-right: 12px;

  ${props => props.theme.breakpoints.down(1024)} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const SupernodeColumn = styled.div`
  width: calc(40% - 4px);

  ${props => props.theme.breakpoints.down(1024)} {
    width: 100%;
  }
`;

export const BlockWrapper = styled.div`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  &.mt-24 {
    margin-top: 24px;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    &.mt-24 {
      margin-top: 12px;
    }

    &.latest-transactions-wrapper {
      margin-top: 0;
    }
  }

  .table-container {
    border-radius: 0;
  }

  .custom-table {
    .table__row-header {
      th {
        padding: 9px 16px;
        background-color: ${props => props.theme.table.header} !important;

        &.th-block,
        &.th-fee,
        &.th-txs {
          width: 60px;
        }

        &.th-amount,
        &.th-size {
          width: 90px;
          white-space: nowrap;
        }

        &.th-recipents {
          width: 80px;
        }
        }

        &.th-timestamp {
          width: 120px;
        }
      }
    }

    .table__row {
      background-color: ${props => props.theme.table.even} !important;
      transition: all 0.5s ease;

      &:nth-of-type(odd) {
        background-color: ${props => props.theme.table.odd} !important;
      }

      td,
      th {
        padding: 12px 16px;
      }

      &:last-child {
        td,
        th {
          border-bottom: none;
        }
      }

      &:hover {
        background-color: ${props => props.theme.table.hover} !important;
      }
    }

    .MuiTypography-root {
      max-width: 74px;

      &.no-limit {
        max-width: unset;
      }
    }
  }

  ${props => props.theme.breakpoints.down(960)} {
    .custom-table {
      thead {
        display: none;
      }

      .table__row {
        display: flex;
        flex-direction: column;

        td,
        th {
          display: flex;
          padding: 5px 16px;
          border-bottom: 0;
          max-width: unset !important;
          width: 100% !important;
          flex-direction: unset;
          text-align: left;

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

      &.latest-blocks {
        .table__row {
          td,
          th {
            &:nth-child(1) {
              &:before {
                content: 'Block';
              }
            }

            &:nth-child(2) {
              &:before {
                content: 'Hash';
              }
            }

            &:nth-child(3) {
              &:before {
                content: 'TXs';
              }
            }

            &:nth-child(4) {
              &:before {
                content: 'Size';
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

      &.latest-transactions {
        .table__row {
          td,
          th {
            &:nth-child(1) {
              &:before {
                content: 'Block';
              }
            }

            &:nth-child(2) {
              &:before {
                content: 'TXID';
              }
            }

            &:nth-child(3) {
              &:before {
                content: 'Amount(${getCurrencyName()})';
              }
            }

            &:nth-child(4) {
              &:before {
                content: 'Recipents';
              }
            }

            &:nth-child(5) {
              &:before {
                content: 'Fee';
              }
            }
          }
        }
      }
    }
  }
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 16px;
  background: ${props => props.theme.card.titleColor};

  &.latest-blocks {
    display: flex;
    justify-content: space-between;
    padding-right: 16px;

    p {
      padding: 0;
    }

    svg {
      width: 12px;
      height: auto;
      margin-left: 5px;
    }

    .view-all {
      p {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const GirdStyle = styled(Grid)`
  &.left {
    padding-right: 6px;
  }

  &.right {
    padding-left: 6px;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    &.left {
      padding-right: 12px;
    }

    &.right {
      padding-left: 12px;
      padding-top: 0;
    }
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;

  .btn-toggle,
  .view-all {
    padding: 0;
  }

  .view-all {
    .MuiTypography-root {
      padding: 0;
    }
  }

  .btn-toggle {
    display: none;

    @media screen and (max-width: 1279px) {
      display: inline-flex;
      margin-top: -2px;
    }

    &.show-less {
      .MuiSvgIcon-root {
        transform: rotate(180deg);
      }
    }
  }

  .MuiSvgIcon-root {
    &.toggle-icon {
      width: 30px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: ${props => props.theme.link.main};
    }
  }
`;
