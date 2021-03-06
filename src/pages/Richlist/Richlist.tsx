import * as React from 'react';
import { Grid } from '@material-ui/core';

import Table, { RowsProps } from '@components/Table/Table';
import { SocketContext } from '@context/socket';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { IRichlist } from '@utils/types/IRichlists';
import { useSortData } from '@utils/hooks';
import { ISummary } from '@utils/types/ISummary';
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
  top: number;
};

const Richlist: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const { fetchData, isLoading } = useFetch<{ data: Array<IRichlist> }>({
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
  const wealthDistribution = React.useMemo<WealthDistributionProps[] | null>(
    () => (list && list.length ? generateWealthDistributionData(list) : null),
    [list],
  );
  const wealthDistributionData = wealthDistribution?.sort((a, b) => a.top - b.top);

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
              {wealthDistribution?.length ? (
                <BarChart data={wealthDistribution?.sort((a, b) => b.top - a.top)} />
              ) : null}
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
          isLoading={isLoading}
        />
      </Styles.GridWrapper>
    </Styles.Wrapper>
  );
};

export default Richlist;
