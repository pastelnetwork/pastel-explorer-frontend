import * as React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import DoughnutChart from '@components/Charts/DoughnutChart/DoughnutChart';
import { INetworkSupernodes } from '@utils/types/INetwork';
import useNetwork from '@hooks/useNetwork';
import { translate } from '@utils/helpers/i18n';

import {
  generateSupernodeCountriesList,
  generateChartData,
  CountryList,
} from './SupernodeStatistics.helpers';
import * as ExplorerMapStyles from '../ExplorerMap/ExplorerMap.styles';

import * as ExplorerStyles from '../Explorer.styles';

interface SupernodeStatisticsProps {
  link?: string;
}

const DISPLAY_COUNTRY_QUANTITY = 5;

const SupernodeStatistics: React.FC<SupernodeStatisticsProps> = ({ link = '' }) => {
  const { supernodeList, isLoading } = useNetwork();
  const [countryQuantity, setCountryQuantity] = React.useState(0);
  const [countryChartData, setCountryChartData] = React.useState<CountryList['chartData'] | null>(
    null,
  );

  const generateSupernodeCountries = (nodes: Array<INetworkSupernodes>) => {
    const { chartData, totalQuantity } = generateSupernodeCountriesList(
      nodes,
      DISPLAY_COUNTRY_QUANTITY,
    );

    setCountryQuantity(totalQuantity);
    setCountryChartData(chartData);
  };

  React.useEffect(() => {
    if (supernodeList.length) {
      generateSupernodeCountries(supernodeList);
    }
  }, [isLoading]);

  const totalSuperNodes = countryChartData?.quantities?.reduce((a, b) => a + b, 0);

  if (isLoading) {
    return (
      <ExplorerStyles.BlockWrapper>
        <ExplorerStyles.BlockTitle>
          {translate('pages.explorer.supernodeStatistics')}
        </ExplorerStyles.BlockTitle>
        <Skeleton animation="wave" variant="rect" height={355} />
      </ExplorerStyles.BlockWrapper>
    );
  }

  return (
    <ExplorerMapStyles.Container>
      <DoughnutChart
        title={translate('pages.explorer.supernodeStatistics')}
        innerTitle={translate('pages.explorer.total')}
        innerSubtitle={countryQuantity}
        data={
          countryChartData &&
          generateChartData(countryChartData.headers, countryChartData.quantities)
        }
        totalSuperNodes={totalSuperNodes}
        link={link}
      />
    </ExplorerMapStyles.Container>
  );
};

export default SupernodeStatistics;
