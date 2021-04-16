import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { AppStateType } from '@redux/reducers';
import { setSummary } from '@redux/actions/summaryActions';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { ISummaryResponse } from '@utils/types/ISummary';

import themeVariant from '@theme/variants';

import * as Styles from './Summary.styles';

const Summary: React.FC = () => {
  /**
   * TODO
   * Redux used here just to keep redux flow work after theme removal.
   * Should be adjusted after clarifications.
   */
  const { fetchData } = useFetch<ISummaryResponse>({ method: 'get', url: URLS.SUMMARY_URL });
  const dispatch = useDispatch();
  const summaryList = useSelector((state: AppStateType) => state.summaryReducer.summary);

  const updateSummaryList = () => {
    fetchData().then(response => {
      if (!response) return null;

      /**
       * TODO
       * Backend should return just object or array with data of SummaryItemProps structure.
       * Frontend should be only responsible for displaying given data to avoid current logic.
       */
      const summaryFetchData = Object.entries(response.data[0]);

      const updatedSummaryList = summaryList.map(summaryElement => {
        const currentSummaryItem = summaryFetchData.find(([key]) => key === summaryElement.key);

        if (currentSummaryItem) {
          const [, currentSummaryItemValue] = currentSummaryItem;
          return {
            ...summaryElement,
            value: formatNumber(currentSummaryItemValue, { decimalsLength: 2 }),
          };
        }

        return summaryElement;
      });

      return dispatch(setSummary(updatedSummaryList));
    });
  };

  React.useEffect(() => updateSummaryList(), []);

  return (
    <Grid container spacing={6}>
      {summaryList.map(({ id, name, value, difference }) => (
        <Grid item xs={12} md={6} lg={3} key={id}>
          <Styles.Card mb={3}>
            <Styles.CardContent>
              <Styles.Typography variant="h6" mb={4}>
                {name}
              </Styles.Typography>
              <Styles.Typography variant="h3" mb={3}>
                <Styles.Values>
                  {value === null ? <Skeleton animation="wave" variant="text" /> : value}
                </Styles.Values>
              </Styles.Typography>
              <Styles.Percentage
                variant="subtitle2"
                mb={6}
                color="textSecondary"
                percentagecolor={`${
                  difference > 0 ? themeVariant.custom.green.dark : themeVariant.custom.red.dark
                }`}
              >
                <span>
                  {`${difference > 0 ? '+' : ''}`}
                  {difference}%
                </span>
                Since yesterday
              </Styles.Percentage>
            </Styles.CardContent>
          </Styles.Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
