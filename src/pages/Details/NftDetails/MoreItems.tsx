import Box from '@material-ui/core/Box';

import { translate } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';
import { NFTsContent } from '@pages/Details/CollectionDetails/NFTs';
import { moreItemsMockup } from '@pages/Details/CollectionDetails/mockup';

import * as Styles from './NftDetails.styles';

const MoreItems = () => {
  return (
    <Styles.MoreItemsWrapper>
      <NFTsContent data={moreItemsMockup} />
      <Box className="footer">
        <Styles.LinkButton to={`${ROUTES.COLLECTION_DETAILS_PAGE}/test-collection-jXa6Qiopiv`}>
          {translate('pages.nftDetails.viewCollection')}
        </Styles.LinkButton>
      </Box>
    </Styles.MoreItemsWrapper>
  );
};

export default MoreItems;
