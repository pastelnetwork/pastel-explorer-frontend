import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  color: ${props => props.theme.link.main};
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;
