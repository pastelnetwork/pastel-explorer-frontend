import * as React from 'react';
import { Grid } from '@material-ui/core';

import { SocketContext } from '@context/socket';
import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IRichlist } from '@utils/types/IRichlists';
import { useSortData } from '@utils/hooks';
import { ISummary } from '@utils/types/ISummary';
import {
  balanceHeaders,
  distributionHeaders,
  generateBalanceTable,
  generateWealthDistributionTable,
} from './Richlist.helpers';
import * as Styles from './Richlist.styles';

const Richlist: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const { fetchData } = useFetch<{ data: Array<IRichlist> }>({
    method: 'get',
    url: `${URLS.RICHLIST_URL}`,
  });
  const fetchSummary = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });
  const [coinSupply, setCoinSupply] = React.useState(0);

  const [list, handleClickSort] = useSortData<IRichlist>({ fetchData });
  const richlist = React.useMemo<RowsProps[] | null>(
    () => (list && list.length ? generateBalanceTable(list, coinSupply) : null),
    [list, coinSupply],
  );
  const wealthDistribution = React.useMemo<RowsProps[] | null>(
    () => (list && list.length ? generateWealthDistributionTable(list) : null),
    [list],
  );

  const handleExchangeRateFetch = () => {
    fetchSummary.fetchData().then(response => {
      if (!response) return null;
      return setCoinSupply(response?.currentStats?.coinSupply || 0);
    });
  };

  React.useEffect(() => {
    handleExchangeRateFetch();
    socket.on('getUpdateBlock', () => {
      handleExchangeRateFetch();
    });
    return () => {
      socket.off('getUpdateBlock');
    };
  }, []);

  return (
    <>
      <Header title="TOP 100" />
      <Grid container spacing={6}>
        <Styles.GridWrapper item xs={12} lg={7}>
          <Table
            headers={balanceHeaders}
            rows={richlist}
            title="Current Balance"
            handleClickSort={handleClickSort}
          />
        </Styles.GridWrapper>
        <Grid item xs={12} lg={5}>
          <Table
            headers={distributionHeaders}
            rows={wealthDistribution}
            title="Wealth Distribution"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Richlist;
