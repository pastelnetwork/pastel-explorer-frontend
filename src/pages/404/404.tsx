import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Typography, Grid } from '@material-ui/core';
import { translate } from '@utils/helpers/i18n';

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
              <Styles.Logo src={PastelLogo} alt={translate('common.pastelLogo')} />
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h1" align="center" gutterBottom>
                {translate('pages.404.title')}
              </Typography>
            </Grid>
          </Grid>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            {translate('pages.404.content')}
          </Typography>
          <Typography component="h2" variant="body1" align="center" gutterBottom>
            {translate('pages.404.description')}
          </Typography>

          <Styles.Button component={Link} to="/" variant="contained" color="primary" mt={2}>
            {translate('pages.404.backToHomepage')}
          </Styles.Button>
        </div>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default Page404;
