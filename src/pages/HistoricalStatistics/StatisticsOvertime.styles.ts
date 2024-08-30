import styled from 'styled-components';

export const Wrapper = styled.section`
  text-align: left;

  a {
    text-decoration: none;
    color: inherit;
  }
  h2 {
    margin: 0.5rem 0;
    font-weight: 500;
    font-size: 1.25rem;
  }
`;

export const ContentWrapper = styled.div`
  padding: 12px 0;
`;

export const CardItem = styled.div`
  padding: 0;
  margin: 0;
  background-color: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  overflow: hidden;
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  background: ${props => props.theme.card.titleColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ChartImage = styled.div`
  padding: 12px;
`;

export const SmallChartWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);

  .line-chart-header {
    margin: 0 0 16px;
    padding: 13px 16px;
  }

  .line-chart-main-content {
    margin-bottom: 10px;
    padding: 0 16px;
  }

  .line-chart-footer {
    padding: 0 16px 16px;
  }
`;
