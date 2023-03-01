import styled from 'styled-components';
import { Typography as MuiTypography } from '@material-ui/core';
import { rgba } from 'polished';

export const Wrapper = styled.div`
  width: 100%;

  .cascade-sense-statistics {
    .MuiSelect-select {
      width: 60px;
      border: 0;
      padding: 0 20px 0;
    }

    .MuiSelect-icon {
      right: -6px;
    }
  }

  .cascade-sense-card {
    width: calc(33% - 4px);
    margin-right: 12px;

    &:nth-child(3),
    &:nth-child(6) {
      margin-right: 0;
    }

    .echarts-for-react {
      height: 150px !important;
    }

    ${props => props.theme.breakpoints.down('lg')} {
      margin-right: 10px;

      &:nth-child(3),
      &:nth-child(6) {
        margin-right: 0;
      }
    }

    ${props => props.theme.breakpoints.down('md')} {
      width: calc(50% - 6px);
      margin-right: 12px;

      &:nth-child(3) {
        margin-right: 12px;
      }

      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(6) {
        margin-right: 0;
      }
    }

    ${props => props.theme.breakpoints.down(767)} {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }

    ${props => props.theme.breakpoints.down(321)} {
      &.total-size-of-data-stored,
      &.average-size-of-nft-stored,
      &.total-fingerprints,
      &.average-rareness-score {
        .cascade-sense-statistics {
          min-height: 35px;
          align-items: flex-start;
        }
      }
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: ${props => props.theme.card.titleColor};
  border-radius: 10px;
  overflow: hidden;

  ${props => props.theme.breakpoints.down(500)} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: ${props => props.theme.palette.text.primary};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  transition: all 0.5s ease;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
`;

export const ContentWrapper = styled.div`
  width: calc(50% - 10px);
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);

  &.full {
    width: 100%;
    margin-right: 0;
  }

  &:nth-child(even) {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.down(750)} {
    width: 100%;
    margin-right: 0;
    padding: 0;
  },
`;

export const Percentage = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.sidebar.menu.default};

  span {
    display: inline-block;
    margin-top: ${props => props.theme.spacing(1)}px;
    color: ${props => props.theme.palette.text.secondary};
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 16px;
  }
`;

export const PercentageValue = styled(MuiTypography)<{
  percentagecolor: string;
  mb: number;
}>`
  font-size: 0.8rem;
  color: ${props => props.theme.sidebar.menu.default};

  span {
    display: inline-block;
    margin-top: ${props => props.theme.spacing(1)}px;
    color: ${props => props.theme.palette.text.secondary};
    background: ${props => rgba(props.percentagecolor, 0.2)};
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 16px;
  }
`;

export const ChartContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  margin-top: ${props => props.theme.spacing(2.5)}px;
  border-radius: 6px;
  overflow: hidden;
`;
