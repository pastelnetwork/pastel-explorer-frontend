import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { translate } from '@utils/helpers/i18n';
import useNftDetails from '@hooks/useNftDetails';
import { TagDropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import { getParameterByName } from '@utils/helpers/url';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import * as PastelIdStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as FilterStyles from '@components/InfinityTable/InfinityTable.styles';
import Summary from '@pages/Details/SenseDetails/Summary';
import OpenNSFW from '@pages/Details/SenseDetails/OpenNSFW';
import RarenessScore from '@pages/Details/SenseDetails/RarenessScore';
import CategoryProbabilities from '@pages/Details/SenseDetails/CategoryProbabilities';
import PrevalenceOfSimilarImages from '@pages/Details/SenseDetails/PrevalenceOfSimilarImages';
import FingerprintVectorHeatmap from '@pages/Details/SenseDetails/FingerprintVectorHeatmap';
import RareOnTheInternetResultsGraph from '@pages/Details/SenseDetails/RareOnTheInternetResultsGraph';
import RareOnTheInternetAlternativeResults from '@pages/Details/SenseDetails/RareOnTheInternetAlternativeResults';
import SimilarRegisteredImages, {
  getSimilarRegisteredImagesData,
} from '@pages/Details/SenseDetails/SimilarRegisteredImages';
import * as SenseStyles from '@pages/Details/SenseDetails/SenseDetails.styles';
import * as ChartStyles from '@pages/HistoricalStatistics/Chart/Chart.styles';

import ItemActivity from './ItemActivity';
import MoreItems from './MoreItems';
import NftSummary from './NftSummary';
import SubmittedImage from './SubmittedImage';
import NftInfo from './NftInfo';
import Creator from './Creator';
import DdAndFingerprints from './DdAndFingerprints';
import Offers from './Offers';
import * as Styles from './NftDetails.styles';

interface IBlockItemLayout {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  titleClassName?: string;
  id?: string;
  options?: OptionsProps[];
  onDropdownChange?: (_values: string[]) => void;
  placeholder?: string;
  customTitle?: React.ReactNode;
}

const activityItems = [
  {
    name: 'pages.nftDetails.all',
    value: 'all',
  },
  {
    name: 'pages.nftDetails.registration',
    value: 'nft-reg',
  },
  {
    name: 'pages.nftDetails.activation',
    value: 'nft-act',
  },
  {
    name: 'pages.nftDetails.offer',
    value: 'offer',
  },
  {
    name: 'pages.nftDetails.accept',
    value: 'accept',
  },
  {
    name: 'pages.nftDetails.transfer',
    value: 'transfer',
  },
];

export const BlockLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  titleClassName = '',
  id = undefined,
  options,
  onDropdownChange,
  placeholder,
  customTitle,
}) => {
  if (options) {
    return (
      <TableStyles.BlockWrapper className={`mb-20 ${className}`} id={id}>
        <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
          <PastelIdStyles.BlockTitle>{title}</PastelIdStyles.BlockTitle>
          <PastelIdStyles.FilterBlock>
            <FilterStyles.FilterWrapper>
              <TagDropdown
                options={options}
                onChange={onDropdownChange}
                placeholder={placeholder}
              />
            </FilterStyles.FilterWrapper>
          </PastelIdStyles.FilterBlock>
        </PastelIdStyles.BlockWrapper>
        <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
      </TableStyles.BlockWrapper>
    );
  }

  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`} id={id}>
      {!customTitle ? (
        <TableStyles.BlockTitle className={titleClassName}>{title}</TableStyles.BlockTitle>
      ) : (
        customTitle
      )}
      <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const NftDetails = () => {
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
  const txid = getParameterByName('txid');
  const [activitiesType, setActivitiesType] = useState('');
  const { nftData, isLoading } = useNftDetails(txid);

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

  const handleDownloadFile = () => {
    if (nftData?.image) {
      const a = document.createElement('a');
      a.href = `data:image/png;base64,${nftData.image}`;
      a.download = 'Image.png';
      a.click();
    }
  };

  const getSummaryTitle = () => {
    if (!nftData?.makePubliclyAccessible) {
      return translate('pages.nftDetails.details');
    }

    return (
      <Styles.SummaryTitleWrapper>
        {translate('pages.nftDetails.details')}
        <Styles.DownloadButton type="button" onClick={handleDownloadFile} disabled={!nftData.image}>
          {translate('pages.nftDetails.downloadThisFile')}
        </Styles.DownloadButton>
      </Styles.SummaryTitleWrapper>
    );
  };

  const handleDropdownChange = (_values: string[]) => {
    setActivitiesType(_values.join());
  };

  const getCsvData = () => {
    if (!nftData?.rareness_scores_table_json_compressed_b64) {
      return [];
    }
    const results = [];
    const data = getSimilarRegisteredImagesData(nftData.rareness_scores_table_json_compressed_b64);
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

  return nftData ? (
    <Styles.Wrapper className="nft-main-content">
      <Grid container direction="column" spacing={2}>
        <Styles.MainWrapper>
          <Styles.ItemWrapper>
            <Box className="submitted-image-creator-section">
              <Box className="submitted-image">
                <SubmittedImage img={nftData.image} alt={nftData.nftTitle} />
              </Box>
            </Box>
            <Box className="nft-data">
              <NftInfo
                collectionName={nftData.collectionName}
                collectionAlias={nftData.collectionAlias}
                nftTitle={nftData.nftTitle}
                creator={nftData.author}
                username={nftData.username}
                txId={nftData.transactionHash}
                creatorName={nftData.creatorName}
                rawData={nftData.rawData}
              />
              <BlockLayout
                title={getSummaryTitle()}
                className="nft-summary"
                titleClassName={nftData.makePubliclyAccessible ? 'summary-title-block' : ''}
              >
                <NftSummary
                  nftSeriesName={nftData.nftSeriesName}
                  royalty={nftData.royalty}
                  nftKeyword={nftData.nftKeywordSet}
                  green={nftData.green}
                  video={nftData.nftCreationVideoYoutubeUrl}
                  originalFileSize={nftData.originalFileSizeInBytes}
                  nftType={nftData.nftType}
                  dataHash={nftData.dataDash}
                  fileType={nftData.fileType}
                  isPubliclyAccessible={nftData.makePubliclyAccessible}
                  totalCopies={nftData.totalCopies}
                  timestamp={nftData.transactionTime}
                  isPastelOpenapiRequest={nftData?.is_pastel_openapi_request}
                />
              </BlockLayout>
            </Box>
          </Styles.ItemWrapper>
          <Styles.ItemWrapper>
            <Box className="submitted-image-creator-section">
              <BlockLayout
                title={translate('pages.nftDetails.creator')}
                className="creator"
                childrenClassName="creator-content"
              >
                <Creator
                  writtenStatement={nftData.creatorWrittenStatement}
                  memberSince={nftData.memberSince}
                  website={nftData.creatorWebsite}
                />
              </BlockLayout>
            </Box>
            <Box className="nft-data">
              <BlockLayout
                title={translate('pages.nftDetails.offers')}
                className="item-activity"
                childrenClassName="no-spacing offers-content"
                id="offers"
              >
                <Offers />
              </BlockLayout>
            </Box>
          </Styles.ItemWrapper>
          <Styles.ItemWrapper>
            <Box className="submitted-image-creator-section">
              <BlockLayout title={translate('pages.senseDetails.summary')} className="summary">
                <Summary
                  isLikelyDupe={nftData?.is_likely_dupe}
                  senseVersion={nftData?.dupe_detection_system_version}
                />
              </BlockLayout>
            </Box>
            <Box className="nft-data">
              <BlockLayout
                title={translate('pages.nftDetails.itemActivity')}
                className="item-activity"
                childrenClassName="no-spacing item-activity-content"
                options={activityItems}
                onDropdownChange={handleDropdownChange}
                placeholder={translate('pages.nftDetails.all')}
              >
                <ItemActivity activitiesType={activitiesType} />
              </BlockLayout>
            </Box>
          </Styles.ItemWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <BlockLayout
                title={translate('pages.senseDetails.openNSFW')}
                className="open-nsfw"
                childrenClassName="open-nsfw-content"
              >
                <OpenNSFW openNSFWScore={nftData?.open_nsfw_score} />
              </BlockLayout>
            </Grid>
            <Grid item xs={12} md={3}>
              <BlockLayout
                title={translate('pages.senseDetails.rarenessScore')}
                className="rareness-score"
                childrenClassName="rareness-score-content"
              >
                <RarenessScore rarenessScore={nftData?.overall_rareness_score} />
              </BlockLayout>
            </Grid>
            <Grid item xs={12} md={3}>
              <BlockLayout
                title={translate('pages.senseDetails.prevalenceOfSimilarImages')}
                className="prevalence-of-similar-images"
                childrenClassName="prevalence-of-similar-images-content"
              >
                <PrevalenceOfSimilarImages
                  data={{
                    '25%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_25pct || 0,
                    '33%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_33pct || 0,
                    '50%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_50pct || 0,
                  }}
                />
              </BlockLayout>
            </Grid>
            <Grid item xs={12} md={3}>
              <BlockLayout
                title={translate('pages.senseDetails.categoryProbabilities')}
                className="category-probabilities"
                childrenClassName="category-probabilities-content"
              >
                <CategoryProbabilities data={nftData?.alternative_nsfw_scores} />
              </BlockLayout>
            </Grid>
          </Grid>
          <BlockLayout
            title=""
            className="similar-registered-images"
            childrenClassName="no-spacing"
            customTitle={
              <SenseStyles.TitleWrapper>
                <TableStyles.BlockTitle>
                  {translate('pages.senseDetails.top10MostSimilarRegisteredImages')}
                </TableStyles.BlockTitle>
                <ChartStyles.CSVLinkButton
                  data={getCsvData()}
                  filename="top_10_most_similar_images.csv"
                  headers={csvHeaders}
                  separator=","
                  ref={downloadRef}
                  className="space-nowrap"
                >
                  {translate('pages.senseDetails.exportToCSV')}
                </ChartStyles.CSVLinkButton>
              </SenseStyles.TitleWrapper>
            }
          >
            <SimilarRegisteredImages
              rarenessScoresTable={nftData?.rareness_scores_table_json_compressed_b64}
            />
          </BlockLayout>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BlockLayout
                title={translate('pages.senseDetails.rareOnTheInternetResultsGraph')}
                className="rare-on-the-internet-results-graph"
              >
                <RareOnTheInternetResultsGraph data={nftData?.internet_rareness} />
              </BlockLayout>
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockLayout
                title={translate('pages.senseDetails.rareOnTheInternetAlternativeResults')}
                className="rare-on-the-internet-alternative-results"
              >
                <RareOnTheInternetAlternativeResults data={nftData?.internet_rareness} />
              </BlockLayout>
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockLayout
                title={translate('pages.senseDetails.fingerprintVectorHeatmap')}
                className="fingerprint-vector-heatmap"
              >
                <FingerprintVectorHeatmap
                  data={
                    nftData?.image_fingerprint_of_candidate_image_file
                      ? JSON.parse(nftData?.image_fingerprint_of_candidate_image_file)
                      : []
                  }
                />
              </BlockLayout>
            </Grid>
          </Grid>
          <BlockLayout
            title={translate('pages.nftDetails.ddAndFingerprints')}
            className="item-activity"
          >
            <DdAndFingerprints
              ddAndFingerprintsIc={nftData.ddAndFingerprintsIc}
              ddAndFingerprintsMax={nftData.ddAndFingerprintsMax}
              ddAndFingerprintsIds={nftData.ddAndFingerprintsIds}
            />
          </BlockLayout>

          {nftData.collectionAlias ? (
            <BlockLayout
              title={translate('pages.nftDetails.moreFromThisCollection')}
              className="more-items"
              childrenClassName="relative"
            >
              <MoreItems collectionId={nftData.collectionAlias} />
            </BlockLayout>
          ) : null}
        </Styles.MainWrapper>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {translate('pages.nftDetails.404')}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {translate('pages.nftDetails.nftNotFound')}
      </Typography>
    </Styles.Wrapper>
  );
};

export default NftDetails;
