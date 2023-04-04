import { useState, useEffect, ChangeEvent } from 'react';

import ExplorerMap from '@pages/Explorer/ExplorerMap/ExplorerMap';
import SupernodeStatistics from '@pages/Explorer/SupernodeStatistics/SupernodeStatistics';
import InfinityTable, {
  RowsProps,
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { INetworkSupernodes } from '@utils/types/INetwork';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import useSupernodes from '@hooks/useSupernodes';
import { translate } from '@utils/helpers/i18n';

import { columns, SUPERNODE_LAST_PAID_KEY } from './Supernodes.columns';
import { transformSupernodesData, DATA_DEFAULT_SORT, STATUS_LIST } from './Supernodes.helpers';
import * as Styles from './Supernodes.styles';

interface ISupernodeData {
  sortBy: string;
  sortDirection: SortDirectionsType;
}

const Supernodes: React.FC = () => {
  const { masternodes, isLoading } = useSupernodes();
  const [isMobile, setMobileView] = useState(false);
  const [status, setStatus] = useState<string>(STATUS_LIST[0].value);
  const [sortData, setSortData] = useState<ISupernodeData>({
    sortBy: SUPERNODE_LAST_PAID_KEY,
    sortDirection: DATA_DEFAULT_SORT,
  });
  const [supernodes, setSupernodes] = useState<Array<RowsProps>>([]);
  const [originalSupernodes, setOriginalSupernodes] = useState<Array<INetworkSupernodes>>([]);

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
    if (window.innerWidth < 1024) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    if (masternodes?.length) {
      setSupernodes(transformSupernodesData(masternodes));
      setOriginalSupernodes(masternodes);
    }
  }, [isLoading, masternodes]);

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<{
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
        name: `${translate(item.name)} (${total})`,
      });
    });

    return results;
  };

  const getSupernodeTitle = () => (
    <Styles.TitleContainer>
      <Styles.TitleWrapper>
        <Styles.Title>{translate('pages.supernodes.supernodeList')}</Styles.Title>{' '}
        {supernodes.length > 0 ? (
          <Styles.SubTitle>
            (
            {translate('pages.supernodes.totalSupernodes', {
              total: formatNumber(originalSupernodes.length),
            })}
            )
          </Styles.SubTitle>
        ) : null}
      </Styles.TitleWrapper>
      <Styles.FilterBlock>
        <Dropdown
          value={status}
          onChange={handleChange}
          options={generateStatusOptions()}
          label={translate('pages.supernodes.supernodeStatus')}
        />
      </Styles.FilterBlock>
    </Styles.TitleContainer>
  );

  return (
    <>
      <Styles.Gird>
        <Styles.ExplorerMapColumn>
          <ExplorerMap hidePeer />
        </Styles.ExplorerMapColumn>
        <Styles.SupernodeColumn>
          <SupernodeStatistics />
        </Styles.SupernodeColumn>
      </Styles.Gird>
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
            isLoading={isLoading}
          />
        </Styles.GridWrapper>
      </Styles.BlockWrapper>
    </>
  );
};

export default Supernodes;
