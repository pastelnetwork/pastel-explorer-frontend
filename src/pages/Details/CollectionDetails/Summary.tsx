import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import banner from '@assets/images/mockup/banner.avif';
import avatar from '@assets/images/mockup/avatar.png';

import * as Styles from './CollectionDetails.styles';

interface IParamTypes {
  collectionName: string;
}

interface IBanner {
  src: string;
  alt: string;
}

const Banner: React.FC<IBanner> = ({ src, alt }) => {
  return (
    <Box className="banner">
      <Box className="banner-box">
        <img src={src} alt={alt} />
      </Box>
    </Box>
  );
};

const Summary = () => {
  const { collectionName } = useParams<IParamTypes>();

  return (
    <Styles.SummaryWrapper>
      <Banner src={banner} alt="Banner" />
      <Styles.ContentWrapper>
        <Box className="avatar-box">
          <Box className="avatar-img">
            <img src={avatar} alt="avatar" />
          </Box>
        </Box>
        <Typography component="h2">{collectionName}</Typography>
        <Box>
          <Box className="mt-5">
            <Typography component="span">By</Typography>
            <Typography component="span" className="bold">
              TheIglooCompany
            </Typography>
          </Box>
          <Box className="mt-5">
            <ul className="info-list">
              <li>
                <Typography component="span" className="label">
                  Items
                </Typography>
                <Typography component="span" className="value">
                  8,888
                </Typography>
              </li>
              <li>
                <Typography component="span" className="label">
                  Created
                </Typography>
                <Typography component="span" className="value">
                  Jul 2021
                </Typography>
              </li>
              <li>
                <Typography component="span" className="label">
                  Royalty
                </Typography>
                <Typography component="span" className="value">
                  2%
                </Typography>
              </li>
              <li>
                <Typography component="span" className="label">
                  Green
                </Typography>
                <Typography component="span" className="value">
                  true
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Styles.ContentWrapper>
    </Styles.SummaryWrapper>
  );
};

export default Summary;
