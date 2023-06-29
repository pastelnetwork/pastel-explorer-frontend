import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

import { formatFullDate } from '@utils/helpers/date/date';
import { ExternalLink } from '@components/RouterLink/RouterLink';
import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './NftDetails.styles';

interface INftSummary {
  nftSeriesName: string;
  royalty: number;
  nftKeyword: string;
  green: boolean;
  video: string;
  originalFileSize: number;
  nftType: string;
  dataHash: string;
  fileType: string;
  isPubliclyAccessible: boolean;
  totalCopies: number;
  timestamp: number;
  isPastelOpenapiRequest: number;
}

const NftSummary: React.FC<INftSummary> = ({
  nftSeriesName,
  royalty,
  nftKeyword,
  video,
  originalFileSize,
  nftType,
  dataHash,
  fileType,
  isPubliclyAccessible,
  totalCopies,
  timestamp,
  isPastelOpenapiRequest,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.nftSeriesName')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftSeriesName || translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.royalty')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {royalty ? parseFloat(royalty.toFixed(2)) : 0}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.fileType')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {fileType || translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.nftKeyword')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftKeyword?.length ? nftKeyword.replaceAll(',', ', ') : translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.totalCopies')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>{totalCopies || 0}</TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.originalFileSize')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {originalFileSize ? (
                <>
                  {(originalFileSize / 1024).toFixed(2)} {translate('pages.nftDetails.kb')}
                </>
              ) : (
                translate('common.na')
              )}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.video')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent className="read-more">
              {video ? (
                <ExternalLink href={video} target="_blank" value={video} />
              ) : (
                translate('common.na')
              )}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.isPubliclyAccessible')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              <TicketStyles.ActionRegistrationTicketStatus
                className={`space-nowrap action-ticket-status ${
                  isPubliclyAccessible ? 'active' : ''
                }`}
              >
                {isPubliclyAccessible ? <DoneIcon /> : <CloseIcon />}
              </TicketStyles.ActionRegistrationTicketStatus>
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.dataHash')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent className="read-more">
              {dataHash || translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.nftType')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftType || translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.senseDetails.isPastelOpenapiRequest')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {isPastelOpenapiRequest === 1
                ? translate('pages.senseDetails.true')
                : translate('pages.senseDetails.false')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.timestamp')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {timestamp ? formatFullDate(timestamp, { dayName: false }) : translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NftSummary;
