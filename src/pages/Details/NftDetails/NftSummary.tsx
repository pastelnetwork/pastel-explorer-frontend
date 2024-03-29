import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import parse from 'html-react-parser';

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
              {parse(translate('pages.nftDetails.nftSeriesName'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftSeriesName || parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.royalty'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {royalty ? parseFloat(royalty.toFixed(2)) : 0}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.fileType'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {fileType || parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.nftKeyword'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftKeyword?.length
                ? nftKeyword.replaceAll(',', ', ')
                : parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.totalCopies'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>{totalCopies || 0}</TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.originalFileSize'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {originalFileSize ? (
                <>
                  {(originalFileSize / 1024).toFixed(2)} {parse(translate('pages.nftDetails.kb'))}
                </>
              ) : (
                parse(translate('common.na'))
              )}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.video'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent className="read-more">
              {video ? (
                <ExternalLink href={video} target="_blank" value={video} />
              ) : (
                parse(translate('common.na'))
              )}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.isPubliclyAccessible'))}
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
              {parse(translate('pages.nftDetails.dataHash'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent className="read-more">
              {dataHash || parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.nftType'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {nftType || parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.senseDetails.isPastelOpenapiRequest'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {isPastelOpenapiRequest === 1
                ? parse(translate('pages.senseDetails.true'))
                : parse(translate('pages.senseDetails.false'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {parse(translate('pages.nftDetails.timestamp'))}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {timestamp
                ? formatFullDate(timestamp, { dayName: false })
                : parse(translate('common.na'))}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NftSummary;
