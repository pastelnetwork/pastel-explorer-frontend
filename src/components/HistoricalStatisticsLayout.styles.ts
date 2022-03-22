import styled from 'styled-components/macro';

export const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 14px 16px 14px 0;
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px;
  overflow: hidden;

  ${props => props.theme.breakpoints.down(500)} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const DropdownWrapper = styled.div`
  ${props => props.theme.breakpoints.down(500)} {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  background: transparent;
  color: ${props => props.theme.palette.text.primary};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;

  &:hover {
    background: transparent;
  }
`;

export const ChartWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
`;
