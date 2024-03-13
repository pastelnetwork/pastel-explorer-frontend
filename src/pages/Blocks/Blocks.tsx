import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

import InfinityTable, {
  SortDirectionsType,
  ISortData,
} from '@components/InfinityTable/InfinityTable';
import { blocksPeriodFilters, blocksFilters } from '@utils/constants/filter';
import { getFilterState } from '@redux/reducers/filterReducer';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useBlocks from '@hooks/useBlocks';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import { getSubHours } from '@utils/helpers/date/date';
import BlockStatistics from '@pages/Statistics/BlockStatistics/BlockStatistics';
import useBlockStatistics from '@hooks/useBlockStatistics';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import { columns, csvHeader } from './Blocks.columns';
import {
  transformTableData,
  DATA_DEFAULT_SORT,
  DATA_FETCH_LIMIT,
  getCsvData,
} from './Blocks.helpers';
import * as Styles from './Blocks.styles';

interface IBlocksDataRef {
  sortBy: string;
  sortDirection: SortDirectionsType;
  period: string;
  types: string[];
  customDateRange: {
    startDate: number;
    endDate: number | null;
  };
}

const Blocks = () => {
  const filter = useSelector(getFilterState);
  const { blockElements, blocksUnconfirmed } = useBlockStatistics();
  const [apiParams, setParams] = useState<IBlocksDataRef>({
    sortBy: 'blockId',
    sortDirection: DATA_DEFAULT_SORT,
    period: filter?.dateRange || 'all',
    types: filter?.dropdownType || [],
    customDateRange: {
      startDate: 0,
      endDate: null,
    },
  });
  const { swrData, total, swrSize, swrSetSize, isLoading } = useBlocks(
    DATA_FETCH_LIMIT,
    apiParams.sortBy,
    apiParams.sortDirection,
    apiParams.period,
    apiParams.types,
    apiParams.customDateRange,
  );
  const [isMobile, setMobileView] = useState(false);

  const handleShowSubMenu = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleFetchMoreBlocks = (reachedTableBottom: boolean) => {
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

  useEffect(() => {
    if (filter?.dateRange || filter?.dropdownType) {
      swrSetSize(1);
      let customDateRange = filter?.customDateRange || { startDate: 0, endDate: null };
      if (!filter?.customDateRange?.startDate && filter?.dateRange !== 'all') {
        customDateRange = { startDate: getSubHours(filter?.dateRange), endDate: Date.now() };
      } else {
        customDateRange = { startDate: 0, endDate: null };
      }
      setParams({
        ...apiParams,
        period: filter?.dateRange || apiParams.period || '',
        types: filter?.dropdownType || apiParams.types || '',
        customDateRange,
      });
    }
  }, [filter?.dateRange, filter?.dropdownType, filter?.customDateRange]);

  useEffect(() => {
    setParams({ ...apiParams });
    swrSetSize(1);
  }, [blockElements, blocksUnconfirmed]);

  const getMovementTransactionsTitle = () => (
    <Styles.TitleWrapper>
      <Styles.Title>{parse(translate('pages.blocks.blockList'))}</Styles.Title>{' '}
      {total > 0 ? (
        <Styles.SubTitle>
          ({parse(translate('pages.blocks.totalBlocks', { total: formatNumber(total) }))})
        </Styles.SubTitle>
      ) : null}
    </Styles.TitleWrapper>
  );

  const getCsvHeaders = () => {
    return csvHeader.map(header => ({
      ...header,
      label: translateDropdown(header.label as string),
    }));
  };

  const renderDownloadCsv = () => {
    return (
      <div className="csv-wrapper">
        <ChartStyles.CSVLinkButton
          data={getCsvData(swrData || [])}
          filename="Block-List.csv"
          headers={getCsvHeaders()}
          separator=","
          className={isLoading ? 'disable-download-csv' : ''}
        >
          {parse(translate('pages.historicalStatistics.downloadCSV'))}
        </ChartStyles.CSVLinkButton>
      </div>
    );
  };

  return (
    <Styles.TableContainer item>
      <Styles.BlockStatistics>
        <BlockStatistics blockElements={blockElements} blocksUnconfirmed={blocksUnconfirmed} />
      </Styles.BlockStatistics>
      <InfinityTable
        sortBy={apiParams.sortBy}
        sortDirection={apiParams.sortDirection}
        rows={swrData ? transformTableData(swrData) : []}
        filters={blocksPeriodFilters}
        dropdownFilters={blocksFilters}
        dropdownLabel={translateDropdown('pages.blocks.ticketType')}
        title={getMovementTransactionsTitle()}
        columns={columns}
        tableHeight={isMobile ? 750 : 650}
        onBottomReach={handleFetchMoreBlocks}
        onHeaderClick={handleSort}
        className="block-list-table"
        headerBackground
        rowHeight={isMobile ? 200 : 45}
        customLoading={isLoading}
        showDateTimePicker
        dateRange={filter?.customDateRange}
        customFilter={renderDownloadCsv()}
      />
    </Styles.TableContainer>
  );
};

export default Blocks;
