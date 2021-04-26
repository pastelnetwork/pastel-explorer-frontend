import { combineReducers } from 'redux';

import responseErrorsReducer from './responseErrorsReducer';

export const rootReducer = combineReducers({
  responseErrorsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
