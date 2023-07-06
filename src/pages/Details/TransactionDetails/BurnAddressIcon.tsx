import Tooltip from '@material-ui/core/Tooltip';

import { translate } from '@utils/helpers/i18n';
import databaseIcon from '@assets/images/database.png';
import * as Styles from './TransactionDetails.styles';

interface IBurnAddressIcon {
  type: string;
}

const BurnAddressIcon: React.FC<IBurnAddressIcon> = ({ type }) => {
  if (type !== 'storage') {
    return null;
  }

  return (
    <Tooltip title={translate('pages.transactionDetails.burnAddress')}>
      <Styles.FireWrapper>
        <img src={databaseIcon} alt={translate('pages.transactionDetails.burnAddress')} />
      </Styles.FireWrapper>
    </Tooltip>
  );
};

export default BurnAddressIcon;
