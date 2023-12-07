import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';
import { NFTsContent } from '@pages/Details/CollectionDetails/NFTs';
import { useCollectionRelated } from '@hooks/useNftDetails';
import { getParameterByName } from '@utils/helpers/url';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import * as Styles from './NftDetails.styles';

interface IMoreItems {
  collectionId: string;
}

const MoreItems: React.FC<IMoreItems> = ({ collectionId }) => {
  const txid = getParameterByName('txid');
  const { data, isLoading } = useCollectionRelated(txid, collectionId);

  return (
    <Styles.MoreItemsWrapper>
      {!isLoading ? (
        <div>
          {data ? (
            <>
              <NFTsContent data={data || []} />
              <Box className="footer">
                <Styles.LinkButton
                  to={`${ROUTES.COLLECTION_DETAILS_PAGE}/test-collection-jXa6Qiopiv`}
                >
                  {parse(translate('pages.nftDetails.viewCollection'))}
                </Styles.LinkButton>
              </Box>
            </>
          ) : (
            <Box>
              <Box className="no-data">{parse(translate('common.noData'))}</Box>
            </Box>
          )}
        </div>
      ) : (
        <Styles.LoadingSection>
          <Styles.LoadingWrapper>
            <TransactionStyles.Loader>
              <CircularProgress size={40} />
            </TransactionStyles.Loader>
          </Styles.LoadingWrapper>
        </Styles.LoadingSection>
      )}
    </Styles.MoreItemsWrapper>
  );
};

export default MoreItems;
