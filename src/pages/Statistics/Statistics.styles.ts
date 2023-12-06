import styled from 'styled-components';

import { Grid, darken } from '@mui/material';

import themeVariant from '@theme/variants';

export const StatisticsContainer = styled.div`
  .network-block,
  .transaction-statistics-block {
    padding-top: 16px;
  }
`;

export const ZoomContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const ZoomElement = styled.div`
  cursor: pointer;
  border: 1px solid ${themeVariant.palette.text};
  border-radius: 3px;
  background-color: ${themeVariant.palette.background.default};
  padding: 2px 0;
  font-size: 0.8rem;
  transition: all 0.2s ease-in;
  margin: 0 3px;
  width: 40px;
  text-align: center;

  &:hover {
    background-color: ${darken(themeVariant.palette.background.paper, 0.1)};
  }
`;

export const BlockWrapper = styled.div`
  position: relative;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  border-radius: 10px;
  overflow: hidden;

  .p-16 {
    padding: 16px;
  }

  &.no-shadow {
    box-shadow: none;
  }

  .cascade-sense-card {
    .echarts-for-react {
      height: 280px !important;
    }
  }
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 16px;
  background: ${props => props.theme.card.titleColor};
`;

export const GridStyle = styled(Grid)`
  background: ${props => props.theme.sidebar.menu.background};
`;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
`;

export const GridBlocksStatisticsRoot = styled(Grid)`
  padding: 25px 20px;
  overflow-x: auto;
  width: 100%;
  margin: 0;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbar};
    border-radius: 8px;
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .cascade-sense-card {
    width: calc(50% - 8px);
    margin-right: 16px;
    margin-bottom: 16px;

    &:nth-child(3) {
      margin-right: 16px;
    }

    &:nth-child(2),
    &:nth-child(4) {
      margin-right: 0;
    }

    ${props => props.theme.breakpoints.down('sm')} {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

export const TransactionsStatisticsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 16px;

  & > div {
    box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
    border-radius: 10px;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    display: block;

    & > div {
      border-radius: 0;
    }
  }
`;

export const ChartSection = styled.div`
  position: relative;
  width: 100%;
`;

export const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  font-size: 20px;
  transform: translate(-50%, -50%);
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 85%;
  height: fit-content;
  margin: auto;
  padding: 0;
  background: #fff;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  .mempool-wrapper {
    margin-bottom: 0;
  }

  .table__row-header--cell {
    cursor: default;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    max-width: 92%;

    .mempool-table {
      .table__row-header {
        display: none;
      }

      .table__row {
        display: flex;
        flex-direction: column;

        .cell-content {
          &:before {
            content: attr(data-title);
            position: relative;
            display: block;
            margin-right: 5px;
            padding-right: 0;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }
        }
      }
    }
  }
`;

export const NoContent = styled.div`
  padding: 10px;
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  padding: 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;
