import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RouterLink = styled(Link)<{ textsize: 'normal' | 'large' }>`
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.link.main};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  transition: all 0.5s ease;

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;

export const ExternalLink = styled.a`
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.link.main};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  transition: all 0.5s ease;

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;
