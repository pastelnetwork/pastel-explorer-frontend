import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from './Summary.styles';

const Summary: React.FC = () => {
  const classes = useStyles();
  const [summaryList, setSummaryList] = React.useState([null, null, null, null]);

  return (
    <Grid container justify="space-evenly" alignItems="center" className={classes.container}>
      {summaryList.map(summaryItem => (
        <Grid item key={Math.random()}>
          <Card className={classes.card}>
            <CardHeader
              title={<Skeleton animation="wave" variant="text" />}
              className={classes.header}
            />
            <CardContent className={classes.content}>
              <Skeleton animation="wave" variant="text" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
