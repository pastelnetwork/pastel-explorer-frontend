import { useState, useRef, ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import AlertTitle from '@mui/material/AlertTitle';
import parse from 'html-react-parser';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as TableStyles from '@components/Table/Table.styles';
import CopyButton from '@components/CopyButton/CopyButton';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import useSenseDetails from '@hooks/useSenseDetails';
import { getParameterByName } from '@utils/helpers/url';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import { TSenseRequests } from '@utils/types/ITransactions';
import { useShowLess } from '@pages/Tickets/Tickets.helpers';

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
  title?: string | ReactNode;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  customTitle?: React.ReactNode;
  showLess?: boolean;
}

export const BlockItemLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  customTitle,
  showLess = false,
}) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      {!customTitle ? <TableStyles.BlockTitle>{title}</TableStyles.BlockTitle> : customTitle}
      <Styles.ContentWrapper className={`${childrenClassName} ${showLess ? 'show-less' : ''}`}>
        {children}
      </Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const getSectionTitle = (
  title: string | React.ReactNode,
  toggleContent: () => void,
  showLess: boolean,
) => {
  return (
    <Styles.BlockTitle className="ticket-block-title">
      <span>{title}</span>
      <Styles.LinkWrapper>
        <IconButton onClick={toggleContent} className={`btn-toggle ${showLess ? 'show-less' : ''}`}>
          <ExpandMoreIcon className="toggle-icon" />
        </IconButton>
      </Styles.LinkWrapper>
    </Styles.BlockTitle>
  );
};

const SubmittedImageWrapper = ({
  imageFileCdnUrl,
  imageFileHash,
}: {
  imageFileCdnUrl: string;
  imageFileHash: string;
}) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.submittedImage')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="submitted-image min-height-650"
      childrenClassName="submitted-image-content"
      showLess={showLess}
    >
      <SubmittedImage imageUrl={imageFileCdnUrl} imageHash={imageFileHash} />
    </BlockItemLayout>
  );
};

const SummaryWrapper = ({
  isLikelyDupe,
  dupeDetectionSystemVersion,
}: {
  isLikelyDupe: number;
  dupeDetectionSystemVersion: string;
}) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.summary')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="summary"
      showLess={showLess}
    >
      <Summary isLikelyDupe={isLikelyDupe} senseVersion={dupeDetectionSystemVersion} />
    </BlockItemLayout>
  );
};

const OpenNSFWWrapper = ({ openNsfwScore }: { openNsfwScore: number }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.openNSFW')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="open-nsfw"
      showLess={showLess}
    >
      <OpenNSFW openNSFWScore={openNsfwScore} />
    </BlockItemLayout>
  );
};

const RarenessScoreWrapper = ({ rarenessScore }: { rarenessScore: number }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rarenessScore')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rareness-score"
      showLess={showLess}
    >
      <RarenessScore rarenessScore={rarenessScore} />
    </BlockItemLayout>
  );
};

const PrevalenceOfSimilarImagesWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.prevalenceOfSimilarImages')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="prevalence-of-similar-images"
      showLess={showLess}
    >
      <PrevalenceOfSimilarImages data={sense?.prevalenceOfSimilarImagesData} />
    </BlockItemLayout>
  );
};

const CategoryProbabilitiesWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.categoryProbabilities')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="category-probabilities"
      showLess={showLess}
    >
      <CategoryProbabilities data={sense?.alternativeNsfwScores} />
    </BlockItemLayout>
  );
};

const RareOnTheInternetResultsGraphWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rareOnTheInternetResultsGraph')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rare-on-the-internet-results-graph"
      showLess={showLess}
    >
      <RareOnTheInternetResultsGraph data={sense?.internetRareness} />
    </BlockItemLayout>
  );
};

const RareOnTheInternetAlternativeResultsWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.rareOnTheInternetAlternativeResults')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="rare-on-the-internet-alternative-results"
      showLess={showLess}
    >
      <RareOnTheInternetAlternativeResults data={sense?.internetRareness} />
    </BlockItemLayout>
  );
};

const FingerprintVectorHeatmapWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
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
          sense?.imageFingerprintOfCandidateImageFile
            ? JSON.parse(sense?.imageFingerprintOfCandidateImageFile)
            : []
        }
      />
    </BlockItemLayout>
  );
};

const PastelDataWrapper = ({ sense }: { sense: TSenseRequests }) => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.pastelData')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="pastel-data"
      showLess={showLess}
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
  );
};

const TransfersWrapper = () => {
  const [showLess, setShowLess] = useState(false);
  useShowLess(setShowLess);

  return (
    <BlockItemLayout
      title=""
      customTitle={getSectionTitle(
        parse(translate('pages.senseDetails.transfers')),
        () => setShowLess(!showLess),
        showLess,
      )}
      className="pastel-data"
      childrenClassName="no-spacing"
      showLess={showLess}
    >
      <Transfers />
    </BlockItemLayout>
  );
};

const SimilarRegisteredImagesWrapper = ({ sense }: { sense: TSenseRequests }) => {
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

  return (
    <BlockItemLayout
      title=""
      customTitle={
        <Styles.TitleWrapper>
          <TableStyles.BlockTitle className="similar_images">
            {parse(translate('pages.senseDetails.top10MostSimilarRegisteredImages'))}
          </TableStyles.BlockTitle>
          <Styles.SimilarImagesControl>
            <ChartStyles.CSVLinkButton
              data={getCsvData()}
              filename={`top_10_most_similar_images_to_image_hash__${sense.imageFileHash}.csv`}
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
          </Styles.SimilarImagesControl>
        </Styles.TitleWrapper>
      }
      className="similar-registered-images"
      childrenClassName="no-spacing"
      showLess={showLess}
    >
      <SimilarRegisteredImages rarenessScoresTable={sense?.rarenessScoresTable} />
    </BlockItemLayout>
  );
};

const SenseDetails: React.FC = () => {
  let id = getParameterByName('hash');
  if (id) {
    id = id.split('_')[0] as string;
  }
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
              {parse(translate('pages.senseDetails.imageFileHash'))}:{' '}
              <span className="image-file-hash">{sense.imageFileHash}</span>{' '}
              <span>
                (
                <Styles.RawDataWrapper>
                  <CopyButton copyText={JSON.parse(getRawData())} />
                  <Styles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
                    {parse(translate('pages.senseDetails.viewSenseRawData'))}
                  </Styles.ViewTransactionRaw>
                </Styles.RawDataWrapper>
                )
              </span>
            </AlertTitle>
            <AlertTitle className="alert-title">
              {parse(translate('pages.senseDetails.ticketDetail'))}:{' '}
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
          <SubmittedImageWrapper
            imageFileCdnUrl={sense.imageFileCdnUrl}
            imageFileHash={sense.imageFileHash}
          />
          <Box className="summary-group">
            <SummaryWrapper
              isLikelyDupe={sense?.isLikelyDupe}
              dupeDetectionSystemVersion={sense?.dupeDetectionSystemVersion}
            />
            <OpenNSFWWrapper openNsfwScore={sense?.openNsfwScore} />
            <RarenessScoreWrapper rarenessScore={sense?.rarenessScore} />
            <Box className="analytics-group">
              <PrevalenceOfSimilarImagesWrapper sense={sense} />
              <CategoryProbabilitiesWrapper sense={sense} />
            </Box>
          </Box>
          <SimilarRegisteredImagesWrapper sense={sense} />
          <RareOnTheInternetResultsGraphWrapper sense={sense} />
          <RareOnTheInternetAlternativeResultsWrapper sense={sense} />
          <FingerprintVectorHeatmapWrapper sense={sense} />
          <PastelDataWrapper sense={sense} />
          <TransfersWrapper />
        </Styles.ImagesWrapper>
      </Grid>
      <SenseRawData rawData={getRawData()} open={openRawDataModal} toggleOpen={toggleOpenRawData} />
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid
        sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        container
        spacing={2}
      >
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {parse(translate('pages.senseDetails.404'))}
          </Typography>
        </Grid>
      </Grid>
      {matchType !== 'seedimage' ? (
        <Typography component="h2" variant="h5" align="center" gutterBottom>
          {parse(translate('pages.senseDetails.senseNotFound'))}
        </Typography>
      ) : null}
      {!txid && matchType === 'seedimage' ? (
        <Typography component="h3" variant="body1" align="center" gutterBottom>
          {parse(translate('pages.senseDetails.seedImagesInfo'))}
        </Typography>
      ) : null}
    </Styles.Wrapper>
  );
};

export default SenseDetails;
