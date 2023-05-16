import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';

import IOSSwitch from '@components/IOSSwitch/IOSSwitch';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import { ICollectionDetail } from '@utils/types/ITransactions';
import { formatAddress } from '@utils/helpers/format';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import banner from '@assets/images/mockup/banner.avif';
import avatar from '@assets/images/mockup/avatar.png';

import * as Styles from './CollectionDetails.styles';

interface IBanner {
  src: string;
  alt: string;
}

interface ISummary {
  collection: ICollectionDetail | undefined;
  totalItems: number;
}

const Banner: React.FC<IBanner> = ({ src, alt }) => {
  return (
    <Box className="banner">
      <Box className="banner-box">
        <img src={src} alt={alt} />
      </Box>
    </Box>
  );
};

const Summary: React.FC<ISummary> = ({ collection, totalItems }) => {
  const getCreator = () => {
    if (collection?.username) {
      return collection.username;
    }

    return formatAddress(collection?.creator || '', 5, -5);
  };

  return (
    <Styles.SummaryWrapper>
      <Banner src={banner} alt="Banner" />
      <Styles.ContentWrapper>
        <Box className="avatar-box">
          <Box className="avatar-img">
            <img src={avatar} alt="avatar" />
          </Box>
        </Box>
        <Typography component="h2">{collection?.name}</Typography>
        <Box>
          <Box className="mt-5 creator-info">
            <Box className="create-by">
              <Typography component="span" className="bold">
                {translate('pages.collection.by')}:
              </Typography>{' '}
              <Typography component="span">
                <RouterLink
                  route={`${ROUTES.PASTEL_ID_DETAILS}/${collection?.creator}`}
                  value={getCreator()}
                  title={collection?.username || collection?.creator}
                  className="address-link"
                />
              </Typography>
            </Box>
            <Box className="txt-id">
              <Typography component="span" className="bold">
                {translate('pages.collection.txID')}:
              </Typography>{' '}
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${collection?.transactionHash}`}
                value={formatAddress(collection?.transactionHash || '', 5, -5)}
                title={collection?.transactionHash}
                className="address-link"
              />
            </Box>
          </Box>
          <ul className="info-list">
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.items')}
              </Typography>
              <Typography component="span" className="value">
                {formatNumber(totalItems)}
              </Typography>
            </li>
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.created')}
              </Typography>
              <Typography component="span" className="value">
                {collection?.transactionTime
                  ? format(collection?.transactionTime, 'dd MMM yyyy')
                  : translate('common.na')}
              </Typography>
            </li>
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.royalty')}
              </Typography>
              <Typography component="span" className="value">
                {collection?.royalty}%
              </Typography>
            </li>
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.green')}
              </Typography>
              <Typography component="span" className="value">
                <IOSSwitch checked={collection?.green} name="green" disabled />
              </Typography>
            </li>
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.itemCopy')}
              </Typography>
              <Typography component="span" className="value">
                {collection?.item_copy_count}
              </Typography>
            </li>
            <li>
              <Typography component="span" className="label">
                {translate('pages.collection.maxCollectionEntries')}
              </Typography>
              <Typography component="span" className="value">
                {collection?.max_collection_entries}
              </Typography>
            </li>
          </ul>
        </Box>
      </Styles.ContentWrapper>
    </Styles.SummaryWrapper>
  );
};

export default Summary;
