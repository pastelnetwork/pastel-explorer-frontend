import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { statistics } from '@utils/constants/statistics';
import { Title, Wrapper } from './StatisticsOvertime.styles';

const Statistics = () => {
  return (
    <Wrapper>
      <Title>Pastel Statistics</Title>
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.0938 7.71894H2.5082L8.47617 2.03457C8.78867 1.73691 8.80078 1.24238 8.50313 0.929878C8.20586 0.617769 7.71133 0.605269 7.39844 0.902925L0.582812 7.39511C0.287891 7.69042 0.125 8.08261 0.125 8.50019C0.125 8.91738 0.287891 9.30996 0.596484 9.61816L7.39883 16.0971C7.55 16.2412 7.74375 16.3127 7.9375 16.3127C8.14375 16.3127 8.35 16.2314 8.50352 16.0701C8.80117 15.7576 8.78906 15.2635 8.47656 14.9658L2.48359 9.28144H18.0938C18.525 9.28144 18.875 8.93144 18.875 8.50019C18.875 8.06894 18.525 7.71894 18.0938 7.71894Z"
          fill="white"
          stroke="white"
          strokeWidth="0.2"
        />
      </svg>
      <Grid container spacing={6} alignItems="center">
        {statistics.map(({ id, image, title, url }) => (
          <Grid item key={id} className="card-item" xs={12} sm={6} lg={4} xl={3}>
            <Link to={url}>
              <img alt="" width="100%" height="100%" style={{ objectFit: 'contain' }} src={image} />
              <h2>{title}</h2>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Statistics;
