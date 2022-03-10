import styled from 'styled-components';

import { Typography as MuiTypography } from '@material-ui/core';

export const Typography = styled(MuiTypography)`
  cursor: default;
`;

export const LatestTransactionsWrapper = styled.div`
  margin-top: 24px;
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;

  .pl-4px {
    padding-left: 4px;
  }

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .col-txid > .MuiTableCell-root {
    padding-left: 4px;
  }

  .latest-transactions-table {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0 !important;
  }
`;
