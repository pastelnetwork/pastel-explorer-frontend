import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';
import { CircularProgress, Grid } from '@material-ui/core';

import Table from '@components/Table/Table';
import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { IAddress } from '@utils/types/IAddress';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { getCurrencyName } from '@utils/appInfo';
import { formattedDate } from '@utils/helpers/date/date';
import { eChartLineStyles } from '@pages/HistoricalStatistics/Chart/styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

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

const transactionHistoryCSVHeaders = [
  { label: 'Hash', key: 'transactionHash' },
  { label: `Amount (${getCurrencyName()})`, key: 'amount' },
  { label: 'Timestamp', key: 'timestamp' },
];

const AddressDetails = () => {
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [isMobile, setMobileView] = useState(false);
  const fetchParams = useRef<IAddressDataRef>({
    offset: DATA_OFFSET,
    sortBy: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const { id } = useParams<ParamTypes>();
  const [addresses, setAddresses] = useState<IAddress>(DEFAULT_ADDRESS_DATA);
  const [csvData, setCsvData] = useState<string | Data>('');
  const { fetchData, isLoading } = useFetch<IAddress>({
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
      const data: Data = [];
      addresses.data.forEach(o => {
        data.push({
          transactionHash: o.transactionHash,
          amount: o.amount,
          timestamp: formattedDate(o.timestamp),
        });
      });
      setCsvData(data);
    }
  }, [addresses]);

  const handleShowSubMenu = () => {
    if (window.innerWidth < 1024) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  React.useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const generateAddTitle = () => {
    return (
      <Styles.AddressTitleBlock>
        {getCurrencyName()} address: <span>{id}</span>
      </Styles.AddressTitleBlock>
    );
  };

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
          separator=","
          ref={downloadRef}
          className={styles.uploadButton}
        >
          Download CSV
        </CSVLink>
      </Styles.TitleWrapper>
    );
  };

  return addresses ? (
    <Styles.Wrapper>
      <Grid container direction="column">
        <Grid item>
          <Table
            title={generateAddTitle()}
            headers={addressHeaders}
            rows={generateAddressSummary(addresses)}
            tableWrapperClassName="address-table-wrapper"
            className="address"
            blockWrapperClassName="address-wrapper"
          />
        </Grid>
        <Styles.TableWrapper item>
          <InfinityTable
            title={generateTitle()}
            sortBy={fetchParams.current.sortBy}
            sortDirection={fetchParams.current.sortDirection}
            rows={generateLatestTransactions(addresses.data, isMobile)}
            loadMoreFrom={DATA_FETCH_LIMIT}
            columns={columns}
            onBottomReach={handleFetchMoreTransactions}
            onHeaderClick={handleSort}
            className="latest-transaction-table"
            headerBackground
            rowHeight={isMobile ? 135 : 45}
            tableHeight={isMobile ? 600 : 400}
            isLoading={isLoading}
          />
        </Styles.TableWrapper>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <TransactionStyles.LoadingWrapper>
      <TransactionStyles.Loader>
        <CircularProgress size={40} />
      </TransactionStyles.Loader>
    </TransactionStyles.LoadingWrapper>
  );
};

export default AddressDetails;
