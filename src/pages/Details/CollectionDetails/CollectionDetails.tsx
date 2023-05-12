import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { translate } from '@utils/helpers/i18n';
import useCollectionDetails from '@hooks/useCollectionDetails';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import Summary from './Summary';
import NFTs from './NFTs';

import * as Styles from './CollectionDetails.styles';

interface IParamTypes {
  id: string;
}

const CollectionDetails = () => {
  const { id } = useParams<IParamTypes>();
  const { collection, items, isLoading } = useCollectionDetails(id);

  if (isLoading) {
    return (
      <TransactionStyles.LoadingWrapper>
        <TransactionStyles.Loader>
          <CircularProgress size={40} />
        </TransactionStyles.Loader>
      </TransactionStyles.LoadingWrapper>
    );
  }

  return collection ? (
    <Styles.Wrapper>
      <Summary collection={collection} totalItems={items?.length || 0} />
      <NFTs data={items} />
    </Styles.Wrapper>
  ) : (
    <Styles.Wrapper className="content-center-wrapper">
      <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            {translate('pages.collection.404')}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {translate('pages.collection.cascadeNotFound')}
      </Typography>
    </Styles.Wrapper>
  );
};

export default CollectionDetails;
