import styled from 'styled-components';

import { Typography as MuiTypography } from '@material-ui/core';

export const Typography = styled(MuiTypography)`
  cursor: default;
`;

export const LatestTransactionsWrapper = styled.div`
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
`;
