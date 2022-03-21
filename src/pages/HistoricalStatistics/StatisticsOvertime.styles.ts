import styled from 'styled-components/macro';

export const Title = styled.h1`
  text-align: center;
`;

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
  .card-item {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1;
`;

export const BlockWrapper = styled.div`
  margin-bottom: 30px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;
`;

export const PageTitle = styled.h3`
  margin: 0;
  padding: 18px 16px;
  background: ${props => props.theme.card.titleColor};
  text-align: left;
`;

export const ContentWrapper = styled.div`
  padding: 12px;
`;

export const CardItem = styled.div`
  padding: 0;
  margin: 0;
  background-color: ${props => props.theme.card.item.background};
  border: 1px solid ${props => props.theme.card.item.border};
  border-radius: 10px;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  overflow: hidden;
`;

export const BlockTitle = styled.h4`
  margin: 0;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${props => props.theme.card.item.titleBackground};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ChartImage = styled.div`
  padding: 12px;
`;
