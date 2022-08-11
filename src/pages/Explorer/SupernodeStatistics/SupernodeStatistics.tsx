import * as React from 'react';

import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import { INetworkSupernodes } from '@utils/types/INetwork';

import {
  generateSupernodeCountriesList,
  generateChartData,
  CountryList,
} from './SupernodeStatistics.helpers';
import * as ExplorerMapStyles from '../ExplorerMap/ExplorerMap.styles';

interface SupernodeStatisticsProps {
  supernodes: Array<INetworkSupernodes> | null;
}

const DISPLAY_COUNTRY_QUANTITY = 5;

const SupernodeStatistics: React.FC<SupernodeStatisticsProps> = ({ supernodes }) => {
  const [countryQuantity, setCountryQuantity] = React.useState(0);
  const [countryChartData, setCountryChartData] = React.useState<CountryList['chartData'] | null>(
    null,
  );

  const generateSupernodeCountries = (nodes: Array<INetworkSupernodes>) => {
    const { chartData, totalQuantity } = generateSupernodeCountriesList(
      nodes,
      DISPLAY_COUNTRY_QUANTITY,
    );

    setCountryQuantity(totalQuantity);
    setCountryChartData(chartData);
  };

  React.useEffect(() => {
    if (supernodes) {
      generateSupernodeCountries(supernodes);
    }
  }, [supernodes]);

  const totalSuperNodes = countryChartData?.quantities?.reduce((a, b) => a + b, 0) || 1;
  const stakingAPRData =
    countryChartData?.quantities?.map(q => parseFloat((51.84 / q).toFixed(2))) || [];

  return (
    <ExplorerMapStyles.Container>
      <DoughnutChart
        title="Supernode Statistics"
        innerTitle="Total"
        innerSubtitle={countryQuantity}
        data={
          countryChartData &&
          generateChartData(countryChartData.headers, countryChartData.quantities)
        }
        totalSuperNodes={totalSuperNodes}
        stakingAPRData={stakingAPRData}
        stakingAPRHeader={countryChartData?.headers}
      />
    </ExplorerMapStyles.Container>
  );
};

export default SupernodeStatistics;
