import initialSummaryList, { SummaryItemProps } from '@components/Summary/Summary.helpers';

import * as types from '../actions/actionTypes';
import { SetSummaryProps } from '../actions/summaryActions';

export interface InitialSummaryProps {
  summary: SummaryItemProps[];
}

type ActionTypes = SetSummaryProps;

const initialState = {
  summary: initialSummaryList,
};

const reducer = (state = initialState, actions: ActionTypes): InitialSummaryProps => {
  switch (actions.type) {
    case types.SUMMARY_SET:
      return {
        ...state,
        summary: actions.payload,
      };

    default:
      return state;
  }
};

export default reducer;
