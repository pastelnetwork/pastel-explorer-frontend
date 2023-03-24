import { AlertTitle } from '@material-ui/lab';

import RouterLink from '@components/RouterLink/RouterLink';
import { getPastelBurnAddresses } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';

import * as TransactionDetailsStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

import * as Styles from './Burned.styles';

const Address = () => {
  const addresses = getPastelBurnAddresses();

  const generateLatestTransactions = () => {
    return addresses.map(address => (
      <li className="address-item" key={address}>
        <span>-</span>
        <RouterLink
          route={`${ROUTES.ADDRESS_DETAILS}/${address}`}
          value={address}
          textSize="large"
          title={address}
          className="transaction-hash-link"
        />
      </li>
    ));
  };

  return (
    <Styles.AddressWrapper>
      <TransactionDetailsStyles.ViewTransactionRawMuiAlert severity="info">
        <AlertTitle style={{ wordBreak: 'break-word' }}>
          {translate('pages.burned.burnedAddresses')}:
          <ul className="address-list">{generateLatestTransactions()}</ul>
        </AlertTitle>
      </TransactionDetailsStyles.ViewTransactionRawMuiAlert>
    </Styles.AddressWrapper>
  );
};

export default Address;
