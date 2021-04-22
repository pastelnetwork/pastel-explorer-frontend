import * as React from 'react';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork } from '@utils/types/INetwork';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Address' },
  { id: 2, header: 'Protocol' },
  { id: 3, header: 'Sub-version' },
  { id: 4, header: 'Country' },
];

const Network: React.FC = () => {
  const [connections, setConnections] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<{ data: Array<INetwork> }>({
    method: 'get',
    url: URLS.NETWORK_URL,
  });

  const transformConnectionsData = (connectionList: Array<INetwork>) => {
    const transformedConnections = connectionList.map(({ id, ip, protocol, version, country }) => {
      return {
        id,
        data: [
          { value: ip, id: 1 },
          { value: protocol, id: 2 },
          { value: version, id: 3 },
          { value: country, id: 4 },
        ],
      };
    });

    setConnections(transformedConnections);
  };

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response) return null;
      return transformConnectionsData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Network" />
      <Grid item>
        <Table headers={headers} rows={connections} title="Connections" />
      </Grid>
    </>
  );
};

export default Network;
