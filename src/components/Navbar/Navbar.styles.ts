import styled from 'styled-components/macro';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`;

export const BrandLogo = styled.img`
  width: 120px;
`;

export const Menu = styled.div`
  display: flex;

  .main-menu {
    & > .MuiDrawer-paper {
      position: relative;
      display: flex;
      align-items: center;
      top: unset;
      right: unset;
      left: unset;
      height: auto;
      flex-direction: unset;
      background: #fff;
      border-right: 0;
      overflow: unset;
    }
  }
`;
