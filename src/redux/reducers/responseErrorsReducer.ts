import * as types from '../actions/actionTypes';
import { SetResponseErrorProps } from '../actions/responseErrorsActions';

export const stateKey = 'responseErrorsReducer';

export interface InitialResponseErrorsProps {
  error: boolean;
  message: string | null;
}

type ActionTypes = SetResponseErrorProps;

const initialState: InitialResponseErrorsProps = {
  error: false,
  message: null,
};

const reducer = (state = initialState, actions: ActionTypes): InitialResponseErrorsProps => {
  switch (actions.type) {
    case types.RESPONSE_ERROR_SET:
      return {
        ...state,
        ...actions.payload,
      };

    default:
      return state;
  }
};

export default { [stateKey]: reducer };
