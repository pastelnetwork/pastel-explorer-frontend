import { combineReducers } from 'redux';

import responseErrorsReducer from './responseErrorsReducer';
import infoDrawerReducer from './infoDrawerReducer';
import clusterReducer from './clusterReducer';
import appThemeReducer from './appThemeReducer';
import filterReducer from './filterReducer';
import blockReducer from './blockReducer';

export const rootReducer = combineReducers({
  ...responseErrorsReducer,
  infoDrawerReducer,
  cluster: clusterReducer,
  ...appThemeReducer,
  ...filterReducer,
  ...blockReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
