import { memo, ReactNode } from 'react';
// import { BackIcon } from '@components/Icons';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// application
import { TAppTheme } from '@theme/index';

import * as Styles from './HistoricalStatisticsLayout.styles';

interface IProps {
  children: ReactNode;
  currentBgColor: string;
}

const useStyles = makeStyles((theme: TAppTheme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    border: 0,
    outline: 'unset',
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
    background: 'inherit',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    // fill: theme.palette.text.primary,
    stroke: theme.palette.text.primary,
    width: 24,
    height: 22,
    [theme.breakpoints.down('sm')]: {
      width: 19,
      height: 17,
    },
  },
}));

const HistoricalStatisticsLayout = ({ children, currentBgColor }: IProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div style={{ flex: 1 }}>
        <Styles.BackButtonWrapper>
          <Styles.BackButton type="button" onClick={() => history.goBack()}>
            <NavigateBeforeIcon />
          </Styles.BackButton>
        </Styles.BackButtonWrapper>
        <Styles.ChartWrapper style={{ backgroundColor: currentBgColor }}>
          {children || <Skeleton animation="wave" variant="rect" height={386} />}
        </Styles.ChartWrapper>
      </div>
    </div>
  );
};

export default memo(HistoricalStatisticsLayout);
