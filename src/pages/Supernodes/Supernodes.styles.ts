import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  .col-address {
    & > .MuiTableCell-root {
      padding-left: 0;
    }
  }

  .supernode-table {
    padding-left: 0;
    padding-right: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .address-link {
      max-width: calc(100vw - 185px);
    }

    .ReactVirtualized__Grid {
      min-width: unset;
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
          margin-right: 10px;
          padding-right: 0;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
        }
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
  }
`;

export const BlockWrapper = styled.div`
  margin-top: 24px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  .table-title {
    margin: 0;
    padding: 18px 16px;
    background: ${props => props.theme.card.titleColor};
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.span`
  margin-right: 0;
`;

export const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 400;

  ${props => props.theme.breakpoints.down('xs')} {
    font-size: 14px;
  }
`;

export const Status = styled.div`
  padding: 2px 10px;
  font-size: 14px;
  background: ${props => props.theme.supernodes.status.background.newStart};
  color: ${props => props.theme.supernodes.status.color};
  border-radius: 8px;

  &.enabled {
    background: ${props => props.theme.supernodes.status.background.enabled};
  }

  &.expired {
    background: ${props => props.theme.supernodes.status.background.expired};
  }

  ${props => props.theme.breakpoints.down(1024)} {
    max-width: calc(100vw - 165px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
  }
`;

export const FilterBlock = styled.div`
  ${props => props.theme.breakpoints.down('xs')} {
    margin-top: 10px;
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
