import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage,
};

const composeEnhancers = composeWithDevTools({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig, rootReducer as any);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export type AppDispatchType = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
