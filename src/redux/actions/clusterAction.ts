import * as types from './actionTypes';

export interface SetApiHostingProps {
  type: typeof types.SET_API_HOSTING;
  payload: {
    url: string;
  };
}

export const setApiHostingAction = (url: string): SetApiHostingProps => {
  return {
    type: types.SET_API_HOSTING,
    payload: {
      url,
    },
  };
};
