import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { withTranslation } from 'react-i18next';

import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './ErrorHandler.styles';

interface IErrorHandlerProps {
  children: React.ReactNode;
  t: (_key: string) => string;
}

interface IErrorHandlerState {
  hasError: boolean;
}

class ErrorHandler extends React.Component<IErrorHandlerProps, IErrorHandlerState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Integrate here any log error service if needed
    return console.error(error);
  }

  render() {
    const { children, t } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Styles.Wrapper>
          <Helmet title={t('pages.errorHandler.pageError.message')} />
          <Styles.ContentWrapper>
            <div className="content">
              <Grid container justify="center" alignItems="center" direction="column" spacing={5}>
                <Grid item>
                  <Styles.Logo src={PastelLogo} alt={t('common.pastelLogo.message') || ''} />
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h1" align="center" gutterBottom>
                    {t('pages.errorHandler.generalError.message')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography component="h2" variant="h5" align="center" gutterBottom>
                {t('pages.errorHandler.description.message')}
              </Typography>
              <Typography component="h2" variant="body1" align="center" gutterBottom>
                {t('pages.errorHandler.refresh.message')}
              </Typography>

              <Styles.Button
                onClick={() => window.location.reload()}
                variant="contained"
                color="secondary"
                mt={2}
              >
                {t('pages.errorHandler.btnRefresh.message')}
              </Styles.Button>
            </div>
          </Styles.ContentWrapper>
        </Styles.Wrapper>
      );
    }

    return children;
  }
}

export default withTranslation()(ErrorHandler);
