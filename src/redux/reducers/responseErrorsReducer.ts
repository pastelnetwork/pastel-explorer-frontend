import * as types from '../actions/actionTypes';
import { SetResponseErrorProps } from '../actions/responseErrorsActions';

export interface InitialResponseErrorsProps {
  error: boolean;
}

type ActionTypes = SetResponseErrorProps;

const initialState = {
  error: false,
};

const reducer = (state = initialState, actions: ActionTypes): InitialResponseErrorsProps => {
  switch (actions.type) {
    case types.RESPONSE_ERROR_SET:
      return {
        ...state,
        error: actions.payload,
      };

    default:
      return state;
  }
};

export default reducer;
