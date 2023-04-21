import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

import themeVariant from '@theme/variants';

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

  .table-wrapper {
    overflow-x: hidden;
  }

  .data-table {
    padding: 0;

    .ReactVirtualized__Grid,
    .ReactVirtualized__Table__headerRow {
      min-width: unset;
    }
  }

  .ReactVirtualized__Table__row {
    svg {
      color: ${themeVariant.custom.white};
      font-size: 14px;
    }

    .action-ticket-status {
      padding: 4px;
      border-radius: 8px;
    }
  }

  .view-detail {
    font-size: 14px;
    margin-left: 0px;

    .address-link {
      font-size: 14px;
    }

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
      display: flex;
      flex-wrap: wrap;
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

      .cell-content {
        &:before {
          content: attr(data-title);
          position: relative;
          min-width: 130px;
          font-weight: 600;
          font-size: 16px;
          color: ${props => props.theme.table.label};
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

  &.full {
    width: 100%;
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

export const TicketSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TicketSummaryBox = styled.a`
  display: block;
  width: calc(100% / 6);
  margin-right: 12px;
  padding: 10px 25px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background-color: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &.offerTicketsAndTransferTickets {
    min-width: 240px;
  }

  &.pastelIDAndUsernameTickets {
    min-width: 225px;
  }

  &:hover {
    background-color: ${props => props.theme.card.titleColor};
  }

  &:last-child {
    margin-right: 0;
  }

  .ticket-summary-title {
    display: block;
    color: ${props => props.theme.sidebar.menu.default};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
    white-space: nowrap;
  }

  .ticket-summary-value {
    margin-top: 3px;
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.card.color};
  }

  @media screen and (max-width: 1200px) {
    flex-wrap: wrap;
    width: 32%;
    margin-right: 10px;
    margin-bottom: 10px;

    &:nth-child(3) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 768px) {
    width: 49%;
    margin-bottom: 10px;

    &:nth-child(3) {
      margin-right: 10px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }

    &.offerTicketsAndTransferTickets {
      min-width: unset;
    }

    &.pastelIDAndUsernameTickets {
      min-width: unset;
    }
  }

  @media screen and (max-width: 525px) {
    width: 100%;
    margin-right: 0;

    &:nth-child(3) {
      margin-right: 0;
    }
  }
`;
