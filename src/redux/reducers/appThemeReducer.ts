import * as types from '../actions/actionTypes';
import { SetThemeProps } from '../actions/appThemeAction';
import { AppStateType } from './index';

export interface InitialAppThemeProps {
  darkMode: boolean;
}
export const stateKey = 'theme';
type ActionTypes = SetThemeProps;

const initialState: InitialAppThemeProps = {
  darkMode: false,
};

const reducer = (state = initialState, actions: ActionTypes): InitialAppThemeProps => {
  switch (actions.type) {
    case types.SET_APP_THEME:
      return {
        ...state,
        darkMode: actions.payload.darkMode,
      };

    default:
      return state;
  }
};
export const getThemeState = (state: AppStateType) => state[stateKey];
export default { [stateKey]: reducer };
