import { useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';

import {
  addressHeaders,
  transactionHeaders,
  addressMockRows,
  transactionsMockRows,
} from './AddressDetails.helpers';

interface ParamTypes {
  id: string;
}

const AddressDetails = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <>
      <Header title="Address Details" />
      <Grid container direction="column">
        <Grid item>
          <Table title={`PSL address: ${id}`} headers={addressHeaders} rows={addressMockRows} />
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

export default AddressDetails;
