import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const TableWrapper = styled(Grid)`
  position: relative;
  min-height: 30vh;

  .direction-status {
    display: inline-flex;
    padding: 6px 10px 7px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: ${themeVariant.custom.white};
    background-color: ${themeVariant.custom.red.dark};
    border-radius: 4px;

    &.incoming {
      background-color: ${themeVariant.custom.green.main};
    }
  }

  .latest-transaction-table {
    padding-left: 0;
    padding-right: 0;
  }

  .table-wrapper {
    overflow-x: hidden;
  }

  .loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .relative {
    position: relative;
  }

  .transaction-table-mask {
    min-height: 595px;
    background: ${props => props.theme.sidebar.menu.background};
    box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
    border-radius: 0 0 10px 10px;
  }

  .mt-15 {
    margin-top: 15px;
  }

  @media (min-width: 1024px) {
    .col-hash {
      .MuiTableCell-root {
        padding-left: 7px;
      }
    }

    .col-amount {
      .MuiTableCell-root {
        padding-left: 16px;
      }
    }

    .col-direction {
      .MuiTableCell-root {
        padding-left: 21px;
      }
    }

    .col-timestamp {
      .MuiTableCell-root {
        padding-left: 22px;
      }
    }
  }
`;

export const Wrapper = styled.div`
  .disable {
    cursor: default;
    pointer-events: none;
  }

  .address-table-wrapper {
    padding: 10px 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: ${props => props.theme.sidebar.menu.background};
  }

  .ReactVirtualized__Grid {
    min-width: unset;
  }

  .address-wrapper {
    margin-bottom: 8px;

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
          content: attr(data-title);
          position: relative;
          min-width: 150px;
          display: inline-block;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
        }
      }
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .transaction-hash,
    .transaction-hash-link {
      max-width: calc(100vw - 225px);
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

      .cell-content {
        &:before {
          content: attr(data-title);
          position: relative;
          width: 100px;
          min-width: 100px;
          padding-right: 0;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
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

  a {
    margin-left: 8px;
    margin-right: 0;
    padding: 6px 24px;
    font-size: 14px;
  }
`;

export const BalanceHistoryWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 0;

  .balance-history-dropdown {
    .MuiSelect-select {
      width: auto;
    }
  }
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 16px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px 10px 0 0;
  overflow: hidden;

  &.direction-item {
    padding: 14px 16px;
  }

  @media (max-width: 390px) {
    flex-direction: column;

    .direction-period {
      margin-top: 5px;
    }
  }
`;

export const HeadingTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 266px;
  padding: 10px 8px;
  background: ${props => props.theme.sidebar.menu.background};

  .balance-history-loader {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .echarts-for-react {
    height: 246px !important;
  }

  .line-chart {
    padding: 0;
  }

  .period {
    justify-content: flex-end;
    margin-right: 12px;
    margin-bottom: 0;
  }

  @media (max-width: 960px) {
    .period {
      width: 100%;
      margin-top: 10px;

      span,
      button {
        margin-button: 0;
      }
    }
  }

  @media (max-width: 390px) {
    .period {
      flex-direction: column;
      margin-top: 20px;
    }
  }
`;

export const SummaryWrapper = styled.div`
  display: flex;
  width: 30%;
  margin-left: 8px;

  @media (max-width: 960px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;

  @media (max-width: 600px) {
    margin-right: 0;
    margin-top: 10px;
  }
`;

export const SummaryLabel = styled.span`
  color: ${props => props.theme.sidebar.menu.default};
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
`;

export const SummaryValue = styled.p`
  margin: 0;
  font-size: 22px;
  line-height: 1.1;
  font-weight: 700;
  overflow: hidden;
  color: ${props => props.theme.card.color};
`;

export const BalanceHistorySummaryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 375px) {
    .period {
      span {
        display: block;
        width: 100%;
        padding-left: 12px;
      }
    }
  }
`;

export const SummaryIcon = styled.div`
  width: 38px;
  height: 38px;
  margin-top: 1px;
  margin-right: 7px;
  padding: 10px;
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 50%;
  border: 1px solid rgb(16 16 16 / 6%);
  opacity: 0.3;

  svg {
    width: 100%;
    height: 100%;
  }

  &.active {
    opacity: 1;

    &.balance {
      border-color: #5470c6;
    }

    &.sent {
      border-color: #e94830;
    }

    &.received {
      border-color: #219653;
    }
  }
`;

export const ItemWrapper = styled.div`
  line-height: 1;
`;

export const DirectionChartWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 16px;

  .line-chart {
    padding: 16px;
  }
`;

export const ChartItem = styled.div`
  width: 100%;

  .chart-box {
    position: relative;
    min-height: 260px;
    background: ${props => props.theme.sidebar.menu.background};
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  }

  .echarts-for-react {
    height: 240px !important;
  }

  .direction-period {
    justify-content: flex-end;

    .MuiSelect-select {
      width: auto;
    }

    button,
    span {
      margin-bottom: 0;
    }
  }
`;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  text-align: center;
  transform: translate(-50%, -50%);
`;

export const LoadingText = styled.div`
  margin-top: 0;
  font-size: 20px;
`;
