import styled from 'styled-components/macro';
import { IconButton } from '@material-ui/core';

export const IconButtonLink = styled(IconButton)<{
  target: string;
  href: string;
  className: string;
}>`
  width: 30px;
  height: 30px;
  padding: 6px;
  border-radius: 100%;
  border: 1px solid ${props => props.theme.sidebar.menu.border};
  transition: all 0.5s ease;

  &:hover {
    background: none;
  }

  svg {
    max-width: 100%;
    fill: ${props => props.theme.sidebar.menu.border};
    transition: all 0.5s ease;
  }

  &:hover {
    border-color: ${props => props.theme.sidebar.menu.active};

    svg {
      fill: ${props => props.theme.sidebar.menu.active};
    }
  }
`;

export const Items = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 25px;

  ${props => props.theme.breakpoints.down('xs')} {
    justify-content: center;
    margin: 20px 0 0;
    padding: 0;
  }
`;

export const Item = styled.li`
  margin-right: 13px;

  &:last-child {
    margin-right: 0;
  }
`;
