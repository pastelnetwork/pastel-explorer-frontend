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

import { IAddress } from '@utils/types/IAddress';
import { getCurrencyName } from '@utils/appInfo';
import { formattedDate } from '@utils/helpers/date/date';
import { eChartLineStyles } from '@pages/HistoricalStatistics/Chart/styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import useAddressDetails from '@hooks/useAddressDetails';

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
  const { id } = useParams<ParamTypes>();
  const [apiParams, setParams] = useState<IAddressDataRef>({
    offset: DATA_OFFSET,
    sortBy: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const { swrData, isLoading } = useAddressDetails(
    id,
    apiParams.offset,
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
  );
  const [size, setSize] = useState<number>(1);
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [isMobile, setMobileView] = useState(false);

  const [addresses, setAddresses] = useState<IAddress>(DEFAULT_ADDRESS_DATA);
  const [csvData, setCsvData] = useState<string | Data>('');

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    setSize(size + 1);
    setParams({ ...apiParams, offset: apiParams.offset + DATA_FETCH_LIMIT });
    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    setSize(1);
    setParams({
      ...apiParams,
      sortBy,
      offset: DATA_OFFSET,
      sortDirection,
    });
  };

  const handleShowSubMenu = () => {
    if (window.innerWidth < 1024) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

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

  useEffect(() => {
    if (!isLoading && swrData) {
      if (size > 1) {
        setAddresses(prevState => ({
          ...swrData,
          data: [...prevState.data, ...swrData.data],
        }));
      } else {
        setAddresses(swrData);
      }
    }
  }, [isLoading, size, apiParams]);

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
            sortBy={apiParams.sortBy}
            sortDirection={apiParams.sortDirection}
            rows={generateLatestTransactions(addresses.data, isMobile)}
            columns={columns}
            onBottomReach={handleFetchMoreTransactions}
            onHeaderClick={handleSort}
            className="latest-transaction-table"
            headerBackground
            rowHeight={isMobile ? 135 : 45}
            tableHeight={isMobile ? 600 : 400}
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
