import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '@components/Header/Header';
import * as TableStyles from '@components/Table/Table.styles';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { TTSenseRequests } from '@utils/types/ITransactions';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import PastelData from './PastelData';
import IPFS from './IPFS';
import Summary from './Summary';
import SubmittedImage from './SubmittedImage';
import OpenNSFW from './OpenNSFW';
import RarenessScore from './RarenessScore';
import CategoryProbabilities from './CategoryProbabilities';
import PrevalenceOfSimilarImages from './PrevalenceOfSimilarImages';
import FingerprintVectorHeatmap from './FingerprintVectorHeatmap';
import RareOnTheInternetResultsGraph from './RareOnTheInternetResultsGraph';
import RareOnTheInternetAlternativeResults from './RareOnTheInternetAlternativeResults';
// import SimilaritySubgraphPlot from './SimilaritySubgraphPlot';
import * as Styles from './SenseDetails.styles';

interface IParamTypes {
  id: string;
}

interface IBlockItemLayout {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BlockItemLayout: React.FC<IBlockItemLayout> = ({ title, children, className = '' }) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle>
      <Styles.ContentWrapper>{children}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const SenseDetails: React.FC = () => {
  const { id } = useParams<IParamTypes>();
  const [redirect, setRedirect] = useState(false);
  const [sense, setSense] = useState<TTSenseRequests | null>(null);
  const fetchSenses = useFetch<{ data: TTSenseRequests }>({
    method: 'get',
    url: `${URLS.SENSE_URL}/${id}`,
  });

  const handleTransactionFetch = () => {
    fetchSenses.fetchData().then(response => {
      if (!response?.data) {
        setRedirect(true);
      } else {
        setSense(response.data);
      }
    });
  };

  useEffect(() => {
    handleTransactionFetch();
  }, [id]);

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return sense ? (
    <Styles.Wrapper>
      <Header title="Sense Details" />
      <Grid container direction="column" spacing={2}>
        <Styles.ImagesWrapper>
          <div className="submit-image-group">
            <BlockItemLayout title="Submitted Image" className="submitted-image">
              <SubmittedImage
                imageFileHash={sense.imageFileHash}
                imageFileCdnUrl={sense.imageFileCdnUrl}
                imageTitle={sense.imageTitle}
                imageDescription={sense.imageDescription}
                isPublic={sense.isPublic}
              />
            </BlockItemLayout>
            <BlockItemLayout title="IPFS" className="ipfs hidden-tablet">
              <IPFS link={sense.ipfsLink} hash={sense.sha256HashOfSenseResults} />
            </BlockItemLayout>
          </div>
          <Box className="summary-group">
            <BlockItemLayout title="Summary" className="summary hidden-tablet">
              <Summary
                isLikelyDupe={sense.isLikelyDupe}
                senseVersion={sense.dupeDetectionSystemVersion}
              />
            </BlockItemLayout>
            <BlockItemLayout title="Open NSFW" className="open-nsfw hidden-tablet">
              <OpenNSFW openNSFWScore={sense.openNsfwScore} />
            </BlockItemLayout>
            <BlockItemLayout title="Rareness Score" className="rareness-score hidden-tablet">
              <RarenessScore rarenessScore={sense.rarenessScore} />
            </BlockItemLayout>
            <BlockItemLayout title="Pastel Data" className="pastel-data">
              <PastelData
                blockHash={sense.blockHash}
                blockHeight={sense.blockHeight}
                utcTimestampWhenRequestSubmitted={sense.utcTimestampWhenRequestSubmitted}
                pastelIdOfSubmitter={sense.pastelIdOfSubmitter}
                pastelIdOfRegisteringSupernode1={sense.pastelIdOfRegisteringSupernode1}
                pastelIdOfRegisteringSupernode2={sense.pastelIdOfRegisteringSupernode2}
                pastelIdOfRegisteringSupernode3={sense.pastelIdOfRegisteringSupernode3}
                isPastelOpenapiRequest={sense.isPastelOpenapiRequest}
                openApiSubsetIdString={sense.openApiSubsetIdString}
              />
            </BlockItemLayout>
          </Box>
          <BlockItemLayout title="Summary" className="summary hidden-desktop">
            <Summary
              isLikelyDupe={sense.isLikelyDupe}
              senseVersion={sense.dupeDetectionSystemVersion}
            />
          </BlockItemLayout>
          <BlockItemLayout title="Open NSFW" className="open-nsfw hidden-desktop">
            <OpenNSFW openNSFWScore={sense.openNsfwScore} />
          </BlockItemLayout>
          <BlockItemLayout title="Rareness Score" className="rareness-score hidden-desktop">
            <RarenessScore rarenessScore={sense.rarenessScore} />
          </BlockItemLayout>
          <BlockItemLayout title="IPFS" className="ipfs hidden-desktop">
            <IPFS link={sense.ipfsLink} hash={sense.sha256HashOfSenseResults} />
          </BlockItemLayout>
          <Box className="analytics-group">
            <BlockItemLayout
              title="Prevalence of Similar Images"
              className="prevalence-of-similar-images"
            >
              <PrevalenceOfSimilarImages data={sense.prevalenceOfSimilarImagesData} />
            </BlockItemLayout>
            <BlockItemLayout title="Category Probabilities" className="category-probabilities">
              <CategoryProbabilities data={sense.alternativeNsfwScores} />
            </BlockItemLayout>
            <BlockItemLayout
              title="Fingerprint Vector Heatmap"
              className="fingerprint-vector-heatmap hidden-tablet"
            >
              <FingerprintVectorHeatmap
                data={
                  sense.imageFingerprintOfCandidateImageFile
                    ? JSON.parse(sense.imageFingerprintOfCandidateImageFile)
                    : []
                }
              />
            </BlockItemLayout>
          </Box>
          <BlockItemLayout
            title="Rare on the Internet Results Graph"
            className="rare-on-the-internet-results-graph"
          >
            <RareOnTheInternetResultsGraph data={sense.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout
            title="Rare on the Internet, Alternative Results"
            className="rare-on-the-internet-alternative-results"
          >
            <RareOnTheInternetAlternativeResults data={sense.internetRareness} />
          </BlockItemLayout>
          <BlockItemLayout title="Similarity Subgraph Plot" className="similarity-subgraph-plot">
            {/* <SimilaritySubgraphPlot data={sense.subgraph} /> */}
          </BlockItemLayout>
          <BlockItemLayout
            title="Fingerprint Vector Heatmap"
            className="fingerprint-vector-heatmap hidden-desktop"
          >
            <FingerprintVectorHeatmap
              data={
                sense.imageFingerprintOfCandidateImageFile
                  ? JSON.parse(sense.imageFingerprintOfCandidateImageFile)
                  : []
              }
            />
          </BlockItemLayout>
        </Styles.ImagesWrapper>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <TransactionStyles.LoadingWrapper>
      <TransactionStyles.Loader>
        <CircularProgress size={40} />
      </TransactionStyles.Loader>
    </TransactionStyles.LoadingWrapper>
  );
};

export default SenseDetails;
