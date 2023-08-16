import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { decode } from 'js-base64';
import parse from 'html-react-parser';

import { IAppTicket } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';

import * as Styles from './Ticket.styles';

interface IAppTicketProps {
  appTicket: string;
}

const AppTicket: React.FC<IAppTicketProps> = ({ appTicket }) => {
  if (!appTicket) {
    return null;
  }
  const decodeApiTicket = () => {
    let data = null;
    try {
      data = JSON.parse(decode(appTicket)) as IAppTicket;
    } catch {
      try {
        data = ascii85.decode(appTicket) as IAppTicket;
      } catch (error) {
        console.error(error);
      }
    }

    return data;
  };
  const data = decodeApiTicket() as IAppTicket;

  return (
    <Box>
      {data?.creator_name ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.creatorName'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.creator_name}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.creator_website ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.creatorWebsite'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.creator_website}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.creator_written_statement ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.creatorWrittenStatement'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.creator_written_statement}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.nft_creation_video_youtube_url ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.nftCreationVideoYoutubeUrl'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.nft_creation_video_youtube_url}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.nft_keyword_set.length ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.nftKeywordSet'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {data.nft_keyword_set.replaceAll(',', ', ')}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.nft_series_name ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.nftSeriesName'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.nft_series_name}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.nft_title ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.nftTitle'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.nft_title}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.nft_type ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.nftType'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.nft_type}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.preview_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.previewHash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.preview_hash}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.thumbnail1_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.thumbnail1Hash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.thumbnail1_hash}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.thumbnail2_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.thumbnail2Hash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.thumbnail2_hash}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.data_hash ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.dataHash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.data_hash}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.total_copies ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.totalCopies'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.total_copies}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.dd_and_fingerprints_ic ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.ddAndFingerprintsIc'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            {data.dd_and_fingerprints_ic}
          </Grid>
        </Grid>
      ) : null}
      {data?.dd_and_fingerprints_max ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.ddAndFingerprintsMax'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.dd_and_fingerprints_max}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.dd_and_fingerprints_ids?.length ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.ddAndFingerprintsIds'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.dd_and_fingerprints_ids.join(', ')}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.rq_ic ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.rqIc'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.rq_ic}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.rq_max ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.rqMax'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.rq_max}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.rq_oti ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.rqOti'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.rq_oti}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
      {data?.rq_ids?.length ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.apiTicket.rqIds'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{data.rq_ids.join(', ')}</Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default AppTicket;
