import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

import * as Styles from './NftDetails.styles';

interface ISubmittedImage {
  img: string;
  alt?: string;
}

const SubmittedImage: React.FC<ISubmittedImage> = ({ img, alt }) => {
  return (
    <Styles.SubmittedImageWrapper className={`${!img ? 'image-placeholder' : ''}`}>
      <img src={img ? `data:image/jpeg;base64,${img}` : noImagePlaceholder} alt={alt || ''} />
    </Styles.SubmittedImageWrapper>
  );
};

export default SubmittedImage;
