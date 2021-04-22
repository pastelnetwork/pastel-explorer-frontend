import * as React from 'react';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';
import Map, { MarkerProps } from '@components/Map/Map';
import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INetwork } from '@utils/types/INetwork';

import { mockChartTableData } from './Explorer.helpers';
import LatestTransactions from './LatestTransactions/LatestTransactions';

const Explorer: React.FC = () => {
  const [geoLocationList, setGeoLocationList] = React.useState<Array<MarkerProps> | null>(null);
  const fetchGeoData = useFetch<{ data: Array<INetwork> }>({
    method: 'get',
    url: `${URLS.NETWORK_URL}`,
  });

  const transformGeoLocationData = (geoLocations: Array<INetwork>) => {
    const transformedGeoLocations = geoLocations.map(({ latitude, longitude, country, city }) => {
      const latLng = [latitude, longitude] as [number, number];
      const name = city !== 'N/A' ? `${country} (${city})` : country;

      return {
        latLng,
        name,
      };
    });

    setGeoLocationList(transformedGeoLocations);
  };

  React.useEffect(() => {
    fetchGeoData.fetchData().then(response => {
      if (!response) return null;
      return transformGeoLocationData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Explorer" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Map markers={geoLocationList} title="Explorer Map" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart
            title="Supernode Statistics"
            innerTitle="Total"
            innerSubtitle={formatNumber(3729, { decimalsLength: 0 })}
            data={mockChartTableData.data}
            table={<Table headers={mockChartTableData.headers} rows={mockChartTableData.rows} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <LatestTransactions />
      </Grid>
    </>
  );
};

export default Explorer;
