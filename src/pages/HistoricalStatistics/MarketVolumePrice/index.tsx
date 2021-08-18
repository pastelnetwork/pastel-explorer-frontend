// react
import { useEffect, useState } from 'react';
// third party
import { Skeleton } from '@material-ui/lab';
// import { format } from 'date-fns';
// application
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { PeriodTypes } from '@utils/helpers/statisticsLib';
import { periods, info } from '@utils/constants/statistics';
import { useBackgroundChart } from '@utils/hooks';
import { MarketCoinRespone, TMultiLineChartData } from '@utils/types/IStatistics';
import HistoricalStatisticsLayout from '@components/HistoricalStatisticsLayout';
import { EChartsMultiLineChart } from '../Chart/EChartsMultiLineChart';

function PriceOvertime() {
  const [period, setPeriod] = useState<PeriodTypes>(periods[3][0]);
  const [currentBgColor, handleBgColorChange] = useBackgroundChart();
  const fetchStats = useFetch<{ data: MarketCoinRespone }>({
    method: 'get',
    url: URLS.GET_STATISTICS_MARKET_PRICE,
  });
  const [transformLineChartData, setTransformLineChartData] = useState<TMultiLineChartData>();

  useEffect(() => {
    const loadLineChartData = async () => {
      const data = await fetchStats.fetchData({
        params: { period },
      });
      if (data) {
        const { prices, total_volumes } = data.data;

        const dataX = [];
        const dataY1 = [];
        const dataY2 = [];
        for (let i = 0; i < prices.length; i += 1) {
          const [x, y1] = prices[i];
          const [, y2] = total_volumes[i];
          dataX.push(new Date(x).toLocaleString());
          dataY1.push(+y1.toFixed(8));
          dataY2.push(Math.round(y2));
        }
        setTransformLineChartData({ dataX, dataY1, dataY2 });
      }
    };
    loadLineChartData();
  }, [period]);

  const handlePeriodFilterChange = (per: PeriodTypes) => {
    setPeriod(per);
  };

  return (
    <HistoricalStatisticsLayout currentBgColor={currentBgColor}>
      {transformLineChartData ? (
        <EChartsMultiLineChart
          chartName="prices"
          dataX={transformLineChartData?.dataX}
          dataY1={transformLineChartData?.dataY1}
          dataY2={transformLineChartData?.dataY2}
          yaxisName="USD Price"
          yaxisName1="Volume"
          seriesName="Price"
          seriesName1="Vol"
          fixedNum={5}
          fixedNum1={0}
          title="Price - Volume"
          info={info}
          offset={0.0001}
          period={period}
          periods={periods[3]}
          handleBgColorChange={handleBgColorChange}
          handlePeriodFilterChange={handlePeriodFilterChange}
        />
      ) : (
        <Skeleton animation="wave" variant="rect" height={386} />
      )}
    </HistoricalStatisticsLayout>
  );
}

export default PriceOvertime;
