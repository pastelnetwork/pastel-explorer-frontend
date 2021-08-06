import styled from 'styled-components/macro';

export const Title = styled.h1`
  text-align: center;
`;

export const Wrapper = styled.section`
  text-align: center;
  padding: 20px;
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
  @media (max-width: 760px) {
    padding: 0;
    .card-item {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1;
`;
