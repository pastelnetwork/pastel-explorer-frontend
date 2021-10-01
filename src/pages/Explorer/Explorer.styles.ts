import styled from 'styled-components';

export const ExplorerWrapper = styled.div`
  .MuiPaper-elevation1 {
    &.MuiPaper-rounded {
      &::-webkit-scrollbar {
        width: 18px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.scrollbar};
      }
    }
  }
`;
