import { BASE_URL } from '@utils/constants/urls';
import * as types from '../actions/actionTypes';
import { SetApiHostingProps } from '../actions/clusterAction';

export interface InitialClusterProps {
  url: string;
}

type ActionTypes = SetApiHostingProps;

const initialState: InitialClusterProps = {
  url: BASE_URL || '',
};

const reducer = (state = initialState, actions: ActionTypes): InitialClusterProps => {
  switch (actions.type) {
    case types.SET_API_HOSTING:
      return {
        ...state,
        url: actions.payload.url,
      };

    default:
      return state;
  }
};

export default reducer;
