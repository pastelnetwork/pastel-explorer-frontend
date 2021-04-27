import { combineReducers } from 'redux';

import responseErrorsReducer from './responseErrorsReducer';
import infoDrawerReducer from './infoDrawerReducer';

export const rootReducer = combineReducers({
  responseErrorsReducer,
  infoDrawerReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
