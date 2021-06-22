import * as types from './actionTypes';

export interface SetThemeProps {
  type: typeof types.SET_APP_THEME;
  payload: {
    darkMode: boolean;
  };
}

export const setAppThemeAction = (darkMode: boolean): SetThemeProps => {
  return {
    type: types.SET_APP_THEME,
    payload: {
      darkMode,
    },
  };
};
