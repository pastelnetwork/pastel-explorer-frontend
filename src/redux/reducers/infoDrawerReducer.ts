import * as types from '../actions/actionTypes';
import { SetInfoDrawerProps } from '../actions/infoDrawerActions';

export interface InitialInfoDrawerProps {
  isOpen: boolean;
  content: JSX.Element | null;
  title: string | null;
}

type ActionTypes = SetInfoDrawerProps;

const initialState: InitialInfoDrawerProps = {
  isOpen: false,
  content: null,
  title: null,
};

const reducer = (state = initialState, actions: ActionTypes): InitialInfoDrawerProps => {
  switch (actions.type) {
    case types.INFO_DRAWER_SET:
      return {
        ...state,
        isOpen: actions.payload.isOpen,
        content: actions.payload.content,
        title: actions.payload.title,
      };

    default:
      return state;
  }
};

export default reducer;
