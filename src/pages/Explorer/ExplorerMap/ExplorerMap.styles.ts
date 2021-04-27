import styled from 'styled-components';

import { Grid, Accordion as MuiAccordion } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  width: 258px;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${themeVariant.sidebar.background};
  color: ${themeVariant.sidebar.color};
  height: 100%;
`;

export const InfoBlock = styled(Grid)`
  margin: 5px 0;
  padding: 2px;
  border: 1px solid ${themeVariant.sidebar.background};
  border-radius: 3px;
  text-align: center;
`;

export const Accordion = styled(MuiAccordion)`
  background-color: ${themeVariant.map.background};
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
