import { useState } from 'react';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import parse from 'html-react-parser';

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
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.creatorWrittenStatement'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {getWrittenStatement() || parse(translate('common.na'))}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.memberSince'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {memberSince ? format(memberSince, 'MMM yyyy') : parse(translate('common.na'))}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.creatorWebsite'))}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {website ? (
            <ExternalLink href={website} target="_blank" value={website} />
          ) : (
            parse(translate('common.na'))
          )}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default Creator;
