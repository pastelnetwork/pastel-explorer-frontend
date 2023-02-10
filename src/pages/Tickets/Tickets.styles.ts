import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const TicketsContainer = styled.div`
  width: 100%;

  .p-16 {
    padding: 16px;
  }

  .nowrap {
    white-space: nowrap;
  }

  .mb-0 {
    margin-bottom: 0;
  }

  .empty-label {
    max-width: 100%;
    padding: 10px;
  }

  .more-detail {
    margin-top: 4px;
  }

  .table-title {
    margin: 0;
  }

  .data-table {
    padding: 0;

    .ReactVirtualized__Grid,
    .ReactVirtualized__Table__headerRow {
      min-width: unset;
    }
  }

  .view-detail {
    margin-left: 5px;

    ${props => props.theme.breakpoints.down(960)} {
      display: block;
      margin-top: 4px;
      margin-left: 0;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .ReactVirtualized__Grid,
    .ReactVirtualized__Table__headerRow {
      min-width: unset;
    }
  }

  ${props => props.theme.breakpoints.down(960)} {
    .sense-status {
      padding: 10px 0;
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

      &.txID {
        &:before {
          content: 'txID';
        }
      }

      &.type {
        &:before {
          content: 'Type';
        }
      }

      &.version {
        &:before {
          content: 'Version';
        }
      }

      &.timestamp {
        &:before {
          content: 'Timestamp';
        }
      }

      &.status {
        &:before {
          content: 'Status';
        }
      }

      &.fee {
        &:before {
          content: 'Fee';
        }
      }

      &.pastelID {
        &:before {
          content: 'PastelID';
        }
      }

      &.idType {
        &:before {
          content: 'ID Type';
        }
      }
    }
  }
`;

export const SenseContainer = styled.div`
  width: 100%;
`;

export const CascadeContainer = styled.div`
  width: 100%;
`;

export const PastelContainer = styled.div`
  width: 100%;
`;

export const OtherTicketContainer = styled.div`
  width: 100%;
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

export const BlockTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 16px;
  background: ${props => props.theme.card.titleColor};

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
      white-space: nowrap;

      ${props => props.theme.breakpoints.down(500)} {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }
`;
