import { SET_FILTER_VALUE } from '@redux/actions/actionTypes';
import { IFilterState } from '@redux/reducers/filterReducer';

export interface SetFilterValueProps {
  type: typeof SET_FILTER_VALUE;
  payload: IFilterState;
}

export const setFilterValueAction = (payload: IFilterState): SetFilterValueProps => {
  return {
    type: SET_FILTER_VALUE,
    payload,
  };
};
