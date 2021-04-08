import * as React from 'react';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import Alert from '../../components/Alert/Alert';

const BASE_URL = 'https://explorer.pastel.network';

const axios = Axios.create({
  baseURL: BASE_URL,
});

const getComponent = (isOpen: boolean, errorMessage: string) => (
  <Alert isOpen={isOpen} severity="error" message={errorMessage} />
);

export const WithRequestAlert: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // const interceptors = React.useMemo(
  //   () => ({
  //     response: (response: AxiosResponse) => response,
  //     error: (error: AxiosError) => {
  //       const { message } = error;

  //       setIsOpen(true);
  //       setErrorMessage(message);
  //     },
  //   }),
  //   [],
  // );

  // React.useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(interceptors.response, interceptors.error);

  //   return () => {
  //     axios.interceptors.request.eject(interceptor);
  //   };
  // }, [interceptors]);

  axios.interceptors.request.use(
    config => config,
    error => {
      const { message } = error;

      setIsOpen(true);
      setErrorMessage(message);

      return <Alert isOpen={isOpen} severity="error" message={errorMessage} />;
    },
  );

  return isOpen ? getComponent(isOpen, errorMessage) : null;
};

export default axios;
