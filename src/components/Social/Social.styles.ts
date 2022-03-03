import styled from 'styled-components/macro';
import { IconButton } from '@material-ui/core';

export const IconButtonLink = styled(IconButton)<{
  target: string;
  href: string;
  className: string;
}>`
  &:hover {
    background: none;
  }
`;

export const Items = styled.ul`
  display: flex;
  list-style: none;

  ${props => props.theme.breakpoints.down('xs')} {
    justify-content: flex-start;
    margin: 10px 0 0;
    padding: 0;
  }
`;

export const Item = styled.li`
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }

  svg {
    width: 20px;
    color: ${props => props.theme.sidebar.menu.default};
    transaction: all 0.5s ease;
  }

  .social-icon {
    padding: 5px;

    &:hover {
      svg {
        color: ${props => props.theme.sidebar.menu.active};
      }
    }
  }
`;
