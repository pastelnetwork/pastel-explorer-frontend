import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

import { translate } from '@utils/helpers/i18n';

import * as Styles from './SenseDetails.styles';

interface ISubmittedImageProps {
  imageUrl: string;
  imageHash: string;
}

const SubmittedImage: React.FC<ISubmittedImageProps> = ({ imageUrl, imageHash }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="submitted-image-wrapper">
        {imageUrl ? (
          <button
            type="button"
            onClick={handleClickOpen}
            title={translate('pages.senseDetails.viewFull')}
          >
            <img src={imageUrl} alt={imageHash} />
          </button>
        ) : (
          <Box className="image-placeholder-wrapper">
            <BrokenImageIcon className="image-placeholder" />
            <Typography className="content">
              {translate('pages.senseDetails.noImageAvailable')}
            </Typography>
          </Box>
        )}
      </Box>
      <Styles.Dialog onClose={handleClose} open={open}>
        <Styles.FullImageWrapper>
          <img src={imageUrl} alt={imageHash} />
        </Styles.FullImageWrapper>
      </Styles.Dialog>
    </>
  );
};

export default SubmittedImage;
