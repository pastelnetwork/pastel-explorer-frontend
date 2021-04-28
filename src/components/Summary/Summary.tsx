import * as React from 'react';

import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { ISummary, ISummaryStats } from '@utils/types/ISummary';

import themeVariant from '@theme/variants';

import * as Styles from './Summary.styles';
import { initialSummaryList, calculateDifference } from './Summary.helpers';

const Summary: React.FC = () => {
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);
  const { fetchData } = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });

  const generateSummaryData = (summary: ISummary) => {
    const { currentStats, lastDayStats } = summary;

    const updatedSummaryList = summaryList.map(summaryElement => {
      const key = summaryElement.key as keyof ISummaryStats;

      return {
        ...summaryElement,
        value: formatNumber(currentStats[key], {
          decimalsLength: summaryElement.decimals,
          divideToAmount: summaryElement.divideToAmount,
        }),
        previousValue: formatNumber(lastDayStats[key], { decimalsLength: summaryElement.decimals }),
        difference: calculateDifference(currentStats[key], lastDayStats[key]),
      };
    });

    setSummaryList(updatedSummaryList);
  };

  const updateSummaryList = () => {
    fetchData().then(response => {
      if (!response) return null;
      return generateSummaryData(response);
    });
  };

  React.useEffect(() => updateSummaryList(), []);

  return (
    <Styles.Grid container spacing={4}>
      {summaryList.map(({ id, name, value, difference }) => (
        <Grid item xs={12} md={4} lg={2} key={id}>
          <Styles.Card my={1}>
            <Styles.CardContent>
              <Styles.Typography variant="h6" my={2}>
                {name}
              </Styles.Typography>
              <Styles.Typography variant="h4" my={2}>
                <Styles.Values>
                  {value === null ? <Skeleton animation="wave" variant="text" /> : value}
                </Styles.Values>
              </Styles.Typography>
              {difference === null ? (
                <Skeleton animation="wave" variant="text" />
              ) : (
                <Styles.Percentage
                  variant="subtitle2"
                  mb={4}
                  color="textSecondary"
                  noWrap
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
              )}
            </Styles.CardContent>
          </Styles.Card>
        </Grid>
      ))}
    </Styles.Grid>
  );
};

export default Summary;
