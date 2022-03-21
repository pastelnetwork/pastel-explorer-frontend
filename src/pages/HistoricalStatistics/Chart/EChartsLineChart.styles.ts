import styled from 'styled-components/macro';
import { CSVLink } from 'react-csv';

export const DonwloadButton = styled.button`
  padding: 8px 25px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Gill Sans';
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;

  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }

  @media screen and (max-width: 960px) {
    margin-left: 10px;
  }

  @media screen and (max-width: 375px) {
    padding: 8px 16px;
    font-size: 15px;
  }
`;

export const CSVLinkButton = styled(CSVLink)`
  margin-left: 10px;
  padding: 8px 25px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Gill Sans';
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }

  @media screen and (max-width: 375px) {
    padding: 8px 16px;
    font-size: 15px;
  }
`;

export const PeriodButton = styled.button`
  margin-left: 5px;
  padding: 3px 10px;
  background: ${props => props.theme.sidebar.menu.toggle.period};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover,
  &.active {
    background: ${props => props.theme.sidebar.menu.toggle.switch};
  }
`;

export const ThemeButton = styled.button`
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.sidebar.menu.active};
  outline: none;
  text-decoration: none;
  transition: all 0.5s ease;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  overflow: hidden;

  &.active {
    border: 3px solid ${props => props.theme.card.border.changeTheme};
  }
`;
