import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

import { translate } from '@utils/helpers/i18n';
import PastelLogo from '@assets/images/pastel-logo.png';

import * as Styles from './ErrorHandler.styles';

interface IErrorHandlerProps {
  children: React.ReactNode;
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
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Styles.Wrapper>
          <Helmet title={translate('pages.errorHandler.pageError')} />
          <Styles.ContentWrapper>
            <div className="content">
              <Grid container justify="center" alignItems="center" direction="column" spacing={5}>
                <Grid item>
                  <Styles.Logo src={PastelLogo} alt={translate('common.pastelLogo')} />
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h1" align="center" gutterBottom>
                    {translate('pages.errorHandler.generalError')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography component="h2" variant="h5" align="center" gutterBottom>
                {translate('pages.errorHandler.description')}
              </Typography>
              <Typography component="h2" variant="body1" align="center" gutterBottom>
                {translate('pages.errorHandler.refresh')}
              </Typography>

              <Styles.Button
                onClick={() => window.location.reload()}
                variant="contained"
                color="secondary"
                mt={2}
              >
                {translate('pages.errorHandler.btnRefresh')}
              </Styles.Button>
            </div>
          </Styles.ContentWrapper>
        </Styles.Wrapper>
      );
    }

    return children;
  }
}

export default ErrorHandler;
