import { useState } from 'react';
import Box from '@material-ui/core/Box';

import { translateDropdown } from '@utils/helpers/i18n';

import imagePlaceholder from '@assets/images/no-image-placeholder.svg';
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
            title={translateDropdown('pages.senseDetails.viewFull')}
          >
            <img src={`data:image/jpeg;base64,${imageUrl}`} alt={imageHash} />
          </button>
        ) : (
          <Box className="image-placeholder-wrapper">
            <img src={imagePlaceholder} alt={imageHash} className="no_submitted_image" />
          </Box>
        )}
      </Box>
      <Styles.Dialog onClose={handleClose} open={open}>
        <Styles.FullImageWrapper>
          <img src={`data:image/jpeg;base64,${imageUrl}`} alt={imageHash} />
        </Styles.FullImageWrapper>
      </Styles.Dialog>
    </>
  );
};

export default SubmittedImage;
