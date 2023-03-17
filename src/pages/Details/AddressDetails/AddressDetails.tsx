import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { CircularProgress, Grid } from '@material-ui/core';

import Table from '@components/Table/Table';
import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { getCurrencyName } from '@utils/appInfo';
import { eChartLineStyles } from '@pages/HistoricalStatistics/Chart/styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import useAddressDetails from '@hooks/useAddressDetails';

import {
  addressHeaders,
  DATA_FETCH_LIMIT,
  DATA_DEFAULT_SORT,
  generateLatestTransactions,
  generateAddressSummary,
} from './AddressDetails.helpers';
import { ADDRESS_TRANSACTION_TIMESTAMP_KEY, columns } from './AddressDetails.columns';
import * as Styles from './AddressDetails.styles';

interface ParamTypes {
  id: string;
}

interface IAddressDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const AddressDetails = () => {
  const transactionHistoryCSVHeaders = [
    { label: translate('pages.addressDetails.hash'), key: 'transactionHash' },
    {
      label: translate('pages.addressDetails.amount', { currency: getCurrencyName() }),
      key: 'amount',
    },
    { label: translate('pages.addressDetails.timestamp'), key: 'timestamp' },
  ];

  const { id } = useParams<ParamTypes>();
  const [apiParams, setParams] = useState<IAddressDataRef>({
    sortBy: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const { swrData: addresses, csvData, swrSize, swrSetSize, isLoading } = useAddressDetails(
    id,
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
  );
  const styles = eChartLineStyles();
  const downloadRef = useRef(null);
  const [isMobile, setMobileView] = useState(false);

  const handleFetchMoreTransactions = (reachedTableBottom: boolean) => {
    if (!reachedTableBottom) return null;

    swrSetSize(swrSize + 1);
    setParams({ ...apiParams });
    return true;
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    swrSetSize(1);
    setParams({
      ...apiParams,
      sortBy,
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

  const generateAddTitle = () => {
    return (
      <Styles.AddressTitleBlock>
        {translate('pages.addressDetails.address', { currency: getCurrencyName() })}:{' '}
        <span>{id}</span>
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
        <h4>{translate('pages.addressDetails.latestTransactions')}</h4>
        <CSVLink
          data={csvData}
          filename={fileName}
          headers={transactionHistoryCSVHeaders}
          separator=","
          ref={downloadRef}
          className={styles.uploadButton}
        >
          {translate('pages.addressDetails.downloadCSV')}
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
            customLoading={isLoading}
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
