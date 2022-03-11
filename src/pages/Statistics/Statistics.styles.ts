import styled from 'styled-components/macro';

import { darken } from '@material-ui/core';

import themeVariant from '@theme/variants';

export const StatisticsContainer = styled.div`
  .network-block,
  .transaction-statistics-block {
    padding-top: 16px;
  }
`;

export const ZoomContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const ZoomElement = styled.div`
  cursor: pointer;
  border: 1px solid ${themeVariant.palette.text};
  border-radius: 3px;
  background-color: ${themeVariant.palette.background.default};
  padding: 2px 0;
  font-size: 0.8rem;
  transition: all 0.2s ease-in;
  margin: 0 3px;
  width: 40px;
  text-align: center;

  &:hover {
    background-color: ${darken(themeVariant.palette.background.paper, 0.1)};
  }
`;

export const BlockWrapper = styled.div`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 16px;
  background: ${props => props.theme.card.titleColor};
`;
