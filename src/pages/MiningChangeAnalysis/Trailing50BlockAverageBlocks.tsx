import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import { TRows, URL } from '@hooks/useMiningChangeAnalysis';
import Loading from '@components/Loading';
import { LineChart } from '@components/Summary/LineChart';
import { translate } from '@utils/helpers/i18n';
import * as SummaryStyles from '@components/Summary/Summary.styles';
import * as StatisticsStyles from '@pages/Statistics/Statistics.styles';
import * as NftDetailStyles from '@pages/Details/NftDetails/NftDetails.styles';
import * as CascadeAndSenseStatisticsStyles from '@pages/CascadeAndSenseStatistics/CascadeAndSenseStatistics.styles';

import { transferTrailing50BlockAverageBlocksChartData } from './MiningChangeAnalysis.helpers';
import * as Styles from './MiningChangeAnalysis.styles';

interface TTrailing50BlockAverageBlocks {
  data: TRows[] | null;
  isLoading: boolean;
}

const Trailing50BlockAverageBlocks = ({ data, isLoading }: TTrailing50BlockAverageBlocks) => {
  const renderContent = () => {
    if (isLoading) {
      return null;
    }

    if (!data?.length) {
      return (
        <NftDetailStyles.Wrapper className="no-data">
          <Typography component="h2" variant="h5" gutterBottom className="no-data-content">
            {parse(translate('common.noData'))}
          </Typography>
        </NftDetailStyles.Wrapper>
      );
    }
    const chartData = transferTrailing50BlockAverageBlocksChartData(data || []);

    return (
      <LineChart
        chartName="trailing50BlockAverageBlocks"
        dataX={chartData.dataX}
        dataY={chartData.dataY}
        offset={chartData.offset}
        disableClick
        seriesName="pages.miningChangeAnalysis.trailing50BlockAverageBlocksSinceSamePastelIdSigned"
      />
    );
  };

  return (
    <SummaryStyles.Card className="statistics-card">
      <SummaryStyles.CardContent className="header-wrapper">
        <SummaryStyles.ValueWrapper>
          <SummaryStyles.Typography variant="h6">
            {parse(
              translate(
                'pages.miningChangeAnalysis.trailing50BlockAverageBlocksSinceSamePastelIdSigned',
              ),
            )}
          </SummaryStyles.Typography>
        </SummaryStyles.ValueWrapper>
        <SummaryStyles.PercentageWrapper className="download-wrapper">
          <CascadeAndSenseStatisticsStyles.Percentage>
            <Styles.ViewTransactionRaw target="_blank" href={URL} rel="noopener">
              {parse(translate('pages.miningChangeAnalysis.downloadRawData'))}
            </Styles.ViewTransactionRaw>
          </CascadeAndSenseStatisticsStyles.Percentage>
        </SummaryStyles.PercentageWrapper>
      </SummaryStyles.CardContent>
      <StatisticsStyles.ChartSection>
        <Loading isLoading={isLoading} />
        {renderContent()}
      </StatisticsStyles.ChartSection>
    </SummaryStyles.Card>
  );
};

export default Trailing50BlockAverageBlocks;
