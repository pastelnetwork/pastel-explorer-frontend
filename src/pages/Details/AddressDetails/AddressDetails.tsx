import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import parse from 'html-react-parser';

import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';
import { getCurrencyName, isPastelBurnAddress } from '@utils/appInfo';
import * as TableStyles from '@components/Table/Table.styles';
import Fire from '@components/SvgIcon/Fire';
import { useLatestTransactions, useBalanceHistory } from '@hooks/useAddressDetails';
import BurnAddressIcon from '@pages/Details/TransactionDetails/BurnAddressIcon';
import * as NftDetailsStyles from '@pages/Details/NftDetails/NftDetails.styles';
import { axiosInstance, getBaseURL } from '@utils/helpers/useFetch/useFetch';

import {
  DATA_FETCH_LIMIT,
  DATA_DEFAULT_SORT,
  generateLatestTransactions,
} from './AddressDetails.helpers';
import { ADDRESS_TRANSACTION_TIMESTAMP_KEY, columns } from './AddressDetails.columns';
import BalanceHistory from './BalanceHistory';
import DirectionChart from './DirectionChart';
import * as Styles from './AddressDetails.styles';

interface IAddressDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const AddressDetails = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  const { id } = useParams();
  const [apiParams, setParams] = useState<IAddressDataRef>({
    sortBy: ADDRESS_TRANSACTION_TIMESTAMP_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const { addresses, isLoading, swrSize, swrSetSize } = useLatestTransactions(
    id as string,
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
  );
  const swrData = useBalanceHistory(id as string);
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
    if (
      !swrData.isLoading &&
      !swrData?.data?.totalReceived &&
      !swrData?.data?.totalSent &&
      !swrData?.data?.balance?.length
    ) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [swrData]);

  useEffect(() => {
    handleShowSubMenu();
    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const isBurnAddress = isPastelBurnAddress(id as string);

  const handleDownloadFile = () => {
    const date = new Date();
    const fileName = `Transaction_History__${id}__${date.getFullYear()}_${
      date.getMonth() + 1
    }_${date.getDate()}.csv`;

    setStatus('downloading');
    const url = `${getBaseURL()}/v1/addresses/download-csv/${id}`;
    const link = document.createElement('a');
    link.target = '_blank';
    link.download = fileName;
    axiosInstance
      .get(url, { responseType: 'blob' })
      .then(res => {
        link.href = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
        link.click();
        setStatus('done');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const generateAddTitle = () => {
    return (
      <Styles.AddressTitleBlock>
        {parse(translate('pages.addressDetails.address', { currency: getCurrencyName() }))}:{' '}
        <span>{id}</span>
        <BurnAddressIcon type={swrData?.data?.type || ''} />
        {isBurnAddress ? (
          <Tooltip title={translateDropdown('pages.addressDetails.pastelBurnAddress')}>
            <Styles.FireIcon>
              <Fire />
            </Styles.FireIcon>
          </Tooltip>
        ) : null}
      </Styles.AddressTitleBlock>
    );
  };

  const generateTitle = () => {
    return (
      <Styles.TitleWrapper className={!addresses?.length ? 'large-padding' : ''}>
        <h4>{parse(translate('pages.addressDetails.latestTransactions'))}</h4>
        {addresses?.length ? (
          <NftDetailsStyles.DownloadButton
            type="button"
            onClick={handleDownloadFile}
            disabled={status === 'downloading'}
          >
            {status === 'downloading'
              ? parse(translate('pages.addressDetails.downloading'))
              : parse(translate('pages.addressDetails.downloadCSV'))}
          </NftDetailsStyles.DownloadButton>
        ) : null}
      </Styles.TitleWrapper>
    );
  };

  return (
    <Styles.Wrapper>
      <Grid container direction="column">
        <Grid item>
          <TableStyles.BlockWrapper className="address-wrapper">
            <TableStyles.StyledCard>
              <Styles.Heading>
                <Styles.HeadingTitle>{generateAddTitle()}</Styles.HeadingTitle>
              </Styles.Heading>
              <Styles.ChartWrapper>
                <BalanceHistory id={id as string} />
              </Styles.ChartWrapper>
            </TableStyles.StyledCard>
          </TableStyles.BlockWrapper>
        </Grid>
        <Styles.TableWrapper item>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={8}>
              {addresses?.length ? (
                <InfinityTable
                  title={generateTitle()}
                  sortBy={apiParams.sortBy}
                  sortDirection={apiParams.sortDirection}
                  rows={generateLatestTransactions(addresses, id as string)}
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
              {isLoading ? (
                <Box className="relative mt-15">
                  {generateTitle()}
                  <Box className="transaction-table-mask">
                    <Styles.Loader>
                      <CircularProgress size={40} />
                      <Styles.LoadingText>
                        {parse(translate('common.loadingData'))}
                      </Styles.LoadingText>
                    </Styles.Loader>
                  </Box>
                </Box>
              ) : null}
              {!isLoading && !addresses?.length ? (
                <Box className="relative mt-15">
                  {generateTitle()}
                  <Box className="transaction-table-mask" sx={{ minHeight: '590px !important' }}>
                    <Styles.NoData sx={{ minHeight: '590px' }}>
                      {parse(translate('common.noData'))}
                    </Styles.NoData>
                  </Box>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} lg={4}>
              <DirectionChart id={id as string} />
            </Grid>
          </Grid>
        </Styles.TableWrapper>
      </Grid>
    </Styles.Wrapper>
  );
};

export default AddressDetails;
