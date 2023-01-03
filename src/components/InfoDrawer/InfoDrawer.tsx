import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { Drawer, Button } from '@material-ui/core';

import { setInfoDrawer } from '@redux/actions/infoDrawerActions';
import { AppStateType } from '@redux/reducers';

import * as Styles from './InfoDrawer.styles';

const useStyles = makeStyles(() => ({
  close: {
    minWidth: 'auto',
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: '100%',
    padding: '6px 14px',
  },
}));

const InfoDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setInfoDrawer(false, null, null));
  const classes = useStyles();

  const drawer = useSelector((state: AppStateType) => state.infoDrawerReducer);
  const { isOpen, content, title } = drawer;

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <div>
        <Button type="button" className={classes.close} onClick={handleClose}>
          ×
        </Button>
        <Styles.TitleRow item className="title">
          <Styles.Title variant="h3">{title}</Styles.Title>
        </Styles.TitleRow>
      </div>
      {content}
    </Drawer>
  );
};

export default InfoDrawer;
