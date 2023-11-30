import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiAccordion from '@mui/material/Accordion';
import Grid from '@mui/material/Grid';

import themeVariant from '@theme/variants';

export const TicketTitle = styled(Typography)`
  font-weight: 600;
`;

export const TicketContent = styled(Box)`
  &.capitalize {
    text-transform: capitalize;
  }

  &.nowrap {
    white-space: nowrap;
  }

  &.break-all {
    word-break: break-all;
  }

  &.view-more {
    .address-link {
      margin-left: 8px;
    }
  }

  .address-link {
    &.small {
      display: block;
      max-width: 67%;
    }

    &.pastel {
      display: block;
      max-width: 52%;
    }
  }

  &.read-more {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sense-img {
    width: 200px;
    height: 200px;
    transition: all 0.3s ease-in-out;

    &:not(.placeholder) {
      &:hover {
        transform: scale(2);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Accordion = styled(MuiAccordion)`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0;
  padding-left: 0;
  background: transparent;
  border-radius: 0 !important;
  overflow: hidden;

  .MuiAccordionSummary-root {
    padding-left: 0;
  }

  .MuiAccordionSummary-content {
    margin: 0;
  }

  .expand-more {
    display: flex;
    color: ${props => props.theme.link.main};

    &:hover {
      color: ${props => props.theme.link.hover};
    }
  }

  .MuiAccordionSummary-root {
    &,
    &.Mui-expanded {
      min-height: 50px;
    }

    svg {
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    &.Mui-expanded {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .MuiAccordionDetails-root {
    padding: 0;

    & > .MuiBox-root {
      width: 100%;
    }
  }
`;

export const ButtonLink = styled.button`
  margin: 0 0 0 5px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${props => props.theme.link.main};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.link.hover};
  }
`;

export const ActionRegistrationTicketStatus = styled.div`
  display: inline-flex;
  padding: 6px 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: ${themeVariant.custom.white};
  background-color: ${themeVariant.custom.red.dark};
  border-radius: 4px;

  &.active {
    margin-right: 5px;
    background-color: ${themeVariant.custom.green.main};
  }
`;

export const StatusWrapper = styled.div`
  display: flex;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const ActivationTicketItem = styled(Grid)`
  display: flex;

  &.item {
    margin-top: 6px;
    margin-left: 6px;
    margin-bottom: 4px;
  }

  .mr-5 {
    margin-right: 5px;
  }

  @media (max-width: 600px) {
    display: block;
  }
`;

export const OfferWrapper = styled(Box)`
  .nft-image {
    width: 200px;
    height: 200px;
    transition: all 0.3s ease-in-out;

    &:not(.placeholder) {
      &:hover {
        transform: scale(2);
      }
    }
  }

  .driver {
    margin: 20px 0;
    border-top: solid 1px ${props => props.theme.table.hover};
  }

  ${props => props.theme.breakpoints.down('sm')} {
    .mb-sm-8 {
      margin-bottom: 8px;
    }
  }
`;
