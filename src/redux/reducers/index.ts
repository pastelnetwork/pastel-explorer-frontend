import { combineReducers } from 'redux';

import responseErrorsReducer from './responseErrorsReducer';
import infoDrawerReducer from './infoDrawerReducer';
import clusterReducer from './clusterReducer';
import appThemeReducer from './appThemeReducer';

export const rootReducer = combineReducers({
  responseErrorsReducer,
  infoDrawerReducer,
  cluster: clusterReducer,
  ...appThemeReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
