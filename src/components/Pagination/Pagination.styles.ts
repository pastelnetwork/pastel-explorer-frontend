import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: inline-block;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0 5px;

      a {
        display: block;
        padding: 5px 10px;
        background: ${props => props.theme.filter.background};
        border-radius: 4px;
        border: 0;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s ease;
        color: ${props => props.theme.palette.text.primary};
      }

      &.selected,
      &:hover {
        a {
          background: ${props => props.theme.sidebar.menu.toggle.switch};
          color: #fff;
        }
      }

      &.selected {
        a {
          cursor: default;
        }
      }

      &.disabled,
      &.disabled:hover {
        a {
          cursor: default;
          background: ${props => props.theme.table.odd};
          color: ${props => props.theme.palette.text.primary};
        }
      }

      &.break,
      &.break:hover {
        a {
          background: transparent;
          color: ${props => props.theme.palette.text.primary};
        }
      }
    }
  }

  ${props => props.theme.breakpoints.down(600)} {
    ul {
      flex-wrap: wrap;
      justify-content: center;

      li {
        margin-bottom: 10px;
      }
    }
  }
`;
