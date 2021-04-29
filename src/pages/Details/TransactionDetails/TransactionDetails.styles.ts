import styled from 'styled-components';

import { Alert as MuiAlert } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

export const Alert = styled(MuiAlert)`
  justify-content: center;
`;

export const TransactionDesc = styled(Grid)`
  cursor: pointer;
`;

export const TransactionRawData = styled.pre`
  max-width: 100%;
  overflow: auto;
`;
