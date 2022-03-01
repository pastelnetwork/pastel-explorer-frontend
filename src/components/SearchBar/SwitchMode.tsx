import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { getThemeState } from '@redux/reducers/appThemeReducer';

import * as Styles from './SearchBar.styles';

function SwitchMode() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(getThemeState).darkMode;

  const handleChangeMode = useCallback(() => {
    dispatch(setAppThemeAction(!isDarkMode));
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  return (
    <Tooltip title="Toggle light/dark theme">
      <Styles.ModeToggle>
        <input type="checkbox" onChange={handleChangeMode} />
        <div className="toggle-switch">&nbsp;</div>
        <div className="toggle-bg">&nbsp;</div>
      </Styles.ModeToggle>
    </Tooltip>
  );
}

SwitchMode.defaultProps = {
  isMobile: false,
};

export default SwitchMode;
