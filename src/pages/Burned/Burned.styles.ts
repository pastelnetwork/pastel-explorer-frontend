import styled from 'styled-components';

export const BurnedWrapper = styled.div`
  width: 100%;

  .table-title {
    margin: 0;
  }

  .summary-item {
    cursor: default;
  }
`;

export const OverviewWrapper = styled.div`
  width: 100%;

  .chart-box {
    min-height: 330px;

    @media (max-width: 480px) {
      min-height: 250px;
    }
  }

  .burned-by-month {
    padding: 20px;

    .echarts-for-react {
      height: 290px !important;

      @media (max-width: 480px) {
        height: 210px !important;
      }
    }
  }
`;

export const AddressWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .MuiAlert-standardInfo {
    border-radius: 10px;
  }

  .MuiAlert-message {
    width: 100%;
  }

  .address-list {
    margin: 0;
    padding-left: 10px;
    list-style: none;

    a {
      display: inline-block;
      white-space: nowrap;
      max-width: 74vw;
    }

    span {
      margin-right: 5px;
    }

    .address-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
