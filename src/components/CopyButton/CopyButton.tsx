import * as React from 'react';

import { Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { translate } from '@utils/helpers/i18n';

import * as Styles from './CopyButton.styles';

interface CopyButtonProps {
  copyText: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copyText }) => {
  const [tooltipText, setTooltipText] = React.useState(
    translate('components.copyButton.copyToClipboard'),
  );
  const handleTextCopy = () => {
    navigator.clipboard.writeText(copyText);
    setTooltipText(translate('components.copyButton.copied'));
  };

  return (
    <Tooltip
      title={tooltipText}
      arrow
      onOpen={() => setTooltipText(translate('components.copyButton.copyToClipboard'))}
      enterNextDelay={500}
    >
      <Styles.IconButton onClick={handleTextCopy} className="copy-icon">
        <FileCopyIcon />
      </Styles.IconButton>
    </Tooltip>
  );
};

export default CopyButton;
