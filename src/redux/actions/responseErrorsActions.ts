import * as types from './actionTypes';

export interface SetResponseErrorProps {
  type: typeof types.RESPONSE_ERROR_SET;
  payload: boolean;
}

export const setResponseError = (value: boolean): SetResponseErrorProps => {
  return {
    type: types.RESPONSE_ERROR_SET,
    payload: value,
  };
};
