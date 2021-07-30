import styled from 'styled-components/macro';
import { Grid } from '@material-ui/core';

export const BlocksContainer = styled(Grid)`
  flex-wrap: nowrap;
  padding: 25px 20px;
  overflow-x: auto;
  width: 100%;
  position: absolute;
  &::-webkit-scrollbar {
    height: 1px;
    width: 4px;
    border: 1px solid #d5d5d5;
  }
  @media (max-width: 960px) {
    position: static;
    overflow-x: scroll;
  }
`;
