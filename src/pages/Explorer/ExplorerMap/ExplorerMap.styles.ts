import styled from 'styled-components';

import { Grid, Accordion as MuiAccordion, Typography } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const Container = styled.div`
  position: relative;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;
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
    width: 258px;
  }
`;

export const Title = styled(Typography)`
  margin-top: 53px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
`;

export const SubTitle = styled(Typography)`
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
  background-color: transparent;
  border: 1px solid ${props => props.theme.card.border.default};
  color: ${props => props.theme.card.text.default};
  transition: all 0.5s ease;

  &:hover {
    border-color: ${props => props.theme.card.border.active};
    color: ${props => props.theme.card.text.active};
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
`;
