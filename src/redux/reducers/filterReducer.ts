import { SET_FILTER_VALUE } from '../actions/actionTypes';
import { SetFilterValueProps } from '../actions/filterAction';
import { AppStateType } from './index';

export interface IFilterState {
  dateRange: string | null;
  dropdownType: string[];
}
export const stateKey = 'filter';
type ActionTypes = SetFilterValueProps;

const initialState: IFilterState = {
  dateRange: null,
  dropdownType: [],
};

const reducer = (state = initialState, actions: ActionTypes): IFilterState => {
  switch (actions.type) {
    case SET_FILTER_VALUE:
      return {
        ...state,
        ...actions.payload,
      };

    default:
      return state;
  }
};

export const getFilterState = (state: AppStateType) => state[stateKey];

export default { [stateKey]: reducer };
