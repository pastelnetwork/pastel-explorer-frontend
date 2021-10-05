import styled from 'styled-components';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert as MuiAlert } from '@material-ui/lab';
import { Grid, Toolbar } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

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

export const TransactionRawDataToolbar = styled(Toolbar)`
  background-color: ${props => props.theme.sidebar.background.default};

  svg {
    fill: ${props => props.theme.sidebar.closeIcon};
  }

  .MuiTypography-h6 {
    color: ${props => props.theme.sidebar.closeIcon};
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
`;
