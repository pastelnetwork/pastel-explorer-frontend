import styled from 'styled-components';

import { lighten } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const BlockContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${themeVariant.custom.white};
  text-align: center;
  width: 125px;
  height: 125px;
  cursor: pointer;
  background: repeating-linear-gradient(
    rgb(45, 51, 72),
    rgb(45, 51, 72) 0.175375%,
    rgb(147, 57, 244) 0.175375%,
    rgb(16, 95, 176) 100%
  );
  // background: repeating-linear-gradient(
  //   ${themeVariant.palette.primary.main},
  //   ${themeVariant.palette.primary.main} 0.018575%,
  //   ${themeVariant.palette.secondary.main} 0.018575%,
  //   ${themeVariant.palette.primary.main} 100%
  // );
  transition: transform 0.2s ease-in;

  &::before {
    content: '';
    width: 20px;
    height: 125px;
    position: absolute;
    top: -12px;
    left: -20px;
    background-color: ${themeVariant.sidebar.background};
    transform: skewY(50deg);
    transform-origin: top;
  }

  &::after {
    content: '';
    width: 125px;
    height: 24px;
    position: absolute;
    top: -24px;
    left: -20px;
    background-color: ${lighten(themeVariant.sidebar.background, 0.2)};
    transform: skew(40deg);
    transform-origin: top;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;
