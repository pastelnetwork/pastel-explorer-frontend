import * as React from 'react';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import InfinityTable, { RowsProps } from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork } from '@utils/types/INetwork';

import { columns } from './Supernodes.columns';
import { transformSupernodesData, DATA_FETCH_LIMIT, DATA_OFFSET } from './Supernodes.helpers';

const Supernodes: React.FC = () => {
  const [supernodes, setSupernodes] = React.useState<Array<RowsProps>>([]);
  const { fetchData } = useFetch<INetwork>({
    method: 'get',
    url: URLS.NETWORK_URL,
  });

  const handleFetchSupernodes = (offset: number) => {
    const limit = DATA_FETCH_LIMIT;

    return fetchData({ params: { limit, offset } })
      .then(response => (response ? transformSupernodesData(response.masternodes) : []))
      .then(data => setSupernodes(prevState => [...prevState, ...data]));
  };

  React.useEffect(() => {
    handleFetchSupernodes(DATA_OFFSET);
  }, []);

  return (
    <>
      <Header title="Supernode List" />
      <Grid item>
        <InfinityTable rows={supernodes} columns={columns} tableHeight={950} />
      </Grid>
    </>
  );
};

export default Supernodes;
