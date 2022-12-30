import { useState, ChangeEvent, useContext, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';

import {
  PeriodTypes,
  transformChartData,
  generatePeriodToDropdownOptions,
} from '@utils/helpers/statisticsLib';
import * as URLS from '@utils/constants/urls';
import { TLineChartData, IHashRateResponse } from '@utils/types/IStatistics';
import { useFetch, useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { periods } from '@utils/constants/statistics';
import { getCurrencyName } from '@utils/appInfo';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { BlockUnconfirmed } from '@utils/types/ITransactions';
import { IBlock } from '@utils/types/IBlocks';
import { SocketContext } from '@context/socket';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';
import * as StatisticsStyles from '../Statistics.styles';
import {
  transformBlocksData,
  ITransformBlocksData,
} from '../BlockStatistics/BlockStatistics.helpers';

const BLOCK_ELEMENTS_COUNT = 8;

const NetworkStatistics: React.FC = () => {
  const socket = useContext(SocketContext);
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const [blockElements, setBlockElements] = useState<Array<ITransformBlocksData>>([]);

  const fetchUnconfirmedTxs = useFetch<{ data: BlockUnconfirmed[] }>({
    method: 'get',
    url: URLS.GET_UNCONFIRMED_TRANSACTIONS,
  });

  const fetchBlocksData = useFetch<{ data: Array<IBlock>; timestamp: number }>({
    method: 'get',
    url: URLS.BLOCK_URL,
  });

  const handleBlocksData = () => {
    Promise.all([
      fetchBlocksData.fetchData({ params: { limit: BLOCK_ELEMENTS_COUNT } }),
      fetchUnconfirmedTxs.fetchData(),
    ]).then(([blocksData]) => {
      if (blocksData) {
        setBlockElements(transformBlocksData(blocksData.data, blocksData.timestamp));
      }
    });
  };

  useEffect(() => {
    handleBlocksData();

    socket.on('getUpdateBlock', () => {
      handleBlocksData();
    });

    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);

  const { isLoading, data: chartData } = useDeferredData<IHashRateResponse, TLineChartData>(
    { method: 'get', url: `${URLS.VOLUME_TRANSACTION_URL}`, params: { period } },
    res => transformChartData(res, true),
    undefined,
    undefined,
    [period, blockElements],
  );

  const handleDropdownChange = (
    event: ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setPeriod(event.target.value as PeriodTypes);
    }
  };

  return (
    <SummaryStyles.Card className="cascade-sense-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            Volume of transactions ({getCurrencyName()})
          </SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>
            <Dropdown
              value={period}
              onChange={handleDropdownChange}
              options={generatePeriodToDropdownOptions(periods[2])}
              classNameWrapper="cascade-sense-statistics"
            />
          </Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <StatisticsStyles.ChartSection>
        {isLoading ? (
          <StatisticsStyles.Loader>
            <StatisticsStyles.LoadingText>Loading data...</StatisticsStyles.LoadingText>
          </StatisticsStyles.Loader>
        ) : null}
        {!chartData ? (
          <>
            <Skeleton animation="wave" variant="rect" height={300} />
            <StatisticsStyles.LoadingText>Loading data...</StatisticsStyles.LoadingText>
          </>
        ) : (
          <LineChart
            chartName="volumeTransactions"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1000}
            disableClick
          />
        )}
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default NetworkStatistics;
