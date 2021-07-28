import * as types from './actionTypes';

export interface SetResponseErrorProps {
  type: typeof types.RESPONSE_ERROR_SET;
  payload: {
    error: boolean;
    message: string | null;
  };
}

export const setResponseError = (
  value: boolean,
  message: string | null = null,
): SetResponseErrorProps => {
  return {
    type: types.RESPONSE_ERROR_SET,
    payload: {
      error: value,
      message,
    },
  };
};
