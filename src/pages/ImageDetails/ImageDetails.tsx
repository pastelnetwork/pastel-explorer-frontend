import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
import * as Styles from './ImageDetails.styles';

interface IParamTypes {
  id: string;
}

interface IBlockItemLayout {
  title: string;
  children: React.ReactNode;
}

const BlockItemLayout: React.FC<IBlockItemLayout> = ({ title, children }) => {
  return (
    <TableStyles.BlockWrapper className="mb-20">
      <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle>
      <Styles.ContentWrapper>{children}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const ImageDetails: React.FC = () => {
  const { id } = useParams<IParamTypes>();

  return (
    <Styles.Wrapper>
      <Header title="Image Details" />
      <Grid container direction="column" spacing={2}>
        <BlockItemLayout title="Submitted Image">
          <SubmittedImage />
        </BlockItemLayout>
        <BlockItemLayout title="Summary">
          <Summary />
        </BlockItemLayout>
        <BlockItemLayout title="Open NSFW">
          <OpenNSFW />
        </BlockItemLayout>
        <BlockItemLayout title="Rareness Score">
          <RarenessScore />
        </BlockItemLayout>
        <BlockItemLayout title="Prevalence of Similar Images">
          <PrevalenceOfSimilarImages />
        </BlockItemLayout>
        <BlockItemLayout title="IPFS">
          <IPFS />
        </BlockItemLayout>
        <BlockItemLayout title="Category Probabilities">
          <CategoryProbabilities />
        </BlockItemLayout>
        <BlockItemLayout title="Rare on the Internet Results Graph">
          {decodeURIComponent(id)}
        </BlockItemLayout>
        <BlockItemLayout title="Rare on the Internet, Alternative Results">
          {decodeURIComponent(id)}
        </BlockItemLayout>
        <BlockItemLayout title="Fingerprint Vector Heatmap">
          <FingerprintVectorHeatmap />
        </BlockItemLayout>
        <BlockItemLayout title="Similarity Subgraph Plot">{decodeURIComponent(id)}</BlockItemLayout>
        <BlockItemLayout title="Pastel Data">
          <PastelData />
        </BlockItemLayout>
      </Grid>
    </Styles.Wrapper>
  );
};

export default ImageDetails;
