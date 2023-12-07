import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@highlight-run/react';

import './utils/helpers/i18n';
import App from './App';

import store, { persistor } from './redux/store/index';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ErrorBoundary>,
  );
}
