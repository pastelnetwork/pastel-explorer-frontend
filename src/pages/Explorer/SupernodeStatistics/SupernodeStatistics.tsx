import * as React from 'react';

import Table, { RowsProps } from '@components/Table/Table';
import BarChart from '@components/Charts/BarChart/BarChart';

import { INetworkSupernodes } from '@utils/types/INetwork';

import {
  headers,
  generateSupernodeCountriesList,
  CountryList,
} from './SupernodeStatistics.helpers';
import * as ExplorerMapStyles from '../ExplorerMap/ExplorerMap.styles';

interface SupernodeStatisticsProps {
  supernodes: Array<INetworkSupernodes> | null;
}

const DISPLAY_COUNTRY_QUANTITY = 5;

const tableStyles = {
  height: '340px',
  overflow: 'auto',
  background: 'transparent',
};

const SupernodeStatistics: React.FC<SupernodeStatisticsProps> = ({ supernodes }) => {
  const [countries, setCountries] = React.useState<Array<RowsProps> | null>(null);
  const [countryQuantity, setCountryQuantity] = React.useState(0);
  const [countryChartData, setCountryChartData] = React.useState<CountryList['chartData'] | null>(
    null,
  );

  const generateSupernodeCountries = (nodes: Array<INetworkSupernodes>) => {
    const { tableData, chartData, totalQuantity } = generateSupernodeCountriesList(
      nodes,
      DISPLAY_COUNTRY_QUANTITY,
    );

    const countryTable = tableData.map(({ name, quantity, percentage }, index: number) => {
      return {
        id: index,
        data: [
          { value: name, id: 1 },
          { value: quantity, id: 2 },
          { value: percentage, id: 3 },
        ],
      };
    });

    setCountries(countryTable);
    setCountryQuantity(totalQuantity);
    setCountryChartData(chartData);
  };

  React.useEffect(() => {
    if (supernodes) {
      generateSupernodeCountries(supernodes);
    }
  }, [supernodes]);

  const chartData = {
    labels: countryChartData?.headers || [],
    data: countryChartData?.quantities || [],
  };

  return (
    <ExplorerMapStyles.Container>
      <BarChart
        title="Supernode Statistics"
        innerTitle="Total"
        innerSubtitle={countryQuantity}
        data={chartData}
        table={<Table headers={headers} rows={countries} styles={tableStyles} />}
      />
    </ExplorerMapStyles.Container>
  );
};

export default SupernodeStatistics;
