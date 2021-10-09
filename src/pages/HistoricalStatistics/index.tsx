import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { darken } from '@material-ui/core';
// application
import { TAppTheme } from '@theme/index';
import { statistics } from '@utils/constants/statistics';
import Header from '@components/Header/Header';
import { Wrapper } from './StatisticsOvertime.styles';

const useStyles = makeStyles((theme: TAppTheme) => ({
  root: {
    border: `1px solid ${darken(theme.palette.background.paper, 0.5)}`,
    borderRadius: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
    background: darken(theme.palette.background.default, 0.05),
  },
}));

const Statistics = () => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Header title="Pastel Statistics" />
      <Grid container spacing={6} alignItems="center">
        {statistics.map(({ id, image, title, url }) => (
          <Grid item key={id} className="card-item" xs={12} sm={6} lg={4} xl={3}>
            <div className={classes.root}>
              <Link to={url} style={{ minHeight: 200 }}>
                <img
                  alt=""
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'contain' }}
                  src={image}
                />
                <h4>{title}</h4>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Statistics;
