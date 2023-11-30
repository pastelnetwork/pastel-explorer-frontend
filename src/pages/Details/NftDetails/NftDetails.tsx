import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { translate, translateDropdown } from '@utils/helpers/i18n';
import useNftDetails, { TNftDetails } from '@hooks/useNftDetails';
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
import { useShowLess } from '@pages/Tickets/Tickets.helpers';
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
  showLess?: boolean;
  toggleButton?: React.ReactNode;
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
  showLess = false,
  toggleButton,
}) => {
  if (options) {
    return (
      <TableStyles.BlockWrapper className={`mb-20 ${className}`} id={id}>
        <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
          <PastelIdStyles.BlockTitle>{title}</PastelIdStyles.BlockTitle>
          <SenseStyles.SimilarImagesControl>
            <FilterStyles.FilterWrapper>
              <TagDropdown
                options={options}
                onChange={onDropdownChange}
                placeholder={placeholder}
              />
            </FilterStyles.FilterWrapper>
            {toggleButton}
          </SenseStyles.SimilarImagesControl>
        </PastelIdStyles.BlockWrapper>
        {!showLess ? (
          <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
        ) : null}
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
      {!showLess ? (
        <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
      ) : null}
    </TableStyles.BlockWrapper>
  );
};

const getSectionTitle = (
  title: string | React.ReactNode,
  toggleContent: () => void,
  showLess: boolean,
) => {
  return (
    <SenseStyles.BlockTitle className="ticket-block-title">
      <span>{title}</span>
      <SenseStyles.LinkWrapper>
        <IconButton onClick={toggleContent} className={`btn-toggle ${showLess ? 'show-less' : ''}`}>
          <ExpandMoreIcon className="toggle-icon" />
        </IconButton>
      </SenseStyles.LinkWrapper>
    </SenseStyles.BlockTitle>
  );
};

const CreatorWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.nftDetails.creator')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="creator"
      childrenClassName="creator-content"
      showLess={showLess}
    >
      <Creator
        writtenStatement={nftData.creatorWrittenStatement}
        memberSince={nftData.memberSince}
        website={nftData.creatorWebsite}
      />
    </BlockLayout>
  );
};

const SummaryWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.summary')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="summary"
      showLess={showLess}
    >
      <Summary
        isLikelyDupe={nftData?.is_likely_dupe}
        senseVersion={nftData?.dupe_detection_system_version}
      />
    </BlockLayout>
  );
};

const NftSummaryWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

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
      return parse(translate('pages.nftDetails.details'));
    }

    return (
      <SenseStyles.TitleWrapper>
        <TableStyles.BlockTitle className="similar_images">
          {parse(translate('pages.nftDetails.details'))}
        </TableStyles.BlockTitle>
        <SenseStyles.SimilarImagesControl>
          <Styles.DownloadButton
            type="button"
            onClick={handleDownloadFile}
            disabled={!nftData.image}
          >
            {parse(translate('pages.nftDetails.downloadThisFile'))}
          </Styles.DownloadButton>
          <IconButton
            onClick={() => setShowLess(!showLess)}
            className={`btn-toggle ${showLess ? 'show-less' : ''}`}
          >
            <ExpandMoreIcon className="toggle-icon" />
          </IconButton>
        </SenseStyles.SimilarImagesControl>
      </SenseStyles.TitleWrapper>
    );
  };

  return (
    <BlockLayout
      title=""
      customTitle={getSummaryTitle()}
      className="nft-summary"
      titleClassName={nftData.makePubliclyAccessible ? 'summary-title-block' : ''}
      showLess={showLess}
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
  );
};

const OffersWrapper = () => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.nftDetails.offers')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="item-activity"
      childrenClassName="no-spacing offers-content"
      id="offers"
      showLess={showLess}
    >
      <Offers />
    </BlockLayout>
  );
};

const ItemActivityWrapper = ({
  activitiesType,
  handleDropdownChange,
}: {
  activitiesType: string;
  handleDropdownChange: (_values: string[]) => void;
}) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title={parse(translate('pages.nftDetails.itemActivity'))}
      className="item-activity"
      childrenClassName="no-spacing item-activity-content"
      options={activityItems}
      onDropdownChange={handleDropdownChange}
      placeholder={translateDropdown('pages.nftDetails.all')}
      showLess={showLess}
      toggleButton={
        <SenseStyles.LinkWrapper>
          <IconButton
            onClick={() => setShowLess(!showLess)}
            className={`btn-toggle ${showLess ? 'show-less' : ''}`}
          >
            <ExpandMoreIcon className="toggle-icon" />
          </IconButton>
        </SenseStyles.LinkWrapper>
      }
    >
      <ItemActivity activitiesType={activitiesType} />
    </BlockLayout>
  );
};

const OpenNSFWWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.openNSFW')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="open-nsfw"
      childrenClassName="open-nsfw-content"
      showLess={showLess}
    >
      <OpenNSFW openNSFWScore={nftData?.open_nsfw_score} />
    </BlockLayout>
  );
};

const RarenessScoreWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rarenessScore')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rareness-score"
      childrenClassName="rareness-score-content"
      showLess={showLess}
    >
      <RarenessScore rarenessScore={nftData?.overall_rareness_score} />
    </BlockLayout>
  );
};

const PrevalenceOfSimilarImagesWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.prevalenceOfSimilarImages')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="prevalence-of-similar-images"
      childrenClassName="prevalence-of-similar-images-content"
      showLess={showLess}
    >
      <PrevalenceOfSimilarImages
        data={{
          '25%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_25pct || 0,
          '33%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_33pct || 0,
          '50%': nftData?.pct_of_top_10_most_similar_with_dupe_prob_above_50pct || 0,
        }}
      />
    </BlockLayout>
  );
};

const CategoryProbabilitiesWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.categoryProbabilities')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="category-probabilities"
      childrenClassName="category-probabilities-content"
      showLess={showLess}
    >
      <CategoryProbabilities data={nftData?.alternative_nsfw_scores} />
    </BlockLayout>
  );
};

const SimilarRegisteredImagesWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const downloadRef = useRef(null);
  const [showLess, setShowLess] = useState(false);
  const csvHeaders = [
    { key: 'rank', label: translateDropdown('pages.senseDetails.rank') },
    { key: 'image', label: translateDropdown('pages.senseDetails.thumbnail') },
    { key: 'imageHash', label: translateDropdown('pages.senseDetails.imageHash') },
    { key: 'dateTimeAdded', label: translateDropdown('pages.senseDetails.dateTimeAdded') },
    { key: 'matchType', label: translateDropdown('pages.senseDetails.matchType') },
    { key: 'finalDupeProbability', label: translateDropdown('pages.senseDetails.dupeProbability') },
    { key: 'cosineSimilarity', label: translateDropdown('pages.senseDetails.cosineSimilarity') },
    { key: 'cosineGain', label: translateDropdown('pages.senseDetails.cosineGain') },
    {
      key: 'hoeffdingDependency',
      label: translateDropdown('pages.senseDetails.hoeffdingsDependency'),
    },
    { key: 'hoeffdingGain', label: translateDropdown('pages.senseDetails.hoeffdingGain') },
    {
      key: 'hilbertSchmidtInformationCriteria',
      label: translateDropdown('pages.senseDetails.hilbertSchmidtInformationCriteria'),
    },
    {
      key: 'hilbertSchmidtGain',
      label: translateDropdown('pages.senseDetails.hilbertSchmidtGain'),
    },
  ];

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

  return (
    <BlockLayout
      title=""
      customTitle={
        <SenseStyles.TitleWrapper>
          <TableStyles.BlockTitle className="similar_images">
            {parse(translate('pages.senseDetails.top10MostSimilarRegisteredImages'))}
          </TableStyles.BlockTitle>
          <SenseStyles.SimilarImagesControl>
            <ChartStyles.CSVLinkButton
              data={getCsvData()}
              filename="top_10_most_similar_images.csv"
              headers={csvHeaders}
              separator=","
              ref={downloadRef}
              className="space-nowrap"
            >
              {parse(translate('pages.senseDetails.exportToCSV'))}
            </ChartStyles.CSVLinkButton>
            <IconButton
              onClick={() => setShowLess(!showLess)}
              className={`btn-toggle ${showLess ? 'show-less' : ''}`}
            >
              <ExpandMoreIcon className="toggle-icon" />
            </IconButton>
          </SenseStyles.SimilarImagesControl>
        </SenseStyles.TitleWrapper>
      }
      className="similar-registered-images"
      childrenClassName="no-spacing"
      showLess={showLess}
    >
      <SimilarRegisteredImages
        rarenessScoresTable={nftData?.rareness_scores_table_json_compressed_b64}
      />
    </BlockLayout>
  );
};

const RareOnTheInternetResultsGraphWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rareOnTheInternetResultsGraph')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rare-on-the-internet-results-graph"
      showLess={showLess}
    >
      <RareOnTheInternetResultsGraph data={nftData?.internet_rareness} />
    </BlockLayout>
  );
};

const RareOnTheInternetAlternativeResultsWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rareOnTheInternetAlternativeResults')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rare-on-the-internet-alternative-results"
      showLess={showLess}
    >
      <RareOnTheInternetAlternativeResults data={nftData?.internet_rareness} />
    </BlockLayout>
  );
};

const FingerprintVectorHeatmapWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.fingerprintVectorHeatmap')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="fingerprint-vector-heatmap"
      showLess={showLess}
    >
      <FingerprintVectorHeatmap
        data={
          nftData?.image_fingerprint_of_candidate_image_file
            ? JSON.parse(nftData?.image_fingerprint_of_candidate_image_file)
            : []
        }
      />
    </BlockLayout>
  );
};

const DdAndFingerprintsWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.nftDetails.ddAndFingerprints')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="item-activity"
      showLess={showLess}
    >
      <DdAndFingerprints
        ddAndFingerprintsIc={nftData.ddAndFingerprintsIc}
        ddAndFingerprintsMax={nftData.ddAndFingerprintsMax}
        ddAndFingerprintsIds={nftData.ddAndFingerprintsIds}
      />
    </BlockLayout>
  );
};

const MoreItemsWrapper = ({ nftData }: { nftData: TNftDetails }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.nftDetails.moreFromThisCollection')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="more-items"
      childrenClassName="relative"
      showLess={showLess}
    >
      <MoreItems collectionId={nftData.collectionAlias} />
    </BlockLayout>
  );
};

const NftDetails = () => {
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

  const handleDropdownChange = (_values: string[]) => {
    setActivitiesType(_values.join());
  };

  return nftData ? (
    <Styles.Wrapper className="nft-main-content">
      <Grid container direction="column" spacing={2}>
        <Styles.MainWrapper>
          <Styles.ItemWrapper className="info-section">
            <Box className="submitted-image-creator-section">
              <Box className="submitted-image">
                <SubmittedImage img={nftData.image} alt={nftData.nftTitle} />
              </Box>
              <div className="hidden-lg hide-down-1024">
                <CreatorWrapper nftData={nftData} />
                <SummaryWrapper nftData={nftData} />
              </div>
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
              <NftSummaryWrapper nftData={nftData} />
              <div className="hidden-lg hide-down-1024">
                <OffersWrapper />
                <ItemActivityWrapper
                  activitiesType={activitiesType}
                  handleDropdownChange={handleDropdownChange}
                />
              </div>
            </Box>
          </Styles.ItemWrapper>
          <div className="hide-up-1020 summary-section">
            <div>
              <CreatorWrapper nftData={nftData} />
            </div>
            <div>
              <SummaryWrapper nftData={nftData} />
            </div>
          </div>
          <Styles.ItemWrapper className="show-lg show-down-1024 offers-section">
            <Box className="submitted-image-creator-section hide-down-1024">
              <CreatorWrapper nftData={nftData} />
            </Box>
            <Box className="nft-data">
              <OffersWrapper />
            </Box>
          </Styles.ItemWrapper>
          <Styles.ItemWrapper className="show-lg show-down-1024 item-activity-section">
            <Box className="submitted-image-creator-section hide-down-1024">
              <SummaryWrapper nftData={nftData} />
            </Box>
            <Box className="nft-data">
              <ItemActivityWrapper
                activitiesType={activitiesType}
                handleDropdownChange={handleDropdownChange}
              />
            </Box>
          </Styles.ItemWrapper>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} lg={3}>
              <OpenNSFWWrapper nftData={nftData} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <RarenessScoreWrapper nftData={nftData} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <PrevalenceOfSimilarImagesWrapper nftData={nftData} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <CategoryProbabilitiesWrapper nftData={nftData} />
            </Grid>
          </Grid>
          <SimilarRegisteredImagesWrapper nftData={nftData} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <RareOnTheInternetResultsGraphWrapper nftData={nftData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RareOnTheInternetAlternativeResultsWrapper nftData={nftData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FingerprintVectorHeatmapWrapper nftData={nftData} />
            </Grid>
          </Grid>
          <DdAndFingerprintsWrapper nftData={nftData} />

          {nftData.collectionAlias ? <MoreItemsWrapper nftData={nftData} /> : null}
        </Styles.MainWrapper>
      </Grid>
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {parse(translate('pages.nftDetails.404'))}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {parse(translate('pages.nftDetails.nftNotFound'))}
      </Typography>
    </Styles.Wrapper>
  );
};

export default NftDetails;
