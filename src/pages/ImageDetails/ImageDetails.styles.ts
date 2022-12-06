import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: block;
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;
`;

export const ContentItem = styled.div`
  margin-bottom: 5px;
`;

export const OpenNSFWChartWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

export const OpenNSFWChartOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  border: 1px solid #000;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 248px;
    height: 248px;
    border: 10px solid #ccc;
    border-radius: 100%;
  }
`;
