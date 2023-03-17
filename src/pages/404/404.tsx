import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Typography, Grid } from '@material-ui/core';

import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './404.styles';

const Page404: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Styles.Wrapper>
      <Helmet title="404 Error" />
      <Styles.ContentWrapper>
        <div className="content">
          <Grid container justify="center" alignItems="center" direction="column" spacing={5}>
            <Grid item>
              <Styles.Logo src={PastelLogo} alt={t('common.pastelLogo.message') || ''} />
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h1" align="center" gutterBottom>
                {t('pages.404.title.message')}
              </Typography>
            </Grid>
          </Grid>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            {t('pages.404.content.message')}
          </Typography>
          <Typography component="h2" variant="body1" align="center" gutterBottom>
            {t('pages.404.description.message')}
          </Typography>

          <Styles.Button component={Link} to="/" variant="contained" color="primary" mt={2}>
            {t('pages.404.backToHomepage.message')}
          </Styles.Button>
        </div>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default Page404;
