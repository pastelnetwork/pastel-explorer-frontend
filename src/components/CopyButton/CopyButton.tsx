import * as React from 'react';

import { Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import * as Styles from './CopyButton.styles';

interface CopyButtonProps {
  copyText: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copyText }) => {
  const [tooltipText, setTooltipText] = React.useState('Copy to clipboard');
  const handleTextCopy = () => {
    navigator.clipboard.writeText(copyText);
    setTooltipText('Copied!');
  };

  return (
    <Tooltip
      title={tooltipText}
      arrow
      onOpen={() => setTooltipText('Copy to clipboard')}
      enterNextDelay={500}
    >
      <Styles.IconButton onClick={handleTextCopy} className="copy-icon">
        <FileCopyIcon />
      </Styles.IconButton>
    </Tooltip>
  );
};

export default CopyButton;
