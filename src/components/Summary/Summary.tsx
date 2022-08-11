import * as React from 'react';

import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// application
import { TAppTheme } from '@theme/index';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import {
  ISummary,
  ISummaryStats,
  ISummaryChartStats,
  TSummaryChartProps,
} from '@utils/types/ISummary';
import { SocketContext } from '@context/socket';
import themeVariant from '@theme/variants';
import { AppThunkDispatch } from '@redux/types';
import { BlockThunks, TransactionThunks } from '@redux/thunk';
import { ISocketData } from '@utils/types/ISocketData';

import * as Styles from './Summary.styles';
import { LineChart } from './LineChart';
import { initialSummaryList, calculateDifference } from './Summary.helpers';

const useStyles = makeStyles((_theme: TAppTheme) => ({
  wrapper: {
    [_theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  cardItem: {
    flex: '0 0 auto',
    borderRadius: '10px',
    border: 0,
  },
  textTitle: {
    fontSize: 14,
  },
}));

type TChartDataProps = {
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  offset: number;
};

const Summary: React.FC = () => {
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);
  const [summaryChartData, setSummaryChartData] = React.useState<ISummaryChartStats>();
  const { fetchData } = useFetch<ISummary>({ method: 'get', url: `${URLS.SUMMARY_URL}?limit=576` });
  const socket = React.useContext(SocketContext);
  const classes = useStyles();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppThunkDispatch>();
  const generateSummaryData = React.useCallback((summary: ISummary) => {
    const { currentStats, lastDayStats, chartStats } = summary;
    setSummaryChartData(chartStats);
    setSummaryList(prev => {
      const items = prev.map(summaryElement => {
        const key = summaryElement.key as keyof ISummaryStats;
        const currentVal = currentStats?.[key] || 0;
        const lastDayStatsVal = lastDayStats?.[key] || 0;
        return {
          ...summaryElement,
          value: formatNumber(
            summaryElement.key === 'percentPSLStaked'
              ? parseFloat(currentVal.toString()) * 100
              : currentVal,
            {
              decimalsLength: summaryElement.decimals,
              divideToAmount: summaryElement.divideToAmount,
            },
          ),
          previousValue: formatNumber(
            summaryElement.key === 'percentPSLStaked'
              ? parseFloat(lastDayStatsVal.toString()) * 100
              : lastDayStatsVal,
            {
              decimalsLength: summaryElement.decimals,
            },
          ),
          difference: calculateDifference(currentStats?.[key] || 0, lastDayStats?.[key] || 0),
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

  const transformChartData = (key: string) => {
    const dataX = [];
    const dataY = [];
    if (summaryChartData) {
      const items = summaryChartData[key as keyof ISummaryChartStats] as TSummaryChartProps[];
      if (items.length) {
        for (let i = 0; i < items.length; i += 1) {
          dataX.push(new Date(items[i].time).toLocaleString());
          dataY.push(Number(items[i].value));
        }
      }
    }
    return {
      dataX,
      dataY,
    };
  };

  const generateChartData = (key: string): TChartDataProps => {
    let dataX;
    let dataY;
    let dataY1;
    let dataY2;
    let offset = 0;
    let parseChartData;

    switch (key) {
      case 'circulatingSupply':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0;
        break;
      case 'coinSupply':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 10;
        break;
      case 'percentPSLStaked':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0.015;
        break;
      case 'nonZeroAddressesCount':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 1;
        break;
      case 'gigaHashPerSec':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0;
        break;
      case 'difficulty':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 10000;
        break;
      case 'avgBlockSizeLast24Hour':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 1;
        break;
      case 'avgTransactionPerBlockLast24Hour':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 1;
        break;
      default:
        break;
    }

    return {
      dataX,
      dataY,
      dataY1,
      dataY2,
      offset,
    };
  };

  return (
    <div className={classes.wrapper}>
      <Styles.Wrapper>
        {summaryList.map(({ id, name, value, difference, key: sumKey }) => (
          <Styles.Card key={id} classes={{ root: classes.cardItem }}>
            <Styles.CardContent>
              <Styles.ValueWrapper>
                <Styles.Typography variant="h6" className={classes.textTitle}>
                  {name}
                </Styles.Typography>
                <Styles.Typography variant="h4">
                  <Styles.Values>
                    {value === null ? <Skeleton animation="wave" variant="text" /> : value}
                  </Styles.Values>
                </Styles.Typography>
              </Styles.ValueWrapper>
              <Styles.PercentageWrapper>
                {difference === null ? (
                  <Skeleton animation="wave" variant="text" />
                ) : (
                  <Styles.Percentage
                    variant="subtitle2"
                    mb={4}
                    color="textSecondary"
                    noWrap
                    percentagecolor={`${
                      difference > 0
                        ? themeVariant.custom.green.success
                        : themeVariant.custom.red.error
                    }`}
                  >
                    Last 24h
                    <br />
                    <span>
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
              </Styles.PercentageWrapper>
            </Styles.CardContent>
            {generateChartData(sumKey)?.dataX?.length ? (
              <div>
                <LineChart
                  chartName={sumKey}
                  dataX={generateChartData(sumKey)?.dataX}
                  dataY={generateChartData(sumKey)?.dataY}
                  offset={generateChartData(sumKey)?.offset}
                />
              </div>
            ) : null}
          </Styles.Card>
        ))}
      </Styles.Wrapper>
    </div>
  );
};

export default Summary;
