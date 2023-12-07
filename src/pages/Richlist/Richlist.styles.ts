import styled from 'styled-components';
import { Grid } from '@mui/material';

export const GridWrapper = styled(Grid)`
  .MuiTableCell-root {
    &.MuiTableCell-body {
      &:nth-child(2) {
        padding-left: 0;
      }
    }
  }
`;

export const Wrapper = styled.div`
  .crown-icon {
    width: 16px;
    margin-right: 5px;
    fill: ${props => props.theme.crown.bronze};

    &.gold {
      fill: ${props => props.theme.crown.gold};
    }

    &.silver {
      fill: ${props => props.theme.crown.silver};
    }
  }

  .tooltip-title {
    font-size: 14px;
    font-weight: 400;
  }

  .tooltip-amount,
  .tooltip-percentage {
    font-size: 14px;
  }

  .richlist-table-wrapper {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${props => props.theme.breakpoints.down(960)} {
    .custom-table {
      .table__row-header {
        display: none;
      }

      .address-link {
        max-width: calc(100vw - 200px);
      }

      .table__row {
        display: flex;
        flex-direction: column;

        td {
          display: flex;
          border-bottom: 0;

          &.cell-content {
            &:before {
              content: attr(data-title);
              position: relative;
              min-width: 100px;
              display: inline-block;
              font-weight: 600;
              font-size: 16px;
              color: ${props => props.theme.table.label};
            }
          }

          &:nth-child(1) {
            &:before {
              margin-right: 8px;
            }
          }

          &:nth-child(2) {
            padding-left: 16px;
          }

          &:nth-child(3) {
            &:before {
              margin-right: 8px;
            }
          }

          &:nth-child(4) {
            &:before {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }

  .echarts-for-react {
    width: 100%;
    height: 240px !important;
  }
`;

export const BlockWrapper = styled.div`
  margin-bottom: 24px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;
`;

export const Title = styled.h4`
  margin: 0;
  padding: 18px 16px;
  background: ${props => props.theme.card.titleColor};
`;

export const ContentWrapper = styled.div`
  display: flex;
  padding: 18px 16px;
  background: ${props => props.theme.palette.background.default};

  ${props => props.theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
  }
`;

export const Chart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 3 - 12px);
  padding-left: 12px;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;
    margin-right: 0;
    padding-left: 0;
    order: 1;
  }
`;

export const Info = styled.div`
  width: calc(100% / 3 * 2);
  display: flex;
  flex-wrap: wrap;
  margin-right: 12px;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;
    margin-top: 12px;
    order: 2;
  }
`;

export const InfoItem = styled.div`
  position: relative;
  display: flex;
  width: calc(51% - 12px);
  margin: 0 12px 12px 0;
  padding: 15px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    background: ${props => props.theme.card.richlist.border};
  }

  &:before {
    bottom: 0;
    left: 50%;
    width: 80%;
    height: 1px;
    transform: translateX(-50%);
  }

  &:after {
    right: -8px;
    top: 50%;
    width: 1px;
    height: 80%;
    transform: translateY(-50%);
  }

  &:nth-child(2),
  &:nth-child(4) {
    width: calc(49% - 1px);
    margin-right: 1px;
  }

  &:nth-child(3),
  &:nth-child(4) {
    margin-bottom: 0;

    &:before {
      display: none;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    padding-left: 0;
    padding-right: 0;

    &:nth-child(1) {
      order: 1;
    }

    &:nth-child(2) {
      order: 3;
    }

    &:nth-child(3) {
      order: 2;
    }

    &:nth-child(4) {
      order: 4;
    }

    &,
    &:nth-child(2),
    &:nth-child(4) {
      width: 100%;
      margin-right: 0;
    }

    &:nth-child(3) {
      margin-bottom: 12px;

      &:before {
        display: block;
      }
    }

    &:before {
      width: 90%;
    }

    &:after {
      display: none;
    }
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 45px;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
  align-items: center;
`;

export const InfoTitle = styled.div`
  color: ${props => props.theme.sidebar.menu.default};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ${props => props.theme.breakpoints.down('xs')} {
    font-size: 12px;
    line-height: 15px;
  }
`;

export const InfoValue = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  color: ${props => props.theme.card.color};

  @media (min-width: 1024px) and (max-width: 1279px) {
    font-size: 17px;
  }

  ${props => props.theme.breakpoints.down('xs')} {
    font-size: 14px;
  }
`;

export const ValueWrapper = styled.div`
  width: 70%;
`;

export const PercentageWrapper = styled.div`
  width: 30%;
  text-align: right;
`;

export const PercentageTitle = styled.div`
  color: ${props => props.theme.sidebar.menu.default};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ${props => props.theme.breakpoints.down('xs')} {
    font-size: 12px;
  }
`;

export const PercentageValue = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  color: ${props => props.theme.palette.text.secondary};

  ${props => props.theme.breakpoints.down('xs')} {
    font-size: 14px;
  }
`;

export const RankStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 44px;
  text-align: right;
  line-height: 1;

  span {
    display: inline-block;
    margin-top: 4px;
    line-height: 1;

    ${props => props.theme.breakpoints.down('md')} {
      margin-top: 0;
    }
  }

  ${props => props.theme.breakpoints.down('md')} {
    justify-content: flex-start;
  }
`;
