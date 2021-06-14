import { useEffect, useState } from 'react';
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformPriceInfo } from '@utils/helpers/statisticsLib';
import {
  CHART_DEFAULT_PERIOD,
  periods,
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
} from '@utils/constants/statistics';
import { IPlsPrice, TMultiLineChartData } from '@utils/types/IStatistics';
import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

const redrawCycle = 6000;
const info: any = {
  connections: 8,
  currencyName: 'PSL',
  disconnected: false,
  latestBlock: 71976,
  pslPrice: undefined,
  solps: 2652525,
  testnet: false,
  verificationProgress: 0.9999843360337557,
  version: 1000029,
};
const PriceOvertime = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState(CHART_THEME_BACKGROUND_DEFAULT_COLOR);
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
  const fetchStats = useFetch<{ data: Array<IPlsPrice> }>({
    method: 'get',
    url: URLS.GET_STATISTICS_PRICE,
  });

  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { limit: 50, offset: 0, sortDirection: 'DESC' },
      });
      if (data) {
        const parseData = transformPriceInfo(data.data, period);
        setTransformLineChartData(parseData);
      }
    };

    loadLineChartData();
    const newTicker = setInterval(() => {
      loadLineChartData();
    }, redrawCycle);
    setTicker(newTicker);

    return () => {
      if (newTicker) {
        clearInterval(newTicker);
      }
    };
  }, [period]);

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
    clearInterval(ticker as NodeJS.Timeout);
  };

  const handleBgColorChange = (color: string) => {
    setCurrentBgColor(color);
  };

  return (
    <Container>
      <div style={{ backgroundColor: currentBgColor }}>
        {transformLineChartData && (
          <EChartsMultiLineChart
            chartName="prices"
            dataX={transformLineChartData?.dataX}
            dataY1={transformLineChartData?.dataY1}
            dataY2={transformLineChartData?.dataY2}
            title={`${info.currencyName} Prices`}
            info={info}
            offset={0.0001}
            periods={periods[0]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </Container>
  );
};

export default PriceOvertime;
