import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import themeVariant from '@theme/variants';

export const TicketsContainer = styled.div`
  width: 100%;

  .copy-icon {
    margin-left: 0;
  }

  .read-more {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
  }

  .mr-10 {
    margin-right: 10px;
  }

  .cascade-image {
    width: 48px;

    img {
      width: 48px;
      max-height: 48px;
    }
  }

  .nft-image {
    width: 48px;
    margin-left: 10px;

    img {
      width: 48px;
      max-height: 48px;
    }
  }

  .sense-img {
    width: 48px;
    max-height: 48px;
  }

  .thumbnail-box {
    display: flex;
  }

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

  .inline-block {
    display: inline-block;
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

  .white-nowrap {
    white-space: nowrap;
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

  .tickets-table {
    .ReactVirtualized__Table__headerRow {
      display: none;
    }

    .bold {
      font-weight: 700;
    }

    .title {
      font-size: 15px;
    }

    .MuiGrid-spacing-xs-3 > .MuiGrid-item {
      padding: 4px 6px;
    }

    .ticket-status {
      display: flex;
      align-items: center;

      .action-ticket-status {
        padding: 6px 10px;
        border-radius: 4px;
      }
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

    .tickets-table {
      .ReactVirtualized__Table__rowColumn {
        .cell-content {
          &:before {
            display: none;
          }
        }
      }
    }
  }

  ${props => props.theme.breakpoints.up(960)} {
    .collection-col {
      .MuiGrid-root {
        max-width: 25%;
        flex-basis: 25%;
      }

      .col-time {
        max-width: 28%;
        flex-basis: 28%;
      }

      .col-type {
        max-width: 22%;
        flex-basis: 22%;
      }
    }
    .sense-col {
      .MuiGrid-root {
        max-width: 23%;
        flex-basis: 23%;
      }

      .col-txid {
        max-width: 20%;
        flex-basis: 20%;
      }

      .col-time {
        max-width: 26%;
        flex-basis: 26%;
      }

      .sense-output {
        max-width: 31%;
        flex-basis: 31%;
      }
    }
  }

  ${props => props.theme.breakpoints.up(960)} {
    .ticket-output {
      &.image-mobile,
      &.xs {
        display: none;
      }
    }
  }

  ${props => props.theme.breakpoints.between(600, 960)} {
    .ticket-output {
      &.image-desktop,
      &.xs {
        display: none;
      }
    }
  }

  ${props => props.theme.breakpoints.down(600)} {
    .ticket-output {
      &.image-desktop,
      &.sm {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1279px) {
    .MuiGrid-spacing-xs-6 > .MuiGrid-item {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 12px;
    }

    .MuiGrid-spacing-xs-6 {
      margin-bottom: 12px;
    }
  }
`;

export const SenseContainer = styled.div`
  width: 100%;
  line-height: 1.25;
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

  @media screen and (max-width: 1279px) {
    &.left,
    &.right {
      padding-left: 6px;
      padding-right: 6px;
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

  @media screen and (max-width: 1279px) {
    &.ticket-block-title {
      padding-right: 0;
    }
  }
`;

export const TicketSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  ${props => props.theme.breakpoints.down(1279)} {
    padding-bottom: 15px;
    overflow-x: scroll;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    margin-bottom: 0;
    padding-bottom: 10px;
  }
`;

export const TicketSummaryBox = styled(RouterLink)`
  display: block;
  width: calc(100% / 6);
  margin-right: 12px;
  padding: 10px 25px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background-color: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 1px solid ${props => props.theme.palette.text.primary};

  &.offerTicketsAndTransferTickets {
    min-width: 240px;
  }

  &.pastelIDAndUsernameTickets {
    min-width: 225px;
  }

  &:hover {
    border-color: ${props => props.theme.sidebar.menu.active};

    .ticket-summary-title,
    .ticket-summary-value {
      color: ${props => props.theme.sidebar.menu.active};
    }
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
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .ticket-summary-value {
    margin-top: 3px;
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.card.color};
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    white-space: nowrap;
  }

  @media screen and (max-width: 1279px) {
    width: auto;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;

  .btn-toggle,
  .view-all {
    padding: 0;
  }

  .view-all {
    .MuiTypography-root {
      padding: 0;
    }
  }

  .btn-toggle {
    display: none;

    @media screen and (max-width: 1101px) {
      display: inline-flex;
      margin-top: -2px;
    }

    &.show-less {
      .MuiSvgIcon-root {
        transform: rotate(180deg);
      }
    }
  }

  .MuiSvgIcon-root {
    &.toggle-icon {
      width: 30px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: ${props => props.theme.link.main};
    }
  }
`;
