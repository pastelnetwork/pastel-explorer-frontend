import * as React from 'react';

import { darken } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
// application
import { TAppTheme } from '@theme/index';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { ISummary, ISummaryStats } from '@utils/types/ISummary';
import { SocketContext } from '@context/socket';
import themeVariant from '@theme/variants';
import { AppThunkDispatch } from '@redux/types';
import { BlockThunks, TransactionThunks } from '@redux/thunk';
import { ISocketData } from '@utils/types/ISocketData';
import * as Styles from './Summary.styles';
import { initialSummaryList, calculateDifference } from './Summary.helpers';

const useStyles = makeStyles((_theme: TAppTheme) => ({
  wrapper: {
    [_theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 273px)',
    },
    [_theme.breakpoints.up('xl')]: {
      width: '100%',
    },
  },
  root: {
    display: 'flex',
    padding: `${_theme.spacing(4)}px ${_theme.spacing(3)}px ${_theme.spacing(6)}px`,
    backgroundColor: _theme.palette.background.paper,
    overflowX: 'auto',
    [_theme.breakpoints.down('md')]: {
      padding: `${_theme.spacing(2)}px`,
    },
    '&::-webkit-scrollbar': {
      background: _theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      background: darken(_theme.palette.background.paper, 0.5),
    },
  },
  cardItem: {
    margin: `0 ${_theme.spacing(3)}px`,
    minWidth: '142px',
    flex: '0 0 auto',
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
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppThunkDispatch>();
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
    socket.on(
      'getUpdateBlock',
      ({ blocks, unconfirmedTransactions = [], rawTransactions = [] }: ISocketData) => {
        updateSummaryList();
        if (pathname === '/') {
          if (blocks && blocks.length) {
            dispatch(BlockThunks.updateBlocksNewest(blocks[0]));
          }
          if (blocks.length || unconfirmedTransactions.length || rawTransactions.length) {
            dispatch(
              TransactionThunks.updateTransactionsNewest({
                blocks,
                unconfirmedTransactions,
                rawTransactions,
              }),
            );
          }
        }
      },
    );
    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);
  React.useEffect(() => updateSummaryList(), []);

  return (
    <div className={classes.wrapper}>
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
    </div>
  );
};

export default Summary;
