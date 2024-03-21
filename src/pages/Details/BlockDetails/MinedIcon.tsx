import parse from 'html-react-parser';
import { Tooltip } from '@mui/material';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';

import { translate } from '@utils/helpers/i18n';

import * as Styles from './BlockDetails.styles';

interface IMinedIcon {
  type: string;
  className?: string;
}

const MinedIcon = ({ type, className }: IMinedIcon) => {
  if (type === 'cpu') {
    return (
      <Tooltip title={parse(translate('pages.blockDetails.minedByCPU'))}>
        <Styles.MinedIconWrapper className={className || ''}>
          <MemoryOutlinedIcon className="mining-icon" />
        </Styles.MinedIconWrapper>
      </Tooltip>
    );
  }
  if (type === 'pool') {
    return (
      <Tooltip title={parse(translate('pages.blockDetails.minedByPool'))}>
        <Styles.MinedIconWrapper className={className || ''}>
          <HandymanOutlinedIcon className="mining-icon" />
        </Styles.MinedIconWrapper>
      </Tooltip>
    );
  }
  return null;
};

export default MinedIcon;

MinedIcon.defaultProps = {
  className: 'ml-2',
};
