import * as React from 'react';

import Skeleton from '@mui/material/Skeleton';
import { withStyles, makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

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
import { getCurrencyName } from '@utils/appInfo';
import useNetwork from '@hooks/useNetwork';
import { translate } from '@utils/helpers/i18n';
import { getMinMax, checkValidateData } from '@utils/helpers/statisticsLib';

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

const CustomTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#4A5568',
    boxShadow: theme.shadows[2],
    fontSize: 12,
  },
}))(Tooltip);

const NETWORK_RANGE = 1048576;

const Summary: React.FC = () => {
  const { supernodeList, isLoading } = useNetwork(true);
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);
  const [currentStatsData, setCurrentStatsData] = React.useState<ISummaryStats | null>(null);
  const [summaryChartData, setSummaryChartData] = React.useState<ISummaryChartStats>();
  const { fetchData } = useFetch<ISummary>({
    method: 'get',
    url: `${URLS.SUMMARY_URL}?limit=576&period=24h`,
  });
  const socket = React.useContext(SocketContext);
  const classes = useStyles();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppThunkDispatch>();
  const generateSummaryData = React.useCallback((summary: ISummary) => {
    const { currentStats, lastDayStats, chartStats } = summary;
    setCurrentStatsData(currentStats);
    setSummaryChartData(chartStats);
    setSummaryList(prev => {
      const items = prev.map(summaryElement => {
        const key = summaryElement.key as keyof ISummaryStats;
        const currentVal = currentStats?.[key] || 0;
        const lastDayStatsVal = lastDayStats?.[key] || 0;
        let value = formatNumber(
          summaryElement.key === 'percentPSLStaked'
            ? parseFloat(currentVal.toString()) * 100
            : currentVal,
          {
            decimalsLength: summaryElement.decimals,
            divideToAmount: summaryElement.divideToAmount,
          },
        );
        let previousValue = formatNumber(
          summaryElement.key === 'percentPSLStaked'
            ? parseFloat(lastDayStatsVal.toString()) * 100
            : lastDayStatsVal,
          {
            decimalsLength: summaryElement.decimals,
          },
        );
        if (summaryElement.key === 'gigaHashPerSec') {
          value = currentVal.toString();
          previousValue = lastDayStatsVal.toString();
        }
        return {
          ...summaryElement,
          value,
          previousValue,
          difference: calculateDifference(
            Number(currentStats?.[key]) || 0,
            Number(lastDayStats?.[key]) || 0,
            key,
          ),
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

  const transformSupplyChartData = (key: string) => {
    const dataX = [];
    const dataY = [];
    if (summaryChartData) {
      const items = summaryChartData[key as keyof ISummaryChartStats] as TSummaryChartProps[];
      if (items.length) {
        for (let i = 0; i < items.length; i += 1) {
          dataX.push(new Date(items[i].time).toLocaleString());
          dataY.push(Number(items[i].value) < 0 ? 0 : Number(items[i].value));
        }
        if (checkValidateData(items[items.length - 1]?.time)) {
          dataX.push(new Date().toLocaleString());
          dataY.push(dataY[dataY.length - 1]);
        }
      }
    }
    return {
      dataX,
      dataY,
    };
  };

  const transformNetworkChartData = (key: string) => {
    const dataX = [];
    const dataY = [];
    if (summaryChartData) {
      const items = summaryChartData[key as keyof ISummaryChartStats] as TSummaryChartProps[];
      if (items.length) {
        for (let i = 0; i < items.length; i += 1) {
          dataX.push(new Date(items[i].time).toLocaleString());
          dataY.push(Number(items[i].value) * NETWORK_RANGE);
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
    let minMax;

    switch (key) {
      case 'circulatingSupply':
        parseChartData = transformSupplyChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0;
        break;
      case 'coinSupply':
        parseChartData = transformSupplyChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0;
        break;
      case 'percentPSLStaked':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        minMax = getMinMax(parseChartData?.dataY || []);
        offset = minMax[1] * 0.01;
        break;
      case 'nonZeroAddressesCount':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        offset = 0;
        break;
      case 'gigaHashPerSec':
        parseChartData = transformNetworkChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        minMax = getMinMax(parseChartData?.dataY || []);
        offset = minMax[1] * 0.02;
        break;
      case 'difficulty':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        minMax = getMinMax(parseChartData?.dataY || []);
        offset = minMax[1] * 0.02;
        break;
      case 'avgBlockSizeLast24Hour':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        minMax = getMinMax(parseChartData?.dataY || []);
        offset = minMax[1] * 0.001;
        break;
      case 'avgTransactionPerBlockLast24Hour':
        parseChartData = transformChartData(key);
        dataX = parseChartData?.dataX;
        dataY = parseChartData?.dataY;
        minMax = getMinMax(parseChartData?.dataY || []);
        offset = minMax[1] * 0.001;
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

  const renderCardHeaderValue = (sumKey: string, value: string | number | null) => {
    if (!value || isLoading) {
      return <Skeleton animation="wave" variant="text" />;
    }
    if (sumKey === 'circulatingSupply' || sumKey === 'coinSupply') {
      const theNumberOfTotalSupernodes = getCurrencyName() === 'PSL' ? 5000000 : 1000000;
      const totalLockedInSupernodes = supernodeList.length * theNumberOfTotalSupernodes;
      return (
        <CustomTooltip
          title={
            <Box>
              {sumKey === 'coinSupply' ? (
                <>
                  <Box>
                    {parse(translate('components.summary.coinsCreated'))}:{' '}
                    {formatNumber(currentStatsData?.totalCoinSupply || 0, { decimalsLength: 2 })}
                  </Box>
                  <Box>
                    {parse(
                      translate('components.summary.lessPSLBurnt', { currency: getCurrencyName() }),
                    )}
                    : {formatNumber(currentStatsData?.totalBurnedPSL || 0, { decimalsLength: 2 })}
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    {parse(translate('components.summary.totalSupply'))}:{' '}
                    {formatNumber(currentStatsData?.coinSupply || 0, { decimalsLength: 2 })}
                  </Box>
                  <Box>
                    {parse(
                      translate('components.summary.lessPSLStakedBySuperNodes', {
                        currency: getCurrencyName(),
                      }),
                    )}
                    : {formatNumber(totalLockedInSupernodes)}
                  </Box>
                  <Box>
                    {parse(
                      translate('components.summary.lessPSLLockedByFoundation', {
                        currency: getCurrencyName(),
                      }),
                    )}
                    :{' '}
                    {formatNumber(currentStatsData?.pslLockedByFoundation || 0, {
                      decimalsLength: 0,
                    })}
                  </Box>
                </>
              )}
            </Box>
          }
        >
          <Box>{value}</Box>
        </CustomTooltip>
      );
    }

    if (sumKey === 'gigaHashPerSec') {
      return formatNumber(Number(value.toString().replaceAll(',', '')) * NETWORK_RANGE, {
        decimalsLength: 2,
      });
    }

    return value;
  };

  const renderDifference = (_difference: string | number) => {
    if (Number(_difference) > 0) {
      return (
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
      );
    }
    if (Number(_difference) < 0) {
      return (
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
      );
    }

    return (
      <svg
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1504_661)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 11L8.91644 6.91644L10 8L5 13L0 8L1.08356 6.91644L4.23381 10.0667L5 11Z"
            fill="#BAA806"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 2L1.08356 6.08356L0 5L5 0L10 5L8.91644 6.08356L5.76619 2.93331L5 2Z"
          fill="#BAA806"
        />
        <defs>
          <clipPath id="clip0_1504_661">
            <rect width="10" height="10" fill="white" transform="translate(0 3)" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Styles.Wrapper>
        {summaryList.map(({ id, name, value, difference, key: sumKey }) => (
          <Styles.Card key={id} classes={{ root: classes.cardItem }}>
            <Styles.CardContent>
              <Styles.ValueWrapper>
                <Styles.Typography variant="h6" className={classes.textTitle}>
                  {['circulatingSupply', 'coinSupply', 'percentPSLStaked'].includes(sumKey)
                    ? parse(translate(name, { currency: getCurrencyName() }))
                    : parse(translate(name))}
                </Styles.Typography>
                <Styles.Typography variant="h4">
                  <Styles.Values>{renderCardHeaderValue(sumKey, value)}</Styles.Values>
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
                      Number(difference) > 0
                        ? themeVariant.custom.green.success
                        : themeVariant.custom.red.error
                    }`}
                  >
                    {sumKey === 'percentPSLStaked'
                      ? parse(translate('components.summary.last30d'))
                      : parse(translate('components.summary.last24h'))}
                    <br />
                    <span className={Number(difference) === 0 ? 'no-change' : ''}>
                      {`${Number(difference) > 0 ? '+' : ''}`}
                      {difference}%&nbsp;
                      {renderDifference(difference)}
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
