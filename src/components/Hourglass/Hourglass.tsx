import { Tooltip } from '@material-ui/core';

import hourglassIcon from '@assets/icons/hourglass.svg';

import * as Styles from './Hourglass.styles';

const Hourglass: React.FC = () => (
  <Tooltip title="Transaction is not yet included in any block">
    <Styles.Image src={hourglassIcon} alt="hourglass icon" />
  </Tooltip>
);

export default Hourglass;
