import styled from 'styled-components/macro';

export const Items = styled.ul`
  display: flex;
  list-style: none;
`;

export const Item = styled.li`
  margin-right: 35px;

  &:last-child {
    margin-right: 0;
  }
`;
