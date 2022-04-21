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

  ${props => props.theme.breakpoints.down('sm')} {
    margin-left: 0;
    margin-right: 5px;
    margin-bottom: 5px;
  },
`;

export const ThemeButton = styled.button`
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.sidebar.menu.default};
  outline: none;
  text-decoration: none;
  transition: all 0.5s ease;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  overflow: hidden;

  &.active {
    border: 3px solid ${props => props.theme.sidebar.menu.active};
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  color: rgb(171, 170, 193);

  ${props => props.theme.breakpoints.down('sm')} {
    padding: 0;
  }
`;

export const LineChartWrap = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const LineChartFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px 20px;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-bottom: 10px;
  }
`;

export const LineChartHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 20px 10px;

  ${props => props.theme.breakpoints.down('sm')} {
    padding-top: 10px,
    padding-left: 10px,
    justify-content: flex-start;
    flex-direction: column;
  }

  &.has-bg {
    display: flex;
    align-items: center;
    margin: 0 0 22px;
    padding: 13px 16px;
    font-size: 16px;
    font-weight: 600;
    background: ${props => props.theme.card.titleColor};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: ${props => props.theme.palette.text.primary};
  }
`;

export const GranularitySelect = styled.div`
  display: flex;
  min-width: 200px;
  align-items: center;
  margin-right: 15px;

  ${props => props.theme.breakpoints.down('xs')} {
    margin-bottom: 5px;
    margin-right: 0;

    span {
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
`;

export const PeriodSelect = styled.div`
  display: flex;
  min-width: 200px;
  align-items: center;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-wrap: wrap;

    span {
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
`;

export const LineChartTitle = styled.h4`
  margin: 0;
  text-align: left;
  font-size: 16px;
  font-weight: 700;

  ${props => props.theme.breakpoints.down('sm')} {
    margin-bottom: 10px;
    font-size: 15px;
  }
`;

export const ChartFilterWrapper = styled.div`
  display: flex;
  align-items: center;

  ${props => props.theme.breakpoints.down('xs')} {
    flex-direction: column;
  }
`;

export const ChartTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 700;

  ${props => props.theme.breakpoints.down('sm')} {
    font-size: 15px;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    margin-bottom: 10px;
  }
`;
