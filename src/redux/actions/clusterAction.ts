import * as types from './actionTypes';

export interface SetApiHostingProps {
  type: typeof types.SET_API_HOSTING;
  payload: {
    url: string;
    currencyName: string;
  };
}

export const setApiHostingAction = (url: string, currencyName: string): SetApiHostingProps => {
  return {
    type: types.SET_API_HOSTING,
    payload: {
      url,
      currencyName,
    },
  };
};
