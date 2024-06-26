import styled from 'styled-components';
import { Grid } from '@mui/material';

export const TableContainer = styled(Grid)`
  position: relative;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  border-radius: 10px;
  overflow: hidden;

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .block-list-table {
    padding-left: 0;
    padding-right: 0;
  }

  .timestamp {
    white-space: nowrap;
  }

  .csv-wrapper {
    display: inline-flex;
  }

  .disable-download-csv {
    cursor: not-allowed;
    pointer-events: none;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .ReactVirtualized__Grid,
    .ReactVirtualized__Table__headerRow {
      min-width: unset;
    }

    .filter-wrapper > div {
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 12px;
    }
  }

  ${props => props.theme.breakpoints.down(960)} {
    .ReactVirtualized__Table__headerRow {
      display: none !important;
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

      .cell-content {
        &:before {
          content: attr(data-title);
          position: relative;
          width: 150px;
          min-width: 150px;
          padding-right: 0;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
        }
      }
    }
  }

  ${props => props.theme.breakpoints.down(680)} {
    .filter-wrapper {
      flex-direction: column;

      & > div {
        align-items: center;
      }
    }
  }

  ${props => props.theme.breakpoints.down('xs')} {
    .ReactVirtualized__Table__rowColumn {
      &:before {
        width: 90px;
        min-width: 90px;
      }
    }

    .list-filter {
      max-width: 84%;
    }
  }
`;

export const BlockHeight = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    fill: ${props => props.theme.sidebar.menu.background};

    &.box-icon {
      min-width: 16px !important;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  ${props => props.theme.breakpoints.down(960)} {
    margin-bottom: 10px;
  }
`;

export const Title = styled.span`
  margin-right: 0;
`;

export const SubTitle = styled.span`
  margin-left: 5px;
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 340px) {
    font-size: 14px;
  }
`;

export const BlockStatistics = styled.div`
  margin-bottom: 20px;
`;

export const HourglassWrapper = styled.div`
  margin-left: -8px;
`;

export const MempoolTableWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .mempool-list-table {
    padding: 0;
  }
`;
