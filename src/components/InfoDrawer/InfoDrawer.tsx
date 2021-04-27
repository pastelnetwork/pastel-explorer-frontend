import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Drawer } from '@material-ui/core';

import { setInfoDrawer } from '@redux/actions/infoDrawerActions';
import { AppStateType } from '@redux/reducers';

const InfoDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setInfoDrawer(false, null));

  const drawer = useSelector((state: AppStateType) => state.infoDrawerReducer);
  const { isOpen, content } = drawer;

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      {content}
    </Drawer>
  );
};

export default InfoDrawer;
