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

export const ChartLegend = styled.div`
  position: relative;
  bottom: 10px;
  font-size: 14px;
  text-align: center;
`;

export const BlockWrapper = styled.div`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  &.mt-24 {
    margin-top: 24px;
  }
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 16px;
  background: ${props => props.theme.card.titleColor};
`;
