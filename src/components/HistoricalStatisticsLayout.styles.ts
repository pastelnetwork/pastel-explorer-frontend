import styled from 'styled-components/macro';

export const BackButtonWrapper = styled.div`
  margin-bottom: 12px;
  padding: 14px 16px;
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px;
  overflow: hidden;
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
