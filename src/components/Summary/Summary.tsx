import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import axios from '@utils/axios/axios';
import * as URLS from '@utils/constants/urls';

import { AppStateType } from '@redux/reducers';
import { setSummary } from '@redux/actions/summaryActions';

import { SummaryValueProps } from './Summary.helpers';
import * as Styles from './Summary.styles';

const Summary: React.FC = () => {
  /**
   * TODO
   * Redux used here just to keep redux flow work after theme removal.
   * Should be adjusted after clarifications.
   */
  const dispatch = useDispatch();
  const summaryList = useSelector((state: AppStateType) => state.summaryReducer.summary);

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

      dispatch(setSummary(updatedSummaryList));
    });
  };

  React.useEffect(() => updateSummaryList(), []);

  return (
    <Grid container spacing={6}>
      {summaryList.map(({ id, name, value }) => (
        <Grid item xs={12} sm={12} md={6} lg={3} xl key={id}>
          <Styles.Card mb={3}>
            <Styles.CardContent>
              <Styles.Typography variant="h6" mb={4}>
                {name}
              </Styles.Typography>
              <Styles.Typography variant="h3" mb={3}>
                <Box fontWeight="fontWeightRegular">
                  {value === null ? <Skeleton animation="wave" variant="text" /> : value}
                </Box>
              </Styles.Typography>
            </Styles.CardContent>
          </Styles.Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
