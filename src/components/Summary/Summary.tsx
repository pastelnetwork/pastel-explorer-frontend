import * as React from 'react';

// import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { TAppTheme } from '@theme/index';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { ISummary, ISummaryStats } from '@utils/types/ISummary';
import { SocketContext } from '@context/socket';

import themeVariant from '@theme/variants';

import * as Styles from './Summary.styles';
import { initialSummaryList, calculateDifference } from './Summary.helpers';

const useStyles = makeStyles((_theme: TAppTheme) => ({
  root: {
    display: 'flex',
    padding: `${_theme.spacing(4)}px ${_theme.spacing(3)}px ${_theme.spacing(6)}px`,
    backgroundColor: _theme.palette.background.paper,
    overflowX: 'auto',
    [_theme.breakpoints.down('md')]: {
      padding: `${_theme.spacing(2)}px`,
    },
  },
  cardItem: {
    margin: `0 ${_theme.spacing(3)}px`,
    minWidth: '142px',
    [_theme.breakpoints.down('md')]: {
      margin: `0 ${_theme.spacing(2)}px`,
    },
  },
  textTitle: {
    fontSize: 14,
  },
  textNumber: {
    fontSize: 20,
  },
}));

const Summary: React.FC = () => {
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);
  const { fetchData } = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });
  const socket = React.useContext(SocketContext);
  const classes = useStyles();

  const generateSummaryData = React.useCallback((summary: ISummary) => {
    const { currentStats, lastDayStats } = summary;

    setSummaryList(prev => {
      const items = prev.map(summaryElement => {
        const key = summaryElement.key as keyof ISummaryStats;

        return {
          ...summaryElement,
          value: formatNumber(currentStats[key], {
            decimalsLength: summaryElement.decimals,
            divideToAmount: summaryElement.divideToAmount,
          }),
          previousValue: formatNumber(lastDayStats[key], {
            decimalsLength: summaryElement.decimals,
          }),
          difference: calculateDifference(currentStats[key], lastDayStats[key]),
        };
      });
      return items;
    });
  }, []);

  const updateSummaryList = React.useCallback(() => {
    fetchData().then(response => {
      if (!response) return null;
      return generateSummaryData(response);
    });
  }, [fetchData]);

  React.useEffect(() => {
    socket.on('getUpdateBlock', () => {
      updateSummaryList();
    });
  }, []);
  React.useEffect(() => updateSummaryList(), []);

  return (
    <div className={classes.root}>
      {summaryList.map(({ id, name, value, difference }) => (
        <Styles.Card key={id} classes={{ root: classes.cardItem }}>
          <Styles.CardContent>
            <Styles.Typography variant="h6" my={2} className={classes.textTitle}>
              {name}
            </Styles.Typography>
            <Styles.Typography variant="h4" my={2} className={classes.textNumber}>
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
                <span style={{ fontWeight: 'normal', marginTop: 8, fontSize: 16 }}>
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
      ))}
    </div>
  );
};

export default Summary;
