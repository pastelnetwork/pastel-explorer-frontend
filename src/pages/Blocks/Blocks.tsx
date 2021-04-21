import * as React from 'react';
import { Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import Header from '@components/Header/Header';
import Table, { HeaderType, RowsProps } from '@components/Table/Table';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { IBlock } from '@utils/types/IBlocks';
import { formattedDate } from '@utils/helpers/date/date';

const headers: Array<HeaderType> = [
  { id: 1, header: 'Block' },
  { id: 2, header: 'Transactions Quantity' },
  { id: 5, header: 'Timestamp' },
];

const Blocks = () => {
  const [blockList, setBLockList] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<{ data: Array<IBlock> }>({
    method: 'get',
    url: `${URLS.BLOCK_URL}?limit=100&offset=0`,
  });

  const generateBlockList = (blocks: Array<IBlock>) => {
    const transformedBlocks = blocks.map(({ id, timestamp, transactionCount }) => {
      return {
        id,
        data: [
          {
            value: <RouterLink route={`${ROUTES.BLOCK_DETAILS}/${id}`} value={id} />,
            id: 1,
          },
          {
            value: transactionCount,
            id: 2,
          },
          { value: formattedDate(timestamp, { dayName: false }), id: 3 },
        ],
      };
    });

    setBLockList(transformedBlocks);
  };

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response) return null;
      return generateBlockList(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Blocks" />
      <Grid item>
        <Table headers={headers} rows={blockList} />
      </Grid>
    </>
  );
};

export default Blocks;
