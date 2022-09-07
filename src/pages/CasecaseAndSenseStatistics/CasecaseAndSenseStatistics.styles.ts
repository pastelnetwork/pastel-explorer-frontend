import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px;
  overflow: hidden;

  ${props => props.theme.breakpoints.down(500)} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: ${props => props.theme.palette.text.primary};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  transition: all 0.5s ease;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
`;

export const ContentWrapper = styled.div`
  width: calc(50% - 10px);
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);

  &.full {
    width: 100%;
    margin-right: 0;
  }

  &:nth-child(even) {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.down(750)} {
    width: 100%;
    margin-right: 0;
    padding: 0;
  },
`;
