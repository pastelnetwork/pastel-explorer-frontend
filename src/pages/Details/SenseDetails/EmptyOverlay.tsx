import { translate } from '@utils/helpers/i18n';

import * as Styles from './SenseDetails.styles';

interface IEmptyOverlay {
  isShow: boolean;
}

const EmptyOverlay: React.FC<IEmptyOverlay> = ({ isShow }) => {
  if (!isShow) {
    return null;
  }
  return (
    <Styles.EmptyOverlay>
      <Styles.EmptyData>{translate('common.noData')}</Styles.EmptyData>
    </Styles.EmptyOverlay>
  );
};

export default EmptyOverlay;
