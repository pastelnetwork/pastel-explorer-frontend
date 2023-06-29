import Tooltip from '@material-ui/core/Tooltip';

import { translate } from '@utils/helpers/i18n';
import Fire from '@components/SvgIcon/Fire';
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
        <Fire />
      </Styles.FireWrapper>
    </Tooltip>
  );
};

export default BurnAddressIcon;
