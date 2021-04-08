import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from '@utils/axios/axios';
import * as URLS from '@utils/constants/urls';

import initialSummaryList, { SummaryValueProps } from './Summary.helpers';
import useStyles from './Summary.styles';

const Summary: React.FC = () => {
  const classes = useStyles();
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);

  const updateSummaryList = (): void => {
    axios.get(URLS.SUMMARY_URL).then(({ data }) => {
      /**
       * TODO
       * Backend should return just object or array with data of SummaryItemProps structure.
       * Frontend should be only responsible for displaying given data to avoid current logic.
       */
      const summaryFetchData = Object.entries(data.data[0]);

      const updatedSummaryList = summaryList.map(summaryElement => {
        const currentSummaryItem = summaryFetchData.find(([key]) => key === summaryElement.key);

        if (currentSummaryItem) {
          const [, currentSummaryItemValue] = currentSummaryItem;
          return {
            ...summaryElement,
            value: currentSummaryItemValue as SummaryValueProps,
          };
        }

        return summaryElement;
      });

      setSummaryList(updatedSummaryList);
    });
  };

  React.useEffect(() => updateSummaryList(), []);

  return (
    <Grid container justify="space-evenly" alignItems="center" className={classes.container}>
      {summaryList.map(({ id, name, value }) => (
        <Grid item key={id}>
          <Card className={classes.card}>
            <CardHeader title={name} className={classes.header} />
            <CardContent className={classes.content}>
              {value === null ? <Skeleton animation="wave" variant="text" /> : value}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
