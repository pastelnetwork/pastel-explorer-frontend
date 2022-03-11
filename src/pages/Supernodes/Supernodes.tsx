import * as React from 'react';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork } from '@utils/types/INetwork';

import { columns, SUPERNODE_LAST_PAID_KEY } from './Supernodes.columns';
import {
  transformSupernodesData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
} from './Supernodes.helpers';
import { GridWrapper, BlockWrapper, BlockTitle } from './Supernodes.styles';

interface ISupernodeData {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const Supernodes: React.FC = () => {
  const [sortData, setSortData] = React.useState<ISupernodeData>({
    sortBy: SUPERNODE_LAST_PAID_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
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

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    const sortedSupernodes = supernodes.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === DATA_DEFAULT_SORT ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return sortDirection === DATA_DEFAULT_SORT ? -1 : 1;
      return 0;
    });

    setSupernodes(sortedSupernodes);
    setSortData({
      sortBy,
      sortDirection,
    });
  };

  React.useEffect(() => {
    handleFetchSupernodes(DATA_OFFSET);
  }, []);

  return (
    <BlockWrapper>
      <BlockTitle>Supernode List</BlockTitle>
      <GridWrapper item>
        <InfinityTable
          sortBy={sortData.sortBy}
          sortDirection={sortData.sortDirection}
          onHeaderClick={handleSort}
          rows={supernodes}
          columns={columns}
          tableHeight={950}
          disableLoading
          renderAllRows
          className="supernode-table"
        />
      </GridWrapper>
    </BlockWrapper>
  );
};

export default Supernodes;
