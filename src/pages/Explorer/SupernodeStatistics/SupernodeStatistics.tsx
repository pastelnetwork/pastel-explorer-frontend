import * as React from 'react';

import Table, { RowsProps } from '@components/Table/Table';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import { INetworkMasternodes } from '@utils/types/INetwork';

import {
  headers,
  generateMasternodeCountriesList,
  generateChartData,
  CountryList,
} from './SupernodeStatistics.helpers';

interface SupernodeStatisticsProps {
  masternodes: Array<INetworkMasternodes> | null;
}

const DISPLAY_COUNTRY_QUANTITY = 5;

const tableStyles = {
  height: '200px',
  overflow: 'auto',
};

const SupernodeStatistics: React.FC<SupernodeStatisticsProps> = ({ masternodes }) => {
  const [countries, setCountries] = React.useState<Array<RowsProps> | null>(null);
  const [countryQuantity, setCountryQuantity] = React.useState(0);
  const [countryChartData, setCountryChartData] = React.useState<CountryList['chartData'] | null>(
    null,
  );

  const generateMasternodeCountries = (nodes: Array<INetworkMasternodes>) => {
    const { tableData, chartData, totalQuantity } = generateMasternodeCountriesList(
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
    if (masternodes) {
      generateMasternodeCountries(masternodes);
    }
  }, [masternodes]);

  return (
    <DoughnutChart
      title="Supernode Statistics"
      innerTitle="Total"
      innerSubtitle={countryQuantity}
      data={
        countryChartData && generateChartData(countryChartData.headers, countryChartData.quantities)
      }
      table={<Table headers={headers} rows={countries} styles={tableStyles} />}
    />
  );
};

export default SupernodeStatistics;
