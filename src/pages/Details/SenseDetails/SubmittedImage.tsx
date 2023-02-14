import { useState } from 'react';
import Box from '@material-ui/core/Box';

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
        <button type="button" onClick={handleClickOpen} title="View full">
          <img src={imageUrl} alt={imageHash} />
        </button>
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
