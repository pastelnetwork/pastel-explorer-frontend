import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MuiAccordion from '@material-ui/core/Accordion';

export const TicketTitle = styled(Typography)`
  font-weight: 600;
`;

export const TicketContent = styled(Typography)`
  &.capitalize {
    text-transform: capitalize;
  }

  &.break-all {
    word-break: break-all;
  }

  &.view-more {
    .address-link {
      margin-left: 8px;
    }
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
