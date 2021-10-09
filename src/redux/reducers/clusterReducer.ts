import { BASE_URL } from '@utils/constants/urls';
import { DEFAULT_CURRENCY } from '@utils/appInfo';
import * as types from '../actions/actionTypes';
import { SetApiHostingProps } from '../actions/clusterAction';

export interface InitialClusterProps {
  url: string;
  currencyName: string;
}

type ActionTypes = SetApiHostingProps;

const initialState: InitialClusterProps = {
  url: BASE_URL || '',
  currencyName: DEFAULT_CURRENCY,
};

const reducer = (state = initialState, actions: ActionTypes): InitialClusterProps => {
  switch (actions.type) {
    case types.SET_API_HOSTING:
      return {
        ...state,
        url: actions.payload.url,
        currencyName: actions.payload.currencyName,
      };

    default:
      return state;
  }
};

export default reducer;
