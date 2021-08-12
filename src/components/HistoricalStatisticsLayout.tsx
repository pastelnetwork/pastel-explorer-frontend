import { memo, ReactNode } from 'react';
// import { BackIcon } from '@components/Icons';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
// application
import { TAppTheme } from '@theme/index';

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
    fill: theme.palette.text.primary,
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
      <div style={{ flex: 1, backgroundColor: currentBgColor }}>
        <div>
          <button type="button" className={classes.button} onClick={() => history.goBack()}>
            <svg
              width="19"
              height="17"
              className={classes.icon}
              viewBox="0 0 19 17"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0938 7.71894H2.5082L8.47617 2.03457C8.78867 1.73691 8.80078 1.24238 8.50313 0.929878C8.20586 0.617769 7.71133 0.605269 7.39844 0.902925L0.582812 7.39511C0.287891 7.69042 0.125 8.08261 0.125 8.50019C0.125 8.91738 0.287891 9.30996 0.596484 9.61816L7.39883 16.0971C7.55 16.2412 7.74375 16.3127 7.9375 16.3127C8.14375 16.3127 8.35 16.2314 8.50352 16.0701C8.80117 15.7576 8.78906 15.2635 8.47656 14.9658L2.48359 9.28144H18.0938C18.525 9.28144 18.875 8.93144 18.875 8.50019C18.875 8.06894 18.525 7.71894 18.0938 7.71894Z"
                // fill="black"
                // stroke="black"
                strokeWidth="0.2"
              />
            </svg>
          </button>
        </div>
        {children || <Skeleton animation="wave" variant="rect" height={386} />}
      </div>
    </div>
  );
};

export default memo(HistoricalStatisticsLayout);
