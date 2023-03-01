import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Typography, Grid } from '@material-ui/core';

import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './404.styles';

const Page404: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Helmet title="404 Error" />
      <Styles.ContentWrapper>
        <div className="content">
          <Grid container justify="center" alignItems="center" direction="column" spacing={5}>
            <Grid item>
              <Styles.Logo src={PastelLogo} alt="Pastel Logo" />
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h1" align="center" gutterBottom>
                404
              </Typography>
            </Grid>
          </Grid>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Page not found.
          </Typography>
          <Typography component="h2" variant="body1" align="center" gutterBottom>
            The page you are looking for might have been removed.
          </Typography>

          <Styles.Button component={Link} to="/" variant="contained" color="primary" mt={2}>
            Back to Homepage
          </Styles.Button>
        </div>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default Page404;
