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
import { ISummary, ISummaryStats } from '@utils/types/ISummary';
import { SocketContext } from '@context/socket';
import themeVariant from '@theme/variants';
import { AppThunkDispatch } from '@redux/types';
import { BlockThunks, TransactionThunks } from '@redux/thunk';
import { ISocketData } from '@utils/types/ISocketData';
import {
  transformNetTotals,
  transformDifficultyInfo,
  transformCharts,
  transformPriceInfo,
  transformTransactionPerSecond,
  transformTotalData,
  transformMempoolInfo,
} from '@utils/helpers/statisticsLib';

import * as Styles from './Summary.styles';
import { LineChart } from './LineChart';
import { MultiLineChart } from './MultiLineChart';
import { initialSummaryList, calculateDifference } from './Summary.helpers';
import * as mockupData from './mockup';

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
          value: formatNumber(currentStats[key] || 0, {
            decimalsLength: summaryElement.decimals,
            divideToAmount: summaryElement.divideToAmount,
          }),
          previousValue: formatNumber(lastDayStats?.[key] || 0, {
            decimalsLength: summaryElement.decimals,
          }),
          difference: calculateDifference(currentStats[key] || 0, lastDayStats?.[key] || 0),
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

  const generateChartData = (key: string): TChartDataProps => {
    let dataX;
    let dataY;
    let dataY1;
    let dataY2;
    let parseData;
    let offset = 0;
    switch (key) {
      case 'gigaHashPerSec':
        parseData = transformNetTotals(mockupData.gigaHashPerSec);
        dataX = parseData?.dataX;
        dataY1 = parseData?.dataY1;
        dataY2 = parseData?.dataY2;
        offset = 0;
        break;
      case 'difficulty':
        parseData = transformDifficultyInfo(mockupData.difficulty);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 10000;
        break;
      case 'coinSupply':
        parseData = transformCharts(mockupData.coinSupply);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 1;
        break;
      case 'usdPrice':
        parseData = transformPriceInfo(mockupData.usdPrice);
        dataX = parseData?.dataX;
        dataY1 = parseData?.dataY1;
        dataY2 = parseData?.dataY2;
        offset = 0.0001;
        break;
      case 'nonZeroAddressesCount':
        parseData = transformCharts(mockupData.nonZeroAddressesCount);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 0;
        break;
      case 'avgTransactionsPerSecond':
        parseData = transformTransactionPerSecond(mockupData.avgTransactionsPerSecond);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 0.05;
        break;
      case 'avgBlockSizeLast24Hour':
        parseData = transformTotalData(mockupData.avgBlockSizeLast24Hour);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 1;
        break;
      case 'avgTransactionPerBlockLast24Hour':
        parseData = transformCharts(mockupData.avgTransactionPerBlockLast24Hour);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 1;
        break;
      case 'avgTransactionFeeLast24Hour':
        parseData = transformCharts(mockupData.avgTransactionFeeLast24Hour);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
        offset = 0.05;
        break;
      case 'memPoolSize':
        parseData = transformMempoolInfo(mockupData.memPoolSize);
        dataX = parseData?.dataX;
        dataY = parseData?.dataY;
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
                    Since yesterday
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
                {sumKey !== 'usdPrice' ? (
                  <LineChart
                    chartName={sumKey}
                    dataX={generateChartData(sumKey)?.dataX}
                    dataY={generateChartData(sumKey)?.dataY}
                    dataY1={generateChartData(sumKey)?.dataY1}
                    dataY2={generateChartData(sumKey)?.dataY2}
                    offset={generateChartData(sumKey)?.offset}
                  />
                ) : (
                  <MultiLineChart
                    chartName={sumKey}
                    dataX={generateChartData(sumKey)?.dataX}
                    dataY1={generateChartData(sumKey)?.dataY1}
                    dataY2={generateChartData(sumKey)?.dataY2}
                    offset={generateChartData(sumKey)?.offset}
                  />
                )}
              </div>
            ) : null}
          </Styles.Card>
        ))}
      </Styles.Wrapper>
    </div>
  );
};

export default Summary;
