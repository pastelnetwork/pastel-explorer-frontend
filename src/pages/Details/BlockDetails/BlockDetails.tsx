import { useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';

import {
  blockHeaders,
  transactionHeaders,
  blockMockRows,
  transactionsMockRows,
} from './BlockDetails.helpers';

interface ParamTypes {
  id: string;
}

const BlockDetails = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <>
      <Header title="Block Details" />
      <Grid container direction="column">
        <Grid item>
          <Table title={`PSL block: ${id}`} headers={blockHeaders} rows={blockMockRows} />
        </Grid>
        <Grid item>
          <Table
            title="Latest Transactions"
            headers={transactionHeaders}
            rows={transactionsMockRows}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BlockDetails;
