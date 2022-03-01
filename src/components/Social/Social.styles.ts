import styled from 'styled-components/macro';

export const Items = styled.ul`
  display: flex;
  list-style: none;

  ${props => props.theme.breakpoints.down('sm')} {
    justify-content: center;
    margin: 0;
    padding: 0;
  }
`;

export const Item = styled.li`
  margin-right: 35px;

  &:last-child {
    margin-right: 0;
  }

  svg {
    color: ${props => props.theme.sidebar.menu.default};
    transaction: all 0.5s ease;
  }

  .social-icon {
    &:hover {
      svg {
        color: ${props => props.theme.sidebar.menu.active};
      }
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    .social-icon {
      padding: 5px;
    }

    svg {
      width: 20px;
    }
  }
`;
