import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Typography } from '@material-ui/core';

import * as Styles from './404.styles';

const Page404: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Helmet title="404 Error" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Page not found.
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        The page you are looking for might have been removed.
      </Typography>

      <Styles.Button component={Link} to="/" variant="contained" color="secondary" mt={2}>
        Return to website
      </Styles.Button>
    </Styles.Wrapper>
  );
};

export default Page404;
