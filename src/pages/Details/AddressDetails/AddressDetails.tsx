import React, { useState, useRef, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { Grid } from '@material-ui/core';
import { Data } from 'react-csv/components/CommonPropTypes';

import Header from '@components/Header/Header';
import Table from '@components/Table/Table';
import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { IAddress } from '@utils/types/IAddress';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { getCurrencyName } from '@utils/appInfo';
import { eChartLineStyles } from '@pages/HistoricalStatistics/Chart/styles';

import {
  addressHeaders,
  DATA_FETCH_LIMIT,
  DATA_DEFAULT_SORT,
  DATA_OFFSET,
  generateLatestTransactions,
  generateAddressSummary,
  DEFAULT_ADDRESS_DATA,
} from './AddressDetails.helpers';
import { ADDRESS_TRANSACTION_TIMESTAMP_KEY, columns } from './AddressDetails.columns';
import * as Styles from './AddressDetails.styles';

interface ParamTypes {
  id: string;
}

interface IAddressDataRef {
  offset: number;
  sortBy: string;
  sortDirection: SortDirectionsType;
}

export const transactionHistoryCSVHeaders = [
  { label: 'Timestamp', key: 'timestamp' },
  { label: 'Hash', key: 'transactionHash' },
  { label: `Amount (${getCurrencyName()})`, key: 'amount' },
];

const AddressDetails = () => {
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const fetchParams = useRef<IAddressDataRef>({
    offset: DATA_OFFSET,
    sortBy: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const { id } = useParams<ParamTypes>();
  const [addresses, setAddresses] = useState<IAddress>(DEFAULT_ADDRESS_DATA);
  const redirect = useRef(false);
  const [csvData, setCsvData] = useState<string | Data>('');
  const { fetchData } = useFetch<IAddress>({
    method: 'get',
    url: `${URLS.ADDRESS_URL}/${id}`,
  });

  const handleFetchAddress = (
    offset: number,
    sortBy: string,
    sortDirection: SortDirectionsType,
    replaceData = false,
  ) => {
    fetchParams.current.sortBy = sortBy;
    const limit = DATA_FETCH_LIMIT;

    return fetchData({ params: { offset, limit, sortBy, sortDirection } })
      .then(response => {
        if (!response) {
          redirect.current = true;
          return DEFAULT_ADDRESS_DATA;
        }

        return response;
      })
      .then(response =>
        replaceData
          ? setAddresses(response)
          : setAddresses(prevState => ({
              ...response,
              data: [...prevState.data, ...response.data],
            })),
      );
  };

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    fetchParams.current.offset += DATA_FETCH_LIMIT;

    return handleFetchAddress(
      fetchParams.current.offset,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
    );
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    fetchParams.current.sortDirection = sortDirection;
    fetchParams.current.offset = DATA_OFFSET;

    return handleFetchAddress(DATA_OFFSET, sortBy, fetchParams.current.sortDirection, true);
  };

  useEffect(() => {
    handleFetchAddress(
      DATA_OFFSET,
      fetchParams.current.sortBy,
      fetchParams.current.sortDirection,
      true,
    );
  }, [id]);

  useEffect(() => {
    if (addresses.data.length) {
      setCsvData(addresses.data);
    }
  }, [addresses]);

  if (redirect.current) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  const generateTitle = () => {
    const date = new Date();
    const fileName = `Transaction_History__${addresses.address}__${date.getFullYear()}_${
      date.getMonth() + 1
    }_${date.getDate()}.csv`;
    return (
      <Styles.TitleWrapper>
        <h4>Latest Transactions</h4>
        <CSVLink
          data={csvData}
          filename={fileName}
          headers={transactionHistoryCSVHeaders}
          separator=";"
          ref={downloadRef}
          className={styles.uploadButton}
        >
          Download CSV
        </CSVLink>
      </Styles.TitleWrapper>
    );
  };

  return addresses ? (
    <>
      <Header title="Address Details" />
      <Grid container direction="column">
        <Grid item>
          <Table
            title={`${getCurrencyName()} address: ${id}`}
            headers={addressHeaders}
            rows={generateAddressSummary(addresses)}
          />
        </Grid>
        <Styles.TableWrapper item>
          <InfinityTable
            customTitle={generateTitle()}
            sortBy={fetchParams.current.sortBy}
            sortDirection={fetchParams.current.sortDirection}
            rows={generateLatestTransactions(addresses.data)}
            loadMoreFrom={DATA_FETCH_LIMIT}
            columns={columns}
            onBottomReach={handleFetchMoreTransactions}
            onHeaderClick={handleSort}
            className="latest-transaction-table"
          />
        </Styles.TableWrapper>
      </Grid>
    </>
  ) : null;
};

export default AddressDetails;
