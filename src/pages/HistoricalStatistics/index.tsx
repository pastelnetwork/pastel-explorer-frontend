import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { statistics } from '@utils/constants/statistics';
import { Title, Wrapper } from './StatisticsOvertime.styles';

const Statistics = () => {
  return (
    <Wrapper>
      <Title>Pastel Statistics</Title>
      <Grid container spacing={6} alignItems="center">
        {statistics.map(({ id, image, title, url }) => (
          <Grid item key={id} className="card-item" xs={12} sm={6} lg={4} xl={3}>
            <Link to={url} style={{ minHeight: 200 }}>
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
