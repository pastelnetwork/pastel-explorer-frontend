import Summary from './Summary';
import NFTs from './NFTs';

import * as Styles from './CollectionDetails.styles';

const CollectionDetails = () => {
  return (
    <Styles.Wrapper>
      <Summary />
      <NFTs />
    </Styles.Wrapper>
  );
};

export default CollectionDetails;
