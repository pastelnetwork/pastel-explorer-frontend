import { useState, ChangeEvent } from 'react';
import { Skeleton } from '@material-ui/lab';

import { PeriodTypes, generatePeriodToDropdownOptions } from '@utils/helpers/statisticsLib';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { periods } from '@utils/constants/statistics';
import { LineChart } from '@components/Summary/LineChart';
import { Dropdown } from '@components/Dropdown/Dropdown';
import themeVariant from '@theme/variants';

import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as Styles from './CascadeAndSenseStatistics.styles';
import { totalSizeOfDataStoredData } from './mockup';

const TotalSizeOfDataStored: React.FC = () => {
  const [period, setPeriod] = useState<PeriodTypes>(periods[7][2]);
  const [chartData, setChartData] = useState(totalSizeOfDataStoredData[0]);

  const handleDropdownChange = (
    event: ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setPeriod(event.target.value as PeriodTypes);
      if (event.target.value === periods[7][0]) {
        setChartData(totalSizeOfDataStoredData[1]);
      } else if (event.target.value === periods[7][3] || event.target.value === periods[7][4]) {
        setChartData(totalSizeOfDataStoredData[2]);
      } else {
        setChartData(totalSizeOfDataStoredData[0]);
      }
    }
  };
  const total = chartData?.dataY?.reduce((partialSum, a) => partialSum + a, 0) || 0;
  const difference = chartData.difference || 0;

  return (
    <SummaryStyles.Card className="cascade-sense-card">
      <SummaryStyles.CardContent>
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            Total data stored on Cascade
          </SummaryStyles.Typography>
          <SummaryStyles.Typography variant="h4">
            <SummaryStyles.Values>{formatNumber(total)} MB</SummaryStyles.Values>
          </SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper>
          <Styles.Percentage>
            <Dropdown
              value={period}
              onChange={handleDropdownChange}
              options={generatePeriodToDropdownOptions(periods[7])}
              classNameWrapper="cascade-sense-statistics"
            />
            <br />
            <Styles.PercentageValue
              variant="subtitle2"
              mb={4}
              color="textSecondary"
              noWrap
              percentagecolor={`${
                difference > 0 ? themeVariant.custom.green.success : themeVariant.custom.red.error
              }`}
            >
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
            </Styles.PercentageValue>
          </Styles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <div>
        {!chartData ? (
          <Skeleton animation="wave" variant="rect" height={386} />
        ) : (
          <LineChart
            chartName="totalSizeOfDataStored"
            dataX={chartData?.dataX}
            dataY={chartData?.dataY}
            offset={1}
            disableClick
          />
        )}
      </div>
    </SummaryStyles.Card>
  );
};

export default TotalSizeOfDataStored;
