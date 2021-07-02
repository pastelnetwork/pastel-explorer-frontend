import styled from 'styled-components';

export const Image = styled.div`
  margin-left: 12px;
  svg {
    height: 1rem;
    color: ${props => props.theme.palette.text.primary};
  }
`;
