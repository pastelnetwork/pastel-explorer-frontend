import styled from 'styled-components/macro';

export const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 12px;
  background: ${props => props.theme.sidebar.menu.background};
  z-index: 100;
  box-shadow: 0 14px 20px rgb(16 16 16 / 6%);

  .cluster-button {
    padding: 0;
    border: 0;
    min-width: unset;

    &:hover {
      background: transparent;

      .cluster-icon {
        fill: ${props => props.theme.sidebar.menu.hover};
      }
    }
  }

  .cluster-icon {
    fill: ${props => props.theme.sidebar.menu.default};
    transition: all 0.5s ease;

    ${props => props.theme.breakpoints.down('sm')} {
      width: 22px;
    }
  }
`;

export const BrandLogo = styled.img`
  width: 120px;
`;

export const Menu = styled.div`
  display: flex;
  z-index: 3;

  ${props => props.theme.breakpoints.down('xs')} {
    align-items: flex-start;
    margin-top: 16px;
  }

  .main-menu {
    display: flex;
    align-items: center;
    height: 100%;

    & > .MuiDrawer-paper {
      position: relative;
      display: flex;
      align-items: center;
      top: unset;
      right: unset;
      left: unset;
      height: auto;
      flex-direction: unset;
      background: transparent;
      border-right: 0;
      overflow: unset;
    }

    & .MuiList-root {
      margin-top: -5px;
    }

    & .disable-padding {
      padding: 0;
    }
  }
`;
