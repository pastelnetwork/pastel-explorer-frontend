import { combineReducers } from 'redux';

import summaryReducer from './summaryReducer';

export const rootReducer = combineReducers({
  summaryReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
