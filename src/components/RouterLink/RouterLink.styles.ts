import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const RouterLink = styled(Link)<{ textsize: 'normal' | 'large' }>`
  width: 100%;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ textsize }) => (textsize === 'large' ? '1.2rem' : '1rem')};
`;
