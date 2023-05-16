import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

interface INftInfo {
  className?: string;
  collectionName: string;
  collectionAlias: string;
  nftTitle: string;
  creator: string;
  creatorName: string;
  username: string;
  txId: string;
}

const NftInfo: React.FC<INftInfo> = ({
  collectionName,
  collectionAlias,
  nftTitle,
  creator,
  creatorName,
  username,
  txId,
  className = '',
}) => {
  const getCreator = () => {
    if (creatorName) {
      return creatorName;
    }

    if (username) {
      return username;
    }

    return formatAddress(creator || '', 5, -5);
  };

  return (
    <Box className={`nft-info ${className}`}>
      <Typography component="h2" className="title">
        {nftTitle}
      </Typography>
      <Box className="created-by">
        <Box component="span">
          <TicketStyles.TicketTitle as="span">
            {translate('pages.nftDetails.by')}:
          </TicketStyles.TicketTitle>{' '}
          <RouterLink
            route={`${ROUTES.PASTEL_ID_DETAILS}/${creator}`}
            value={getCreator()}
            title={username || creator}
            className="address-link"
          />
        </Box>
        <Box className="txt-id">
          <TicketStyles.TicketTitle as="span">
            {translate('pages.nftDetails.txID')}:
          </TicketStyles.TicketTitle>{' '}
          <RouterLink
            route={`${ROUTES.TRANSACTION_DETAILS}/${txId}`}
            value={formatAddress(txId || '', 5, -5)}
            title={txId}
            className="address-link"
          />
        </Box>
        <Box className="txt-id">
          <TicketStyles.TicketTitle as="span">
            {translate('pages.nftDetails.collection')}:
          </TicketStyles.TicketTitle>{' '}
          {collectionName ? (
            <RouterLink
              route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionAlias}`}
              value={collectionName}
              title={collectionName}
              className="address-link"
            />
          ) : (
            translate('common.na')
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NftInfo;
