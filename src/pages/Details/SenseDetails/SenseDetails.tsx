import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertTitle from '@material-ui/lab/AlertTitle';

import * as TableStyles from '@components/Table/Table.styles';
import CopyButton from '@components/CopyButton/CopyButton';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import useSenseDetails from '@hooks/useSenseDetails';
import { getParameterByName } from '@utils/helpers/url';
import { translate } from '@utils/helpers/i18n';

import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';
import PastelData from './PastelData';
import Summary from './Summary';
import OpenNSFW from './OpenNSFW';
import RarenessScore from './RarenessScore';
import CategoryProbabilities from './CategoryProbabilities';
import PrevalenceOfSimilarImages from './PrevalenceOfSimilarImages';
import FingerprintVectorHeatmap from './FingerprintVectorHeatmap';
import RareOnTheInternetResultsGraph from './RareOnTheInternetResultsGraph';
import RareOnTheInternetAlternativeResults from './RareOnTheInternetAlternativeResults';
import SenseRawData from './SenseRawData';
import SimilarRegisteredImages, { getSimilarRegisteredImagesData } from './SimilarRegisteredImages';
import SubmittedImage from './SubmittedImage';
import Transfers from './Transfers';
import * as Styles from './SenseDetails.styles';

interface IBlockItemLayout {
  title: string;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  customTitle?: React.ReactNode;
}

export const BlockItemLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  customTitle,
}) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      {!customTitle ? <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle> : customTitle}
      <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const SenseDetails: React.FC = () => {
  const csvHeaders = [
    { key: 'rank', label: translate('pages.senseDetails.rank') },
    { key: 'image', label: translate('pages.senseDetails.thumbnail') },
    { key: 'imageHash', label: translate('pages.senseDetails.imageHash') },
    { key: 'dateTimeAdded', label: translate('pages.senseDetails.dateTimeAdded') },
    { key: 'matchType', label: translate('pages.senseDetails.matchType') },
    { key: 'finalDupeProbability', label: translate('pages.senseDetails.dupeProbability') },
    { key: 'cosineSimilarity', label: translate('pages.senseDetails.cosineSimilarity') },
    { key: 'cosineGain', label: translate('pages.senseDetails.cosineGain') },
    { key: 'hoeffdingDependency', label: translate('pages.senseDetails.hoeffdingsDependency') },
    { key: 'hoeffdingGain', label: translate('pages.senseDetails.hoeffdingGain') },
    {
      key: 'hilbertSchmidtInformationCriteria',
      label: translate('pages.senseDetails.hilbertSchmidtInformationCriteria'),
    },
    { key: 'hilbertSchmidtGain', label: translate('pages.senseDetails.hilbertSchmidtGain') },
  ];

  const downloadRef = useRef(null);
  const id = getParameterByName('hash');
  const txid = getParameterByName('txid');
  const matchType = getParameterByName('matchType');
  const { senseData: sense, isLoading } = useSenseDetails(id, txid);
  const [openRawDataModal, setOpenRawDataModal] = useState(false);

  const toggleOpenRawData = () => setOpenRawDataModal(!openRawDataModal);

  const getRawData = () => {
    if (!sense?.rawData) {
      return '';
    }
    const parseSenseData = JSON.parse(sense.rawData);
    const rawSenseDataJson = parseSenseData?.raw_dd_service_data_json
      ? JSON.parse(parseSenseData.raw_dd_service_data_json)
      : null;
    return JSON.stringify(
      JSON.stringify({
        ...parseSenseData,
        raw_dd_service_data_json: {
          ...rawSenseDataJson,
        },
      }),
    );
  };

  const getCsvData = () => {
    if (!sense?.rarenessScoresTable) {
      return [];
    }
    const results = [];
    const data = getSimilarRegisteredImagesData(sense.rarenessScoresTable);
    for (let i = 0; i < data.length; i += 1) {
      results.push({
        rank: i + 1,
        image: data[i].image,
        imageHash: data[i].imageHashOriginal,
        dateTimeAdded: data[i].dateTimeAdded,
        matchType: data[i].matchType,
        finalDupeProbability: `${(data[i].finalDupeProbability * 100).toFixed(2)}%`,
        cosineSimilarity: data[i].cosineSimilarity,
        cosineGain: data[i].cosineGain,
        hoeffdingDependency: data[i].hoeffdingDependency,
        hoeffdingGain: data[i].hoeffdingGain,
        hilbertSchmidtInformationCriteria: data[i].hilbertSchmidtInformationCriteria,
        hilbertSchmidtGain: data[i].hilbertSchmidtGain,
      });
    }
    return results;
  };

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

  return sense ? (
    <Styles.Wrapper id="senseDetails">
      <Grid container direction="column" spacing={2}>
        <TransactionStyles.TransactionDesc item className="alert-wrapper">
          <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
            <AlertTitle className="alert-title">
              {translate('pages.senseDetails.imageFileHash')}:{' '}
              <span className="image-file-hash">{sense.imageFileHash}</span>{' '}
              <span>
                (
                <Styles.RawDataWrapper>
                  <CopyButton copyText={JSON.parse(getRawData())} />
                  <Styles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
                    {translate('pages.senseDetails.viewSenseRawData')}
                  </Styles.ViewTransactionRaw>
                </Styles.RawDataWrapper>
                )
              </span>
            </AlertTitle>
            <AlertTitle className="alert-title">
              {translate('pages.senseDetails.ticketDetail')}:{' '}
              <CopyButton copyText={sense.transactionHash} />
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${sense.transactionHash}`}
                value={sense.transactionHash}
                title={sense.transactionHash.toString()}
                className="address-link"
              />
            </AlertTitle>
          </TransactionStyles.ViewTransactionRawMuiAlert>
        </TransactionStyles.TransactionDesc>
        <Styles.ImagesWrapper>
          <BlockItemLayout
            title={translate('pages.senseDetails.submittedImage')}
            className="submitted-image min-height-650"
            childrenClassName="submitted-image-content"
          >
            <SubmittedImage imageUrl={sense.imageFileCdnUrl} imageHash={sense.imageFileHash} />
          </BlockItemLayout>
          <Box className="summary-group">
            <BlockItemLayout title={translate('pages.senseDetails.summary')} className="summary">
              <Summary
                isLikelyDupe={sense?.isLikelyDupe}
                senseVersion={sense?.dupeDetectionSystemVersion}
              />
            </BlockItemLayout>
            <BlockItemLayout title={translate('pages.senseDetails.openNSFW')} className="open-nsfw">
              <OpenNSFW openNSFWScore={sense?.openNsfwScore} />
            </BlockItemLayout>
            <BlockItemLayout
              title={translate('pages.senseDetails.rarenessScore')}
              className="rareness-score"
            >
              <RarenessScore rarenessScore={sense?.rarenessScore} />
            </BlockItemLayout>
            <Box className="analytics-group">
              <BlockItemLayout
                title={translate('pages.senseDetails.prevalenceOfSimilarImages')}
                className="prevalence-of-similar-images"
              >
                <PrevalenceOfSimilarImages data={sense?.prevalenceOfSimilarImagesData} />
              </BlockItemLayout>
              <BlockItemLayout
                title={translate('pages.senseDetails.categoryProbabilities')}
                className="category-probabilities"
              >
                <CategoryProbabilities data={sense?.alternativeNsfwScores} />
              </BlockItemLayout>
            </Box>
          </Box>
          <BlockItemLayout
            title=""
            customTitle={
              <Styles.TitleWrapper>
                <TableStyles.BlockTitle>
                  {translate('pages.senseDetails.top10MostSimilarRegisteredImages')}
                </TableStyles.BlockTitle>
                <ChartStyles.CSVLinkButton
                  data={getCsvData()}
                  filename={`top_10_most_similar_images_to_image_hash__${sense.imageFileHash}.csv`}
                  headers={csvHeaders}
                  separator=","
                  ref={downloadRef}
                  className="space-nowrap"
                >
                  {translate('pages.senseDetails.exportToCSV')}
                </ChartStyles.CSVLinkButton>
              </Styles.TitleWrapper>
            }
            className="similar-registered-images"
            childrenClassName="no-spacing"
          >
            <SimilarRegisteredImages rarenessScoresTable={sense?.rarenessScoresTable} />
          </BlockItemLayout>
          <BlockItemLayout
            title={translate('pages.senseDetails.rareOnTheInternetResultsGraph')}
            className="rare-on-the-internet-results-graph"
          >
            <RareOnTheInternetResultsGraph data={sense?.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout
            title={translate('pages.senseDetails.rareOnTheInternetAlternativeResults')}
            className="rare-on-the-internet-alternative-results"
          >
            <RareOnTheInternetAlternativeResults data={sense?.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout
            title={translate('pages.senseDetails.fingerprintVectorHeatmap')}
            className="fingerprint-vector-heatmap"
          >
            <FingerprintVectorHeatmap
              data={
                sense?.imageFingerprintOfCandidateImageFile
                  ? JSON.parse(sense?.imageFingerprintOfCandidateImageFile)
                  : []
              }
            />
          </BlockItemLayout>
          <BlockItemLayout
            title={translate('pages.senseDetails.pastelData')}
            className="pastel-data"
          >
            <PastelData
              blockHash={sense?.blockHash}
              blockHeight={sense?.blockHeight}
              utcTimestampWhenRequestSubmitted={sense?.utcTimestampWhenRequestSubmitted}
              pastelIdOfSubmitter={sense?.pastelIdOfSubmitter}
              pastelIdOfRegisteringSupernode1={sense?.pastelIdOfRegisteringSupernode1}
              pastelIdOfRegisteringSupernode2={sense?.pastelIdOfRegisteringSupernode2}
              pastelIdOfRegisteringSupernode3={sense?.pastelIdOfRegisteringSupernode3}
              isPastelOpenapiRequest={sense?.isPastelOpenapiRequest}
              currentOwnerPastelID={sense?.currentOwnerPastelID}
            />
          </BlockItemLayout>
          <BlockItemLayout
            title={translate('pages.senseDetails.transfers')}
            className="pastel-data"
            childrenClassName="no-spacing"
          >
            <Transfers />
          </BlockItemLayout>
        </Styles.ImagesWrapper>
      </Grid>
      <SenseRawData rawData={getRawData()} open={openRawDataModal} toggleOpen={toggleOpenRawData} />
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {translate('pages.senseDetails.404')}
          </Typography>
        </Grid>
      </Grid>
      {matchType !== 'seedimage' ? (
        <Typography component="h2" variant="h5" align="center" gutterBottom>
          {translate('pages.senseDetails.senseNotFound')}
        </Typography>
      ) : null}
      {!txid && matchType === 'seedimage' ? (
        <Typography component="h3" variant="body1" align="center" gutterBottom>
          {translate('pages.senseDetails.seedImagesInfo')}
        </Typography>
      ) : null}
    </Styles.Wrapper>
  );
};

export default SenseDetails;
