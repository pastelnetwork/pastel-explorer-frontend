import { SET_FILTER_VALUE } from '../actions/actionTypes';
import { SetFilterValueProps } from '../actions/filterAction';
import { AppStateType } from './index';

export interface IFilterState {
  dateRange: string | null;
  dropdownType: string[];
  customDateRange?: {
    startDate: number;
    endDate: number | null;
  };
}
export const stateKey = 'filter';
type ActionTypes = SetFilterValueProps;

const initialState: IFilterState = {
  dateRange: null,
  dropdownType: [],
  customDateRange: {
    startDate: 0,
    endDate: null,
  },
};

const reducer = (state: IFilterState, actions: ActionTypes): IFilterState => {
  if (typeof state === 'undefined') {
    return initialState;
  }
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

export const getFilterState = (state: AppStateType): IFilterState => state[stateKey];

export default { [stateKey]: reducer };
