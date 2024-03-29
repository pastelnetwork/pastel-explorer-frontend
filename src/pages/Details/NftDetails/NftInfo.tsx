import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

import Share from '@components/Share/Share';
import { formatAddress } from '@utils/helpers/format';
import { translate } from '@utils/helpers/i18n';
import RouterLink from '@components/RouterLink/RouterLink';
import CopyButton from '@components/CopyButton/CopyButton';
import * as ROUTES from '@utils/constants/routes';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as SenseStyles from '@pages/Details/SenseDetails/SenseDetails.styles';

import NftRawData from './NftRawData';

interface INftInfo {
  className?: string;
  collectionName: string;
  collectionAlias: string;
  nftTitle: string;
  creator: string;
  creatorName: string;
  username: string;
  txId: string;
  rawData?: string;
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
  rawData,
}) => {
  const [openRawDataModal, setOpenRawDataModal] = useState(false);
  const toggleOpenRawData = () => setOpenRawDataModal(!openRawDataModal);

  const getCreator = () => {
    if (creatorName) {
      return creatorName;
    }

    if (username) {
      return username;
    }

    return formatAddress(creator || '', 5, -5);
  };

  const getRawData = () => {
    if (!rawData) {
      return '';
    }
    const parseSenseData = JSON.parse(rawData);
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

  return (
    <Box className={`nft-info ${className}`}>
      <Box>
        <Typography component="h2" className="title">
          {nftTitle}
        </Typography>
        <Box className="nft-creator-info">
          <Box className="created-by">
            <Box component="span">
              <TicketStyles.TicketTitle as="span">
                {parse(translate('pages.nftDetails.by'))}:
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
                {parse(translate('pages.nftDetails.txID'))}:
              </TicketStyles.TicketTitle>{' '}
              <CopyButton copyText={txId} />
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${txId}`}
                value={formatAddress(txId || '', 5, -5)}
                title={txId}
                className="address-link"
              />
            </Box>
            <Box className="txt-id">
              <TicketStyles.TicketTitle as="span">
                {parse(translate('pages.nftDetails.collection'))}:
              </TicketStyles.TicketTitle>{' '}
              {collectionName ? (
                <RouterLink
                  route={`${ROUTES.COLLECTION_DETAILS_PAGE}/${collectionAlias}`}
                  value={collectionName}
                  title={collectionName}
                  className="address-link"
                />
              ) : (
                parse(translate('common.na'))
              )}
            </Box>
            <Box className="txt-id">
              <TicketStyles.TicketTitle as="span">
                {parse(translate('pages.nftDetails.rawData'))}:
              </TicketStyles.TicketTitle>{' '}
              <SenseStyles.RawDataWrapper>
                <CopyButton copyText={rawData ? JSON.parse(getRawData()) : ''} />
                <SenseStyles.ViewTransactionRaw type="button" onClick={toggleOpenRawData}>
                  {parse(translate('pages.nftDetails.viewNFTRawData'))}
                </SenseStyles.ViewTransactionRaw>
              </SenseStyles.RawDataWrapper>
            </Box>
          </Box>
        </Box>
      </Box>
      <Share shareUrl={document.location.href} className="share-icon" />
      <NftRawData rawData={getRawData()} open={openRawDataModal} toggleOpen={toggleOpenRawData} />
    </Box>
  );
};

export default NftInfo;
