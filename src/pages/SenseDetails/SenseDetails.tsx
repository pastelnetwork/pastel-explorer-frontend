// import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Header from '@components/Header/Header';
import * as TableStyles from '@components/Table/Table.styles';

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
import SimilaritySubgraphPlot from './SimilaritySubgraphPlot';
import * as Styles from './SenseDetails.styles';

// interface IParamTypes {
//   id: string;
// }

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

const ImageDetails: React.FC = () => {
  // const { id } = useParams<IParamTypes>();

  return (
    <Styles.Wrapper>
      <Header title="Sense Details" />
      <Grid container direction="column" spacing={2}>
        <Styles.ImagesWrapper>
          <BlockItemLayout title="Submitted Image" className="submitted-image">
            <SubmittedImage />
          </BlockItemLayout>
          <Box className="summary-group">
            <BlockItemLayout title="Summary" className="summary">
              <Summary />
            </BlockItemLayout>
            <BlockItemLayout title="Open NSFW" className="open-nsfw">
              <OpenNSFW />
            </BlockItemLayout>
            <BlockItemLayout title="Rareness Score" className="rareness-score">
              <RarenessScore />
            </BlockItemLayout>
          </Box>
          <BlockItemLayout title="Pastel Data" className="pastel-data">
            <PastelData />
          </BlockItemLayout>
          <Box className="analytics-group">
            <BlockItemLayout
              title="Prevalence of Similar Images"
              className="prevalence-of-similar-images"
            >
              <PrevalenceOfSimilarImages />
            </BlockItemLayout>
            <BlockItemLayout title="Category Probabilities" className="category-probabilities">
              <CategoryProbabilities />
            </BlockItemLayout>
            <BlockItemLayout title="IPFS" className="ipfs">
              <IPFS />
            </BlockItemLayout>
          </Box>
          <BlockItemLayout
            title="Rare on the Internet Results Graph"
            className="rare-on-the-internet-results-graph"
          >
            <RareOnTheInternetResultsGraph />
          </BlockItemLayout>
          <BlockItemLayout
            title="Rare on the Internet, Alternative Results"
            className="rare-on-the-internet-alternative-results"
          >
            <RareOnTheInternetAlternativeResults />
          </BlockItemLayout>
          <BlockItemLayout title="Similarity Subgraph Plot" className="similarity-subgraph-plot">
            <SimilaritySubgraphPlot />
          </BlockItemLayout>
          <BlockItemLayout
            title="Fingerprint Vector Heatmap"
            className="fingerprint-vector-heatmap"
          >
            <FingerprintVectorHeatmap />
          </BlockItemLayout>
        </Styles.ImagesWrapper>
      </Grid>
    </Styles.Wrapper>
  );
};

export default ImageDetails;
