import styled from 'styled-components';

import { Grid, Accordion as MuiAccordion, Typography } from '@mui/material';

import themeVariant from '@theme/variants';

export const Container = styled.div`
  position: relative;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  .supernode-table-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 1px solid ${props => props.theme.table.odd};

    .table__row {
      &:nth-of-type(odd) {
        background-color: ${props => props.theme.table.oddSupernode} !important;
      }
    }

    & > .MuiCard-root {
      height: auto !important;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    height: 332px;
  }

  @media (min-width: 1281px) {
    min-height: 414px;
  }
`;

export const Wrapper = styled.div`
  width: 325px;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.primary};
  height: 100%;

  ${props => props.theme.breakpoints.down('xs')} {
    width: 310px;
  }
`;

export const Title = styled(Typography)`
  margin-top: 33px;
  margin-bottom: 18px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

export const SubTitle = styled(Typography)`
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
`;

export const InfoBlock = styled(Grid)`
  margin: 5px 0;
  padding: 2px;
  border: 1px solid ${themeVariant.sidebar.background};
  border-radius: 3px;
  text-align: center;
`;

export const Accordion = styled(MuiAccordion)`
  margin-bottom: 14px;
  background-color: transparent;
  border: 1px solid ${props => props.theme.card.border.default};
  color: ${props => props.theme.card.text.default};
  transition: all 0.5s ease;

  svg {
    fill: ${props => props.theme.card.text.default};
  }

  &:hover {
    border-color: ${props => props.theme.card.border.active};
    color: ${props => props.theme.card.text.active};

    svg {
      fill: ${props => props.theme.card.text.active};
    }
  }
`;

export const LegendContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export const LegendElement = styled.div<{ backgroundcolor: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  margin: 0 5px;
`;

export const TitleRow = styled(Grid)`
  width: 100%;
  padding-bottom: 0 !important;

  &.subTitle {
    padding-top: 0 !important;
  }
`;
