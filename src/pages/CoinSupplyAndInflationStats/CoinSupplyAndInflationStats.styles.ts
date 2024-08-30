import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  .page-title {
    margin-bottom: 10px;

    h3 {
      font-size: 1.2rem;
    }

    .MuiDivider-root {
      display: none;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .custom-table {
      &.responsive {
        .table__row {
          display: flex;
          flex-direction: column;

          td {
            padding-top: 6px;
            padding-bottom: 6px;
            border-bottom: 0;

            &:first-child {
              padding-top: 12px;
            }

            &:last-child {
              padding-bottom: 12px;
            }
          }
        }
      }
    }
  }
`;

export const MainContent = styled.div`
  position: relative;
  min-height: calc(100vh - 350px);
`;

export const TicketTitle = styled.div`
  font-weight: 400;
`;

export const TicketContent = styled.div`
  font-weight: 700;
`;

export const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
`;

export const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;

  ${props => props.theme.breakpoints.down(1024)} {
    grid-template-columns: 1fr;
  }
`;
export const TicketSummaryBox = styled.div`
  display: block;
  width: 100%;
  padding: 8px 12px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background-color: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 1px solid #d8d8d8;

  .box-title {
    margin-bottom: 10px;
    color: ${props => props.theme.card.color};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    white-space: nowrap;
  }

  .coin-supply-item {
    margin-bottom: 6px;
  }

  .ticket-summary-title {
    display: block;
    color: ${props => props.theme.sidebar.menu.default};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
    white-space: nowrap;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .ticket-summary-value {
    margin-top: 3px;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.card.color};
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    white-space: nowrap;
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  gap: 12px;

  ${props => props.theme.breakpoints.down(1330)} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${props => props.theme.breakpoints.down(768)} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  ${props => props.theme.breakpoints.down(500)} {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

export const BoxSection = styled.div`
  position: relative;
`;
