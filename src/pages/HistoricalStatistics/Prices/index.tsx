import { useEffect, useState } from 'react';
import { Container } from '@pages/HistoricalStatistics/StatisticsOvertime.styles';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes, transformPriceInfo } from '@utils/helpers/statisticsLib';
import { CHART_DEFAULT_PERIOD, periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { IStatistic, TMultiLineChartData } from '@utils/types/IStatistics';
import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

const redrawCycle = 6000;

const PriceOvertime = (): JSX.Element => {
  const [period, setPeriod] = useState<PeriodTypes>(CHART_DEFAULT_PERIOD);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const [ticker, setTicker] = useState<NodeJS.Timeout>();
  const fetchStats = useFetch<{ data: Array<IStatistic> }>({
    method: 'get',
    url: URLS.GET_STATISTICS,
  });

  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { sortDirection: 'DESC', period },
      });
      if (data) {
        const parseData = transformPriceInfo(data.data);
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
