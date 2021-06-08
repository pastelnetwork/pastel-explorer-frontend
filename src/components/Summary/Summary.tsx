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
        <Grid item xs={6} md={4} lg={2} key={id}>
          <Styles.Card my={0}>
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
                  Since yesterday
                  <br />
                  <span style={{ fontWeight: 'normal', marginTop: 8 }}>
                    {`${difference > 0 ? '+' : ''}`}
                    {difference}%&nbsp;
                    {difference > 0 ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.23381 2.93331L1.08356 6.08356L4.37114e-07 5L5 4.37114e-07L10 5L8.91644 6.08356L5.76619 2.93331L5.76619 10L4.23381 10L4.23381 2.93331Z"
                          fill="#00D097"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.76619 7.06669L8.91644 3.91644L10 5L5 10L-2.18557e-07 5L1.08356 3.91644L4.23381 7.06669L4.23381 -2.52048e-07L5.76619 -1.85066e-07L5.76619 7.06669Z"
                          fill="#FF754C"
                        />
                      </svg>
                    )}
                  </span>
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
