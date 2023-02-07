import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Header from '@components/Header/Header';
import * as TableStyles from '@components/Table/Table.styles';
import CopyButton from '@components/CopyButton/CopyButton';
import { TSenseRequests } from '@utils/types/ITransactions';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import useSenseDetails from '@hooks/useSenseDetails';

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
import * as Styles from './SenseDetails.styles';

interface IParamTypes {
  id: string;
}

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

const csvHeaders = [
  { key: 'rank', label: 'Rank' },
  { key: 'image', label: 'Thumbnail' },
  { key: 'imageHash', label: 'Image Hash' },
  { key: 'dateTimeAdded', label: 'Date-Time Added' },
  { key: 'matchType', label: 'Match Type' },
  { key: 'finalDupeProbability', label: 'Dupe Probability' },
  { key: 'cosineSimilarity', label: 'Cosine Similarity' },
  { key: 'cosineGain', label: 'Cosine Gain' },
  { key: 'hoeffdingDependency', label: 'Hoeffding’s Dependency' },
  { key: 'hoeffdingGain', label: 'Hoeffding Gain' },
  { key: 'hilbertSchmidtInformationCriteria', label: 'Hilbert Schmidt Information Criteria' },
  { key: 'hilbertSchmidtGain', label: 'Hilbert Schmidt Gain' },
];

const SenseDetails: React.FC = () => {
  const downloadRef = useRef(null);
  const { id } = useParams<IParamTypes>();
  const { senseData, isLoading } = useSenseDetails(id);
  const [sense, setSense] = useState<TSenseRequests | null>(null);
  const [openRawDataModal, setOpenRawDataModal] = useState(false);

  useEffect(() => {
    if (senseData) {
      setSense(senseData);
    } else {
      setSense(null);
    }
  }, [senseData, isLoading]);

  const toggleOpenRawData = () => setOpenRawDataModal(!openRawDataModal);

  const getRawData = () => {
    if (!sense?.rawData) {
      return '';
    }
    const parseSenseData = JSON.parse(sense.rawData);
    return JSON.stringify(
      JSON.stringify({
        ...parseSenseData,
        raw_sense_data_json: JSON.parse(parseSenseData.raw_sense_data_json),
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
      <Header title="Sense Details" />
      <Grid container direction="column" spacing={2}>
        <TransactionStyles.TransactionDesc item className="alert-wrapper">
          <TransactionStyles.ViewTransactionRawMuiAlert severity="info">
            <AlertTitle className="alert-title">
              Image File Hash: <span className="image-file-hash">{sense.imageFileHash}</span>{' '}
              <span>
                (
                <Styles.RawDataWrapper>
                  <CopyButton copyText={JSON.parse(getRawData())} />
                  <Styles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
                    View Sense Raw Data
                  </Styles.ViewTransactionRaw>
                </Styles.RawDataWrapper>
                )
              </span>
            </AlertTitle>
            <AlertTitle className="alert-title">
              Ticket Detail:{' '}
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
            title="Pastel Data"
            className={`pastel-data ${!sense?.pastelIdOfSubmitter ? 'min-height-725' : ''}`}
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
              openApiSubsetIdString={sense?.openApiSubsetIdString}
            />
          </BlockItemLayout>
          <Box className="summary-group">
            <BlockItemLayout title="Summary" className="summary">
              <Summary
                isLikelyDupe={sense?.isLikelyDupe}
                senseVersion={sense?.dupeDetectionSystemVersion}
              />
            </BlockItemLayout>
            <BlockItemLayout title="Open NSFW" className="open-nsfw">
              <OpenNSFW openNSFWScore={sense?.openNsfwScore} />
            </BlockItemLayout>
            <BlockItemLayout title="Rareness Score" className="rareness-score">
              <RarenessScore rarenessScore={sense?.rarenessScore} />
            </BlockItemLayout>
            <Box className="analytics-group">
              <BlockItemLayout
                title="Prevalence of Similar Images"
                className="prevalence-of-similar-images"
              >
                <PrevalenceOfSimilarImages data={sense?.prevalenceOfSimilarImagesData} />
              </BlockItemLayout>
              <BlockItemLayout title="Category Probabilities" className="category-probabilities">
                <CategoryProbabilities data={sense?.alternativeNsfwScores} />
              </BlockItemLayout>
            </Box>
          </Box>
          <BlockItemLayout
            title=""
            customTitle={
              <Styles.TitleWrapper>
                <TableStyles.BlockTitle>
                  Top-10 Most Similar Registered Images on Pastel When Submitted
                </TableStyles.BlockTitle>
                <ChartStyles.CSVLinkButton
                  data={getCsvData()}
                  filename={`top_10_most_similar_images_to_image_hash__${sense.imageFileHash}.csv`}
                  headers={csvHeaders}
                  separator=","
                  ref={downloadRef}
                >
                  Export to CSV
                </ChartStyles.CSVLinkButton>
              </Styles.TitleWrapper>
            }
            className="similar-registered-images"
            childrenClassName="no-spacing"
          >
            <SimilarRegisteredImages rarenessScoresTable={sense?.rarenessScoresTable} />
          </BlockItemLayout>
          <BlockItemLayout
            title="Rare on the Internet Results Graph"
            className="rare-on-the-internet-results-graph"
          >
            <RareOnTheInternetResultsGraph data={sense?.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout
            title="Rare on the Internet, Alternative Results"
            className="rare-on-the-internet-alternative-results"
          >
            <RareOnTheInternetAlternativeResults data={sense?.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout
            title="Fingerprint Vector Heatmap"
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
        </Styles.ImagesWrapper>
      </Grid>
      <SenseRawData rawData={getRawData()} open={openRawDataModal} toggleOpen={toggleOpenRawData} />
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper>
      <Header title="Sense Details" />
      <Grid container direction="column" spacing={2}>
        Sense not found
      </Grid>
    </Styles.Wrapper>
  );
};

export default SenseDetails;
