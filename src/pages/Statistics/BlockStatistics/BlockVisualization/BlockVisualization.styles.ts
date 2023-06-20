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
  height: 145px;
  cursor: pointer;
  background: repeating-linear-gradient(
    rgb(45, 51, 72),
    rgb(45, 51, 72) 0.175375%,
    rgb(147, 57, 244) 0.175375%,
    rgb(16, 95, 176) 100%
  );
  &.block-unconfirmed {
    background: repeating-linear-gradient(
      to right,
      rgb(85, 75, 69),
      rgb(85, 75, 69) 0.7863%,
      rgb(93, 125, 1) 0.7863%,
      rgb(93, 125, 1) 14.6762%,
      rgb(93, 125, 1) 14.9597%,
      rgb(109, 125, 4) 29.5583%,
      rgb(109, 125, 4) 29.1331%,
      rgb(140, 125, 9) 43.4482%,
      rgb(140, 125, 9) 43.3065%,
      rgb(166, 125, 14) 57.3381%,
      rgb(166, 125, 14) 57.4798%,
      rgb(166, 125, 14) 71.228%,
      rgb(166, 125, 14) 71.6532%,
      rgb(170, 125, 15) 86.1101%,
      rgb(170, 125, 15) 85.8266%,
      rgb(178, 125, 16) 100%
    );
  }
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
    height: 145px;
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
