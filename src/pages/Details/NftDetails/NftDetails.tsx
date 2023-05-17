import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { translate } from '@utils/helpers/i18n';
import useNftDetails from '@hooks/useNftDetails';
import { getParameterByName } from '@utils/helpers/url';
import * as TableStyles from '@components/Table/Table.styles';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import ItemActivity from './ItemActivity';
import MoreItems from './MoreItems';
import NftSummary from './NftSummary';
import SubmittedImage from './SubmittedImage';
import NftInfo from './NftInfo';
import Creator from './Creator';
import RaptorQParameters from './RaptorQParameters';
import DdAndFingerprints from './DdAndFingerprints';
import * as Styles from './NftDetails.styles';

interface IBlockItemLayout {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  titleClassName?: string;
}

export const BlockLayout: React.FC<IBlockItemLayout> = ({
  title,
  children,
  className = '',
  childrenClassName = '',
  titleClassName = '',
}) => {
  return (
    <TableStyles.BlockWrapper className={`mb-20 ${className}`}>
      <TableStyles.BlockTitle className={titleClassName}>{title}</TableStyles.BlockTitle>
      <Styles.ContentWrapper className={childrenClassName}>{children}</Styles.ContentWrapper>
    </TableStyles.BlockWrapper>
  );
};

const NftDetails = () => {
  const txid = getParameterByName('txid');
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
    if (!nftData.makePubliclyAccessible) {
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

  return nftData ? (
    <Styles.Wrapper>
      <Grid container direction="column" spacing={2}>
        <Styles.MainWrapper>
          <Box className="submitted-image-creator-section">
            <Box className="submitted-image">
              <SubmittedImage img={nftData.image} alt={nftData.nftTitle} />
            </Box>
            <Box className="nft-data hidden-desktop">
              <NftInfo
                collectionName={nftData.collectionName}
                collectionAlias={nftData.collectionAlias}
                nftTitle={nftData.nftTitle}
                creator={nftData.author}
                username={nftData.username}
                txId={nftData.transactionHash}
                creatorName={nftData.creatorName}
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
                />
              </BlockLayout>
              <BlockLayout title={translate('pages.nftDetails.creator')} className="creator">
                <Creator
                  writtenStatement={nftData.creatorWrittenStatement}
                  memberSince={nftData.memberSince}
                  website={nftData.creatorWebsite}
                />
              </BlockLayout>
            </Box>
            <BlockLayout
              title={translate('pages.nftDetails.raptorQParameters')}
              className="Raptorq-parameters"
            >
              <RaptorQParameters rqIc={nftData.rqIc} rqMax={nftData.rqMax} rqOti={nftData.rqOti} />
            </BlockLayout>
          </Box>
          <Box className="nft-data hidden-mobile">
            <NftInfo
              collectionName={nftData.collectionName}
              collectionAlias={nftData.collectionAlias}
              nftTitle={nftData.nftTitle}
              creator={nftData.author}
              username={nftData.username}
              txId={nftData.transactionHash}
              creatorName={nftData.creatorName}
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
              />
            </BlockLayout>
            <BlockLayout title={translate('pages.nftDetails.creator')} className="creator">
              <Creator
                writtenStatement={nftData.creatorWrittenStatement}
                memberSince={nftData.memberSince}
                website={nftData.creatorWebsite}
              />
            </BlockLayout>
          </Box>
          <BlockLayout
            title={translate('pages.nftDetails.itemActivity')}
            className="item-activity"
            childrenClassName="no-spacing"
          >
            <ItemActivity />
          </BlockLayout>
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
          <BlockLayout
            title={translate('pages.nftDetails.moreFromThisCollection')}
            className="more-items"
          >
            <MoreItems />
          </BlockLayout>
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
