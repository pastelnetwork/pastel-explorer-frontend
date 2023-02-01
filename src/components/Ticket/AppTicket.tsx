import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { decode } from '@utils/helpers/ascii85';
import { IAppTicket } from '@utils/types/ITransactions';

import * as Styles from './Ticket.styles';

interface IAppTicketProps {
  appTicket: string;
}

const AppTicket: React.FC<IAppTicketProps> = ({ appTicket }) => {
  if (!appTicket) {
    return null;
  }
  const data = decode(appTicket) as IAppTicket;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Creator name:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.creator_name || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Creator website:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.creator_website || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Creator written statement:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.creator_written_statement || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>NFT creation video youtube url:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.nft_creation_video_youtube_url || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>NFT keyword set:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {data.nft_keyword_set ? data.nft_keyword_set.replaceAll(',', ', ') : 'NA'}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>NFT series name:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.nft_series_name || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>NFT title:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.nft_title || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>NFT type:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.nft_type || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Preview hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.preview_hash || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Thumbnail1 hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.thumbnail1_hash || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Thumbnail2 hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.thumbnail2_hash || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Data hash:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.data_hash || 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Total copies:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.total_copies}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Dd and fingerprints ic:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          {data.dd_and_fingerprints_ic}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Dd and fingerprints max:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.dd_and_fingerprints_max}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Dd and fingerprints ids:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {data.dd_and_fingerprints_ids ? data.dd_and_fingerprints_ids.join(', ') : 'NA'}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Rq ic:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.rq_ic}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Rq max:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.rq_max}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Rq oti:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.rq_oti}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3}>
          <Styles.TicketTitle>Rq ids:</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{data.rq_ids ? data.rq_ids.join(', ') : 'NA'}</Styles.TicketContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppTicket;
