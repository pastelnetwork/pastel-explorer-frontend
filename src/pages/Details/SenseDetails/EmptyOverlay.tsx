import { translate } from '@utils/helpers/i18n';
import parse from 'html-react-parser';

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
      <Styles.EmptyData>{parse(translate('common.noData'))}</Styles.EmptyData>
    </Styles.EmptyOverlay>
  );
};

export default EmptyOverlay;
