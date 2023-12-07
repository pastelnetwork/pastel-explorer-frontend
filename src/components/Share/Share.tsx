import { useState } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Tooltip from '@mui/material/Tooltip';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';

import * as Styles from './Share.styles';

interface IShare {
  shareUrl: string;
  className?: string;
}

const Share: React.FC<IShare> = ({ shareUrl, className }) => {
  const [tooltipText, setTooltipText] = useState(translate('components.share.copyLink'));

  const handleTextCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setTooltipText(translate('components.share.copied'));
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTooltipText(translate('components.share.copyLink'));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'share-popover' : undefined;

  return (
    <Styles.Wrapper>
      <Tooltip title="Share">
        <Styles.IconWrapper className={className} type="button" onClick={handleClick}>
          <ShareIcon />
        </Styles.IconWrapper>
      </Tooltip>
      <Styles.PopoverWrapper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Styles.ShareList>
          <Styles.ShareItem>
            <button type="button" className="share-button copy-button" onClick={handleTextCopy}>
              <span className="share-icon">
                <FileCopyIcon />
              </span>{' '}
              <span className="share-text">{parse(tooltipText)}</span>
            </button>
          </Styles.ShareItem>
          <Styles.ShareItem>
            <FacebookShareButton url={shareUrl} className="share-button">
              <span className="share-icon">
                <FacebookIcon />
              </span>{' '}
              <span className="share-text">
                {parse(translate('components.share.shareOnFacebook'))}
              </span>
            </FacebookShareButton>
          </Styles.ShareItem>
          <Styles.ShareItem>
            <TwitterShareButton url={shareUrl} className="share-button">
              <span className="share-icon">
                <TwitterIcon />
              </span>{' '}
              <span className="share-text">
                {parse(translate('components.share.shareOnTwitter'))}
              </span>
            </TwitterShareButton>
          </Styles.ShareItem>
        </Styles.ShareList>
      </Styles.PopoverWrapper>
    </Styles.Wrapper>
  );
};

export default Share;
