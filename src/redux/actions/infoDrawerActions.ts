import * as types from './actionTypes';

export interface SetInfoDrawerProps {
  type: typeof types.INFO_DRAWER_SET;
  payload: {
    isOpen: boolean;
    content: JSX.Element | null;
  };
}

export const setInfoDrawer = (isOpen: boolean, content: JSX.Element | null): SetInfoDrawerProps => {
  return {
    type: types.INFO_DRAWER_SET,
    payload: {
      isOpen,
      content,
    },
  };
};
