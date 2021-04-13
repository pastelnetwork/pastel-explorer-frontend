import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

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
          <Helmet title="Page Error" />
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            General Error
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            We are sorry — somethings gone wrong.
          </Typography>
          <Typography component="h2" variant="body1" align="center" gutterBottom>
            Please try to refresh the page.
          </Typography>

          <Styles.Button
            onClick={() => window.location.reload(true)}
            variant="contained"
            color="secondary"
            mt={2}
          >
            Refresh the page
          </Styles.Button>
        </Styles.Wrapper>
      );
    }

    return children;
  }
}

export default ErrorHandler;
