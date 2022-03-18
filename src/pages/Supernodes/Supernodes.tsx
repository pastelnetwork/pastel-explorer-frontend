import * as React from 'react';

import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { INetwork, INetworkSupernodes } from '@utils/types/INetwork';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import breakpoints from '@theme/breakpoints';
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';

import { columns, SUPERNODE_LAST_PAID_KEY } from './Supernodes.columns';
import {
  transformSupernodesData,
  DATA_FETCH_LIMIT,
  DATA_OFFSET,
  DATA_DEFAULT_SORT,
  STATUS_LIST,
} from './Supernodes.helpers';
import * as Styles from './Supernodes.styles';

interface ISupernodeData {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const Supernodes: React.FC = () => {
  const [isMobile, setMobileView] = React.useState(false);
  const [status, setStatus] = React.useState<string>(STATUS_LIST[0].value);
  const [sortData, setSortData] = React.useState<ISupernodeData>({
    sortBy: SUPERNODE_LAST_PAID_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const [supernodes, setSupernodes] = React.useState<Array<RowsProps>>([]);
  const [originalSupernodes, setOriginalSupernodes] = React.useState<Array<INetworkSupernodes>>([]);
  const { fetchData } = useFetch<INetwork>({
    method: 'get',
    url: URLS.NETWORK_URL,
  });

  const handleFetchSupernodes = (offset: number) => {
    const limit = DATA_FETCH_LIMIT;

    return fetchData({ params: { limit, offset } })
      .then(response => {
        if (response) {
          setOriginalSupernodes(response.masternodes);
        }
        return response ? transformSupernodesData(response.masternodes) : [];
      })
      .then(data => setSupernodes(data));
  };

  const handleSort = ({ sortBy, sortDirection }: ISortData) => {
    const sortedSupernodes = supernodes.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === DATA_DEFAULT_SORT ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return sortDirection === DATA_DEFAULT_SORT ? -1 : 1;
      return 0;
    });

    setSupernodes(sortedSupernodes);
    setSortData({
      sortBy,
      sortDirection,
    });
  };

  const handleShowSubMenu = () => {
    if (window.innerWidth < breakpoints.values.lg) {
      setMobileView(true);
    }
  };

  React.useEffect(() => {
    handleFetchSupernodes(DATA_OFFSET);
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setStatus(event.target.value as string);
      let newSupernodes: Array<{
        ip: string;
        port: string;
        address: JSX.Element;
        status: JSX.Element;
        country: string;
        lastPaidTime: string;
      }> = [];
      if (event.target.value !== 'all') {
        newSupernodes = transformSupernodesData(
          originalSupernodes.filter(s => s.status === event.target.value),
        );
      } else {
        newSupernodes = transformSupernodesData(originalSupernodes);
      }

      setSupernodes(newSupernodes);
    }
  };

  const generateStatusOptions = () => {
    const results: OptionsProps[] = [];
    STATUS_LIST.map((item: OptionsProps) => {
      let total = originalSupernodes.filter((i: INetworkSupernodes) => i.status === item.value)
        .length;
      if (item.value === 'all') {
        total = originalSupernodes.length;
      }
      return results.push({
        value: item.value,
        name: `${item.name} (${total})`,
      });
    });

    return results;
  };

  const getSupernodeTitle = () => (
    <Styles.TitleContainer>
      <Styles.TitleWrapper>
        <Styles.Title>Supernode List</Styles.Title>{' '}
        {supernodes.length > 0 ? (
          <Styles.SubTitle>
            Total {formatNumber(originalSupernodes.length)} Supernodes
          </Styles.SubTitle>
        ) : null}
      </Styles.TitleWrapper>
      <Styles.FilterBlock>
        <Dropdown
          value={status}
          onChange={handleChange}
          options={generateStatusOptions()}
          label="Supernode's status"
        />
      </Styles.FilterBlock>
    </Styles.TitleContainer>
  );

  return (
    <Styles.BlockWrapper>
      <Styles.GridWrapper item>
        <InfinityTable
          title={getSupernodeTitle()}
          sortBy={sortData.sortBy}
          sortDirection={sortData.sortDirection}
          onHeaderClick={handleSort}
          rows={supernodes}
          columns={columns}
          tableHeight={isMobile ? 1050 : 950}
          disableLoading
          renderAllRows
          className="supernode-table"
          headerBackground
          rowHeight={isMobile ? 270 : 45}
        />
      </Styles.GridWrapper>
    </Styles.BlockWrapper>
  );
};

export default Supernodes;
