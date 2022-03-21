import styled from 'styled-components/macro';

export const BackButtonWrapper = styled.div`
  margin-bottom: 12px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: #ECEFF3;
  }
`;

export const ChartWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
`;
