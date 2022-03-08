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

export const Gird = styled.div`
  display: flex;

  ${props => props.theme.breakpoints.down('lg')} {
    flex-wrap: wrap;
  }
`;

export const ExplorerMapColumn = styled.div`
  width: 60%;
  margin-right: 12px;

  ${props => props.theme.breakpoints.down('lg')} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const SupernodeColumn = styled.div`
  width: calc(40% - 4px);

  ${props => props.theme.breakpoints.down('lg')} {
    width: 100%;
  }
`;
