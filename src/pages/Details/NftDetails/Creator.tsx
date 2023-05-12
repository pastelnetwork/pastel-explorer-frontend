import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format';

import { ExternalLink } from '@components/RouterLink/RouterLink';
import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './NftDetails.styles';

interface ICreator {
  writtenStatement: string;
  memberSince: number;
  website: string;
}

const Creator: React.FC<ICreator> = ({ writtenStatement, memberSince, website }) => {
  const [isViewFull, setViewFull] = useState(false);
  const getWrittenStatement = () => {
    if (!writtenStatement) {
      return null;
    }

    if (!isViewFull && writtenStatement.length > 35) {
      return (
        <>
          {writtenStatement.substring(0, 35)}...{' '}
          <button type="button" onClick={() => setViewFull(!isViewFull)} className="view-more">
            Show more
          </button>
        </>
      );
    }

    return (
      <>
        {writtenStatement}{' '}
        {writtenStatement.length > 35 ? (
          <button type="button" onClick={() => setViewFull(!isViewFull)} className="view-more">
            Show less
          </button>
        ) : null}
      </>
    );
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.creatorWrittenStatement')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {getWrittenStatement() || translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.memberSince')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {memberSince ? format(memberSince, 'MMM yyyy') : translate('common.na')}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Styles.ContentItem>
            <TicketStyles.TicketTitle>
              {translate('pages.nftDetails.creatorWebsite')}
            </TicketStyles.TicketTitle>
            <TicketStyles.TicketContent>
              {website ? (
                <ExternalLink href={website} target="_blank" value={website} />
              ) : (
                translate('common.na')
              )}
            </TicketStyles.TicketContent>
          </Styles.ContentItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Creator;
