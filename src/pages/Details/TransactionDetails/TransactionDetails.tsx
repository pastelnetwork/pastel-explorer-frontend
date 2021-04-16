import { useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';

import {
  inputAddressMockRows,
  transactionMockRows,
  recipientsMockRows,
  inputAddressHeaders,
  recipientsHeaders,
  transactionHeaders,
} from './TransactionDetails.helpers';

interface ParamTypes {
  id: string;
}

const TransactionDetails = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <>
      <Header title="Transaction Details" />
      <Grid container direction="column">
        <Grid item>
          <Table
            title={`PSL txID: ${id}`}
            headers={transactionHeaders}
            rows={transactionMockRows}
          />
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <Table
              title="Input Addresses"
              headers={inputAddressHeaders}
              rows={inputAddressMockRows}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Table title="Recipients" headers={recipientsHeaders} rows={recipientsMockRows} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionDetails;
