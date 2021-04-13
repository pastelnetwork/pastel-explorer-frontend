import { combineReducers } from 'redux';

import summaryReducer from './summaryReducer';
import responseErrorsReducer from './responseErrorsReducer';

export const rootReducer = combineReducers({
  summaryReducer,
  responseErrorsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
