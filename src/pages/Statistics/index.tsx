// import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { TAppTheme } from '@theme/index';
import TransactionStatistics from './TransactionStatistics/TransactionStatistics';
import NetworkStatistics from './NetworkStatistics/NetworkStatistics';
import BlockStatistics from './BlockStatistics/BlockStatistics';

const useStyles = makeStyles((theme: TAppTheme) => ({
  blockSpace: {
    marginBottom: `${theme.spacing(4)}px`,
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing(2)}px`,
    },
  },
}));

const Statistics = () => {
  const classes = useStyles();
  return (
    <>
      <BlockStatistics />
      <div className={classes.blockSpace} />
      <NetworkStatistics />
      <div className={classes.blockSpace} />
      <TransactionStatistics />
    </>
  );
};

export default Statistics;
