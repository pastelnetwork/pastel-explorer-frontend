import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';

export const TicketsContainer = styled.div`
  position: relative;
  width: 100%;

  .dropdown-ticket-type {
    .MuiInputBase-root {
      width: 140px;
    }
  }

  .dropdown-status {
    .MuiInputBase-root {
      width: 100px;
    }
  }

  .nowrap {
    white-space: nowrap;
  }

  .list-filter {
    margin-left: 10px;
    border: 1px solid ${props => props.theme.filter.border};
  }

  .dropdown-status {
    margin-left: 10px;
  }

  .filter-item {
    transition: none;

    &-active,
    &:hover {
      background: ${props => props.theme.filter.background};
    }
  }

  ${props => props.theme.breakpoints.down(1167)} {
    .filter-wrapper {
      justify-content: flex-end;

      .list-filter {
        margin-top: 10px;
      }
    }

    .ticket-title-section {
      width: 50%;
    }
  }

  ${props => props.theme.breakpoints.down(960)} {
    .ticket-title-wrapper {
      display: block;
    }

    .dropdown-ticket-type,
    .dropdown-status,
    .list-filter {
      margin-top: 10px;
    }
  }

  ${props => props.theme.breakpoints.down(817)} {
    .filter-wrapper {
      justify-content: center;
    }

    .ticket-title-section {
      width: 100%;
    }
  }

  ${props => props.theme.breakpoints.down(680)} {
    .filter-wrapper {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  ${props => props.theme.breakpoints.down('xs')} {
    .dropdown-ticket-type,
    .list-filter {
      margin-left: 0;
    }

    .ticket-title-wrapper {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .min-h-60vh {
    min-height: 60vh;
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

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(1, 1, 1, 0.2);
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 10px;
`;
