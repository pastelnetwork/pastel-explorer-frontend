import * as React from 'react';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IRichlist } from '@utils/types/IRichlists';
import { useSortData } from '@utils/hooks';
import {
  balanceHeaders,
  distributionHeaders,
  generateBalanceTable,
  generateWealthDistributionTable,
} from './Richlist.helpers';

const Richlist: React.FC = () => {
  const { fetchData } = useFetch<{ data: Array<IRichlist> }>({
    method: 'get',
    url: `${URLS.RICHLIST_URL}`,
  });
  const [list, handleClickSort] = useSortData<IRichlist>({ fetchData });
  const richlist = React.useMemo<RowsProps[] | null>(
    () => (list && list.length ? generateBalanceTable(list) : null),
    [list],
  );
  const wealthDistribution = React.useMemo<RowsProps[] | null>(
    () => (list && list.length ? generateWealthDistributionTable(list) : null),
    [list],
  );

  return (
    <>
      <Header title="TOP 100" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Table
            headers={balanceHeaders}
            rows={richlist}
            title="Current Balance"
            handleClickSort={handleClickSort}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
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
