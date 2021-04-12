import { SummaryItemProps } from '@components/Summary/Summary.helpers';

import * as types from './actionTypes';

export interface SetSummaryProps {
  type: typeof types.SUMMARY_SET;
  payload: Array<SummaryItemProps>;
}

export const setSummary = (value: Array<SummaryItemProps>): SetSummaryProps => {
  return {
    type: types.SUMMARY_SET,
    payload: value,
  };
};
