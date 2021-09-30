import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const RouterLink = styled(Link)<{ textsize: 'normal' | 'large' }>`
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.link.main};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ textsize }) => (textsize === 'large' ? '1.2rem' : '1rem')};

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;
