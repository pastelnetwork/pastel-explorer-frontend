import styled from 'styled-components';

import { getCurrencyName } from '@utils/appInfo';

import {
  Typography as MuiTypography,
  Accordion as MuiAccordion,
  Grid,
  IconButton,
} from '@material-ui/core';

export const Wrapper = styled('div')`
  .block-wrapper {
    margin-bottom: 12px;

    & > .MuiPaper-root {
      margin-bottom: 0 !important;
    }
  }

  .block-table-wrapper {
    border-radius: 0;
  }

  .transactions-table-wrapper {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .MuiAccordionSummary-content {
    color: ${props => props.theme.link.main};

    &:hover {
      color: ${props => props.theme.link.hover};
    }

    &:active {
      color: ${props => props.theme.link.pressed};
    }
  }

  .custom-table {
    &.block {
      .table__row-header {
        display: none;
      }

      .table__row {
        display: flex;
        flex-direction: column;
        background: ${props => props.theme.table.header} !important;

        td {
          display: flex;

          &:before {
            position: relative;
            min-width: 130px;
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }

          &:nth-child(1) {
            &:before {
              content: 'Height';
            }
          }

          &:nth-child(2) {
            &:before {
              content: 'Confirmations';
            }
          }

          &:nth-child(3) {
            &:before {
              content: 'Size (kB)';
            }
          }

          &:nth-child(4) {
            &:before {
              content: 'Timestamp';
            }
          }
        }
      }
    }
  }
  ${props => props.theme.breakpoints.down(1024)} {
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
            min-width: 130px;
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }
        }
      }

      &.block {
        .table__row {
          td {
            &:nth-child(1) {
              &:before {
                content: 'Height';
              }
            }

            &:nth-child(2) {
              &:before {
                content: 'Confirmations';
              }
            }

            &:nth-child(3) {
              &:before {
                content: 'Size (kB)';
              }
            }

            &:nth-child(4) {
              &:before {
                content: 'Timestamp';
              }
            }
          }
        }
      }

      &.transactions {
        .table__row {
          td {
            &:nth-child(1) {
              &:before {
                content: 'Hash';
              }
            }

            &:nth-child(2) {
              &:before {
                margin-right: 8px;
                content: 'Recipients';
              }
            }

            &:nth-child(3) {
              &:before {
                margin-right: 8px;
                content: 'Amount (${getCurrencyName()})';
              }
            }
          }
        }
      }
    }
  }
`;

export const Typography = styled(MuiTypography)`
  flex-grow: 1;
  margin: 0 5px;

  ${props => props.theme.breakpoints.down(1024)} {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100vw - 122px);
    white-space: nowrap;
  }
`;

export const Accordion = styled(MuiAccordion)`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0;
  padding-left: 10px;
  background: ${props => props.theme.table.header} !important;
  border-radius: 0 !important;
  overflow: hidden;

  &.Mui-expanded {
    padding-bottom: 7px;
  }

  .MuiAccordionSummary-root {
    justify-content: flex-start;
  }

  .MuiAccordionSummary-content {
    flex-grow: unset;
  }

  svg {
    fill: ${props => props.theme.link.main};

    &:hover {
      fill: ${props => props.theme.link.hover};
    }

    &:active {
      fill: ${props => props.theme.link.pressed};
    }
  }
`;

export const DetailsDescription = styled(Grid)`
  min-width: 130px;

  p {
    font-weight: 600;
  }
`;

export const DetailsContainer = styled(Grid)`
  margin: 5px 0;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-wrap: nowrap;
    padding-right: 10px;
  }
`;

export const DetailsValueText = styled(MuiTypography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${props => props.theme.breakpoints.down('sm')} {
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export const IconButtonStyle = styled(IconButton)`
  padding: 0;

  svg {
    fill: ${props => props.theme.palette.text.primary};
  }

  ${props => props.theme.breakpoints.down(1024)} {
    &.previous {
      margin-left: -12px;
    }

    &.next {
      margin-right: -12px;
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
