import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { CSVLink } from 'react-csv';

export const GridWrapper = styled(Grid)`
  .col-address {
    & > .MuiTableCell-root {
      padding-left: 0;
    }
  }

  .bold {
    font-weight: 700;
  }

  .title {
    font-size: 15px;
  }

  .copy-icon {
    margin-left: 0;
  }

  .ReactVirtualized__Table__headerRow {
    display: none;
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
    }
  }

  .ticket-title-wrapper {
    h4 {
      margin: 0;
      padding: 0;
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

  ${props => props.theme.breakpoints.down(800)} {
    .ticket-title-wrapper {
      h4 {
        margin-bottom: 5px;
      }
    }
  }

  ${props => props.theme.breakpoints.down(570)} {
    .filter-wrapper {
      display: flex;
      flex-direction: column;
    }

    .supernode-status {
      flex-direction: column;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 0;
  background: ${props => props.theme.card.titleColor};

  ${props => props.theme.breakpoints.down(800)} {
    flex-direction: column;
  }
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
  display: inline-flex;
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
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const FilterBlock = styled.div`
  ${props => props.theme.breakpoints.down('sm')} {
    margin-top: 10px;
  }

  ${props => props.theme.breakpoints.down(570)} {
    text-align: center;

    .supernode-status {
      flex-direction: column;
      width: 100%;
    }
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

export const CSVLinkButton = styled(CSVLink)`
  margin-left: 10px;
  padding: 8px 25px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Gill Sans';
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }

  ${props => props.theme.breakpoints.down(570)} {
    display: inline-flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 375px) {
    padding: 8px 16px;
    font-size: 15px;
  }
`;

export const ContentWrapper = styled.div`
  display: block;

  .masternode-detail {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .header-cell {
    display: inline-flex;
    align-items: center;
  }

  .nowrap {
    white-space: nowrap;
  }

  .title {
    font-weight: 400;
  }

  .MuiIconButton-root {
    .MuiSvgIcon-root {
      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    &.open {
      .MuiSvgIcon-root {
        transform: rotate(180deg);
      }
    }
  }

  .custom-table {
    .table__row {
      &.row_active {
        &,
        &:hover,
        &:nth-of-type(2n + 1) {
          background-color: ${props => props.theme.supernodes.table.even} !important;
        }
      }
    }

    .row_more_active {
      background-color: ${props => props.theme.supernodes.table.active};

      &:nth-of-type(2n + 1) {
        background-color: ${props => props.theme.supernodes.table.even} !important;
      }
    }

    .MuiSvgIcon-root {
      color: ${props => props.theme.palette.text.primary};
    }

    .wrapper-content {
      display: inline-flex;
      align-items: center;
    }

    .see-more {
      .MuiButtonBase-root {
        padding: 1px;
      }
    }
  }

  ${props => props.theme.breakpoints.down(1170)} {
    .custom-table {
      .table__row-header {
        display: none;
      }

      .table__row {
        display: flex;
        flex-direction: column;
        width: 100%;

        .cell-content {
          &::before {
            content: attr(data-title);
            position: relative;
            display: inline-flex;
            min-width: 100px;
            padding-right: 0;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }
        }
      }
    }
  }

  ${props => props.theme.breakpoints.down(768)} {
    .custom-table {
      .masternode-detail {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  ${props => props.theme.breakpoints.down(480)} {
    .custom-table {
      .masternode-detail {
        grid-template-columns: 1fr;
      }

      .table__row {
        .cell-content {
          &.see-more {
            width: 100%;

            &::before {
              display: inline-flex;
            }
          }
        }
      }

      .address-link {
        max-width: 57vw;
        display: inline-block;
      }
    }
  }
`;
