import { useState, ChangeEvent, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { format, fromUnixTime } from 'date-fns';
import parse from 'html-react-parser';

import { PeriodTypes, generatePeriodToDropdownOptions } from '@utils/helpers/statisticsLib';
import { periods, cacheList } from '@utils/constants/statistics';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import { useDeferredData } from '@utils/helpers/useFetch/useFetch';
import { IBlock } from '@utils/types/IBlocks';
import * as URLS from '@utils/constants/urls';
import { translate } from '@utils/helpers/i18n';
import { readCacheValue, setCacheValue } from '@utils/helpers/localStorage';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';
import * as StatisticsStyles from '../Statistics.styles';

import { ITransformBlocksData } from './BlockStatistics.helpers';

interface ChartProps {
  labels: Array<string>;
  data: Array<number>;
}

interface IBlockSizes {
  blockElements: ITransformBlocksData[];
}

const BlockSizes: React.FC<IBlockSizes> = ({ blockElements }) => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[2][0]);
  const [chartData, setChartData] = useState<ChartProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const generateChartData = (blocks: Array<IBlock>) => {
    const groupedBlocks = blocks.reduce(
      (acc: ChartProps, { size, timestamp }) => {
        const time = format(fromUnixTime(timestamp), 'MM/dd/yyyy hh:mm aa');

        acc.labels.push(time);
        acc.data.push(size / 1024);

        return acc;
      },
      { labels: [], data: [] },
    );

    return groupedBlocks;
  };

  const blockSizesData = useDeferredData<{ data: Array<IBlock> }, ChartProps>(
    { method: 'get', url: `${URLS.BLOCK_SIZE_URL}?period=${period}` },
    ({ data }) => generateChartData(data.sort((a, b) => a.timestamp - b.timestamp)),
    undefined,
    undefined,
    [period, blockElements],
  );

  useEffect(() => {
    let currentCache = readCacheValue(cacheList.blockSizes) || {};
    if (currentCache[period]) {
      setChartData(currentCache[period].parseData as ChartProps);
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (!blockSizesData.isLoading && blockSizesData.data) {
      const parseData = blockSizesData.data;
      setChartData(parseData);
      currentCache = {
        ...currentCache,
        [period]: {
          parseData,
        },
      };
      setCacheValue(
        cacheList.blockSizes,
        JSON.stringify({
          currentCache,
          lastDate: Date.now(),
        }),
      );
      setLoading(false);
    }
  }, [period, blockSizesData.isLoading]);

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
            {parse(translate('pages.statistics.blockSizes'))}
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
            <StatisticsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
            </StatisticsStyles.LoadingText>
          </StatisticsStyles.Loader>
        ) : null}
        {!chartData ? (
          <>
            <Skeleton animation="wave" variant="rect" height={300} />
            <StatisticsStyles.LoadingText>
              {parse(translate('common.loadingData'))}
            </StatisticsStyles.LoadingText>
          </>
        ) : (
          <LineChart
            chartName="blockSizesStatistics"
            dataX={chartData?.labels}
            dataY={chartData?.data}
            offset={1000}
            disableClick
          />
        )}
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default BlockSizes;
