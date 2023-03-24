import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { CircularProgress, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { translate } from '@utils/helpers/i18n';

import { getCurrencyName } from '@utils/appInfo';
import { eChartLineStyles } from '@pages/HistoricalStatistics/Chart/styles';
import * as TableStyles from '@components/Table/Table.styles';
import { useLatestTransactions } from '@hooks/useAddressDetails';

import {
  DATA_FETCH_LIMIT,
  DATA_DEFAULT_SORT,
  generateLatestTransactions,
} from './AddressDetails.helpers';
import { ADDRESS_TRANSACTION_TIMESTAMP_KEY, columns } from './AddressDetails.columns';
import BalanceHistory from './BalanceHistory';
import DirectionChart from './DirectionChart';
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
  const { addresses, isLoading, swrSize, swrSetSize, csvData } = useLatestTransactions(
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
    const fileName = `Transaction_History__${id}__${date.getFullYear()}_${
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
          className={`${styles.uploadButton} ${!addresses ? 'disable' : ''}`}
        >
          {translate('pages.addressDetails.downloadCSV')}
        </CSVLink>
      </Styles.TitleWrapper>
    );
  };

  return (
    <Styles.Wrapper>
      <Grid container direction="column">
        <Grid item>
          <TableStyles.BlockWrapper className="address-wrapper">
            <TableStyles.Card>
              <Styles.Heading>
                <Styles.HeadingTitle>{generateAddTitle()}</Styles.HeadingTitle>
              </Styles.Heading>
              <Styles.ChartWrapper>
                <BalanceHistory id={id} />
              </Styles.ChartWrapper>
            </TableStyles.Card>
          </TableStyles.BlockWrapper>
        </Grid>
        <Styles.TableWrapper item>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={8}>
              {addresses ? (
                <InfinityTable
                  title={generateTitle()}
                  sortBy={apiParams.sortBy}
                  sortDirection={apiParams.sortDirection}
                  rows={generateLatestTransactions(addresses)}
                  columns={columns}
                  onBottomReach={handleFetchMoreTransactions}
                  onHeaderClick={handleSort}
                  className="latest-transaction-table"
                  headerBackground
                  rowHeight={isMobile ? 135 : 45}
                  tableHeight={isMobile ? 600 : 610}
                  customLoading={isLoading}
                />
              ) : null}
              {isLoading && !addresses?.length ? (
                <Box className="relative mt-15">
                  {generateTitle()}
                  <Box className="transaction-table-mask">
                    <Styles.Loader>
                      <CircularProgress size={40} />
                      <Styles.LoadingText>{translate('common.loadingData')}</Styles.LoadingText>
                    </Styles.Loader>
                  </Box>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} lg={4}>
              <DirectionChart id={id} />
            </Grid>
          </Grid>
        </Styles.TableWrapper>
      </Grid>
    </Styles.Wrapper>
  );
};

export default AddressDetails;
