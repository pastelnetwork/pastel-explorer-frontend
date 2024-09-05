import React from 'react';
import parse from 'html-react-parser';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Header from '@components/Header/Header';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import useCoinSupplyAndInflationStats from '@hooks/useCoinSupplyAndInflationStats';
import { getCurrencyName } from '@utils/appInfo';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as AddressDetailsStyles from '@pages/Details/AddressDetails/AddressDetails.styles';
import { CirculatingSupplyChart } from '@pages/HistoricalStatistics/CirculatingSupply';
import { TotalSupplyChart } from '@pages/HistoricalStatistics/TotalSupply';

import {
  getCoinSupplyAndInflationStatsData,
  dateRange,
  getPercent,
  periods,
} from './CoinSupplyAndInflationStats.helpers';
import * as Styles from './CoinSupplyAndInflationStats.styles';

const CoinSupplyAndInflationStats: React.FC = () => {
  const { data, isLoading } = useCoinSupplyAndInflationStats(periods);
  const coinSupplyAndInflationStatsData = getCoinSupplyAndInflationStatsData(data);

  const renderHeaderCell = (type: string, value: number, date: string) => {
    if (type === 'year') {
      return parse(
        translate('pages.coinSupplyAndInflationStats.year', {
          year: 1,
          date,
        }),
      );
    }

    if (value === 1) {
      return parse(
        translate('pages.coinSupplyAndInflationStats.month', {
          month: 1,
          date,
        }),
      );
    }

    return parse(
      translate('pages.coinSupplyAndInflationStats.months', {
        months: value,
        date,
      }),
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return null;
    }
    if (!coinSupplyAndInflationStatsData) {
      return <Styles.NoData>{parse(translate('common.noData'))}</Styles.NoData>;
    }
    let startCirculatingSupply = coinSupplyAndInflationStatsData.start.circulatingSupply;
    let startCoinSupply = coinSupplyAndInflationStatsData.start.coinSupply;

    return (
      <Styles.BoxWrapper>
        <Styles.TicketSummaryBox>
          <div className="box-title">
            {parse(translate('pages.coinSupplyAndInflationStats.start'))}
          </div>
          <div className="coin-supply-item">
            <span className="ticket-summary-title">
              {parse(translate('pages.coinSupplyAndInflationStats.coinSupply'))}:
            </span>
            <span className="ticket-summary-value">
              {formatNumber(coinSupplyAndInflationStatsData.start.coinSupply, {
                decimalsLength: 2,
              })}{' '}
              {getCurrencyName()}
            </span>
          </div>
          <div>
            <span className="ticket-summary-title">
              {parse(translate('pages.coinSupplyAndInflationStats.circulatingSupply'))}:
            </span>
            <span className="ticket-summary-value">
              {formatNumber(coinSupplyAndInflationStatsData?.start.circulatingSupply, {
                decimalsLength: 2,
              })}{' '}
              {getCurrencyName()}
            </span>
          </div>
        </Styles.TicketSummaryBox>

        {dateRange?.map((item, index) => {
          if (!coinSupplyAndInflationStatsData.circulatingSupply[index]) {
            return null;
          }
          const tmpStartCirculatingSupply = startCirculatingSupply;
          const tmpStartCoinSupply = startCoinSupply;
          startCirculatingSupply = coinSupplyAndInflationStatsData.circulatingSupply[index];
          startCoinSupply = coinSupplyAndInflationStatsData.coinSupply[index];

          return (
            <Styles.TicketSummaryBox key={`${item.type}-${item.value}`}>
              <div className="box-title">
                {renderHeaderCell(
                  item.type,
                  item.value,
                  coinSupplyAndInflationStatsData.dates[index],
                )}
              </div>
              <div className="coin-supply-item">
                <span className="ticket-summary-title">
                  {parse(translate('pages.coinSupplyAndInflationStats.coinSupply'))}:
                </span>
                <span className="ticket-summary-value">
                  {formatNumber(coinSupplyAndInflationStatsData.coinSupply[index], {
                    decimalsLength: 2,
                  })}{' '}
                  {getCurrencyName()} (
                  {getPercent(
                    tmpStartCoinSupply,
                    coinSupplyAndInflationStatsData.coinSupply[index],
                  )}
                  %)
                </span>
              </div>
              <div>
                <span className="ticket-summary-title">
                  {parse(translate('pages.coinSupplyAndInflationStats.circulatingSupply'))}:
                </span>
                <span className="ticket-summary-value">
                  {formatNumber(coinSupplyAndInflationStatsData.circulatingSupply[index], {
                    decimalsLength: 2,
                  })}{' '}
                  {getCurrencyName()} (
                  {getPercent(
                    tmpStartCirculatingSupply,
                    coinSupplyAndInflationStatsData.circulatingSupply[index],
                  )}
                  %)
                </span>
              </div>
            </Styles.TicketSummaryBox>
          );
        })}

        <Styles.TicketSummaryBox>
          <div className="box-title">
            {parse(
              translate('pages.coinSupplyAndInflationStats.today', {
                date: coinSupplyAndInflationStatsData?.today.date,
              }),
            )}
          </div>
          <div className="coin-supply-item">
            <span className="ticket-summary-title">
              {parse(translate('pages.coinSupplyAndInflationStats.coinSupply'))}:
            </span>
            <span className="ticket-summary-value">
              {formatNumber(coinSupplyAndInflationStatsData.today.coinSupply, {
                decimalsLength: 2,
              })}{' '}
              {getCurrencyName()} (
              {getPercent(startCoinSupply, coinSupplyAndInflationStatsData?.today.coinSupply)}%)
            </span>
          </div>
          <div>
            <span className="ticket-summary-title">
              {parse(translate('pages.coinSupplyAndInflationStats.circulatingSupply'))}:
            </span>
            <span className="ticket-summary-value">
              {formatNumber(coinSupplyAndInflationStatsData?.today.circulatingSupply, {
                decimalsLength: 2,
              })}{' '}
              {getCurrencyName()} (
              {getPercent(
                startCirculatingSupply,
                coinSupplyAndInflationStatsData?.today.circulatingSupply,
              )}
              %)
            </span>
          </div>
        </Styles.TicketSummaryBox>
      </Styles.BoxWrapper>
    );
  };

  return (
    <Styles.Wrapper>
      <Header
        title={translateDropdown('pages.coinSupplyAndInflationStats.pageTitle')}
        className="page-title"
      />
      <Styles.BoxSection>
        {isLoading ? (
          <Box sx={{ position: 'relative', minHeight: '130px' }}>
            <AddressDetailsStyles.Loader>
              <CircularProgress size={40} />
              <AddressDetailsStyles.LoadingText>
                {parse(translate('common.loadingData'))}
              </AddressDetailsStyles.LoadingText>
            </AddressDetailsStyles.Loader>
          </Box>
        ) : null}
        {renderContent()}
      </Styles.BoxSection>
      <Styles.ChartWrapper>
        <CirculatingSupplyChart />
        <TotalSupplyChart />
      </Styles.ChartWrapper>
    </Styles.Wrapper>
  );
};

export default CoinSupplyAndInflationStats;
