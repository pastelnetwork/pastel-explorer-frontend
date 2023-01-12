import { useEffect, useState, useMemo, MouseEvent } from 'react';
import { Grid } from '@material-ui/core';

import Table, { RowsProps } from '@components/Table/Table';
import { IRichlist } from '@utils/types/IRichlists';
import useCurrentStats from '@hooks/useCurrentStats';
import useRichlist from '@hooks/useRichlist';

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
  const { currentStats, isCurrentStatsLoading } = useCurrentStats();
  const { data, isLoading } = useRichlist();

  const [coinSupply, setCoinSupply] = useState(0);
  const [list, setList] = useState<IRichlist[]>([]);
  const [sort, setSort] = useState<{ sortBy: string | null; sortDirection: number }>({
    sortBy: null,
    sortDirection: 1,
  });

  const richlist = useMemo<RowsProps[] | null>(
    () => (list && list.length ? generateBalanceTable(list, coinSupply) : null),
    [list, coinSupply],
  );
  const wealthDistribution = useMemo<WealthDistributionProps[] | null>(
    () => (list && list.length ? generateWealthDistributionData(list, coinSupply) : null),
    [list, coinSupply],
  );
  const wealthDistributionData = wealthDistribution?.sort((a, b) => a.top - b.top);

  const handleClickSort = (event: MouseEvent<HTMLTableHeaderCellElement>) => {
    const { id } = event.currentTarget.dataset as { id: string };
    setSort(prev => {
      const newSort = { ...prev };
      if (!newSort.sortBy) {
        newSort.sortBy = id;
        return newSort;
      }
      if (newSort.sortBy !== id) {
        return { sortBy: id, sortDirection: 1 };
      }
      newSort.sortDirection = newSort.sortDirection === 0 ? 1 : 0;
      return newSort;
    });
  };

  useEffect(() => {
    if (data?.length) {
      setList(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (data?.length && sort && sort.sortBy) {
      const newList = [...data];
      const sortBy = sort.sortBy as keyof IRichlist;
      newList.sort((a: IRichlist, b: IRichlist) => {
        let keyA = (a[sortBy] as unknown) as string | number;
        let keyB = (b[sortBy] as unknown) as string | number;
        if (typeof keyA === 'string' && typeof keyB === 'string') {
          keyA = keyA.toUpperCase();
          keyB = keyB.toUpperCase();
        }

        if (sort.sortDirection === 1) {
          return keyA > keyB ? 1 : -1;
        }
        return keyA > keyB ? -1 : 1;
      });
      setList(newList);
    }
  }, [sort]);

  useEffect(() => {
    if (!isCurrentStatsLoading && currentStats) {
      setCoinSupply(currentStats.coinSupply);
    }
  }, [isCurrentStatsLoading, currentStats]);

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
