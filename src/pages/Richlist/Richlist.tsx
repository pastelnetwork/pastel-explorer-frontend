import * as React from 'react';
import { Grid } from '@material-ui/core';

import Table, { RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IRichlist } from '@utils/types/IRichlists';
import { useSortData } from '@utils/hooks';
import {
  balanceHeaders,
  generateBalanceTable,
  generateWealthDistributionData,
} from './Richlist.helpers';
import { BarChart } from './BarChart';
import * as Styles from './Richlist.styles';

export type WealthDistributionProps = {
  id: string;
  data: React.ReactNode;
  title: string;
  amount: number;
};

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
  const wealthDistribution = React.useMemo<WealthDistributionProps[] | null>(
    () => (list && list.length ? generateWealthDistributionData(list) : null),
    [list],
  );
  const wealthDistributionData = wealthDistribution?.sort((a, b) => a.amount - b.amount);
  return (
    <Styles.Wrapper>
      <Grid item>
        <Styles.BlockWrapper>
          <Styles.Title>Wealth Distribution</Styles.Title>
          <Styles.ContentWrapper>
            <Styles.Info>
              <Styles.InfoItem>{wealthDistributionData?.[0]?.data}</Styles.InfoItem>
              <Styles.InfoItem>{wealthDistributionData?.[2]?.data}</Styles.InfoItem>
              <Styles.InfoItem>{wealthDistributionData?.[1]?.data}</Styles.InfoItem>
              <Styles.InfoItem>{wealthDistributionData?.[3]?.data}</Styles.InfoItem>
            </Styles.Info>
            <Styles.Chart>
              {wealthDistribution?.length ? <BarChart data={wealthDistribution} /> : null}
            </Styles.Chart>
          </Styles.ContentWrapper>
        </Styles.BlockWrapper>
      </Grid>
      <Styles.GridWrapper item>
        <Table
          headers={balanceHeaders}
          rows={richlist ? richlist.slice(0, 100) : []}
          title="Top 100"
          handleClickSort={handleClickSort}
          className="richlist"
          tableWrapperClassName="richlist-table-wrapper"
        />
      </Styles.GridWrapper>
    </Styles.Wrapper>
  );
};

export default Richlist;
