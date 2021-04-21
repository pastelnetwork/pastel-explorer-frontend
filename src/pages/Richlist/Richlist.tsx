import * as React from 'react';
import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IRank } from '@utils/types/IRank';

import {
  balanceHeaders,
  distributionHeaders,
  generateBalanceTable,
  generateWealthDistributionTable,
} from './Richlist.helpers';

const Richlist: React.FC = () => {
  const [richlist, setRichlist] = React.useState<Array<RowsProps> | null>(null);
  const [wealthDistribution, setWealthDistribution] = React.useState<Array<RowsProps> | null>(null);
  const { fetchData } = useFetch<{ data: Array<IRank> }>({
    method: 'get',
    url: `${URLS.RICHLIST_URL}`,
  });

  const transformRichlistData = (list: Array<IRank>) => {
    const balanceTable = generateBalanceTable(list);
    const wealthDistributionTable = generateWealthDistributionTable(list);

    setRichlist(balanceTable);
    setWealthDistribution(wealthDistributionTable);
  };

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response) return null;
      return transformRichlistData(response.data);
    });
  }, []);

  return (
    <>
      <Header title="TOP 100" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Table headers={balanceHeaders} rows={richlist} title="Current Balance" />
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
