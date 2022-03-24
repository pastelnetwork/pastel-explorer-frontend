import styled from 'styled-components';
import { Grid } from '@material-ui/core';

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
`;

export const Gird = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down('md')} {
    flex-wrap: wrap;
  }
`;

export const ExplorerMapColumn = styled.div`
  width: 60%;
  margin-right: 12px;

  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const SupernodeColumn = styled.div`
  width: calc(40% - 4px);

  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
`;

export const ChartLegend = styled.div`
  position: relative;
  bottom: 6px;
  font-size: 14px;
  text-align: center;

  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    bottom: 30px;
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

  ${props => props.theme.breakpoints.down('md')} {
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

  ${props => props.theme.breakpoints.down('md')} {
    &.left {
      padding-right: 12px;
    }

    &.right {
      padding-left: 12px;
      padding-top: 0;
    }
  }
`;
