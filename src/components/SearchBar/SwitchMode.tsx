import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { getThemeState } from '@redux/reducers/appThemeReducer';

import * as Styles from './SearchBar.styles';

interface IProps {
  isMobile?: boolean;
}
function SwitchMode({ isMobile }: IProps) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(getThemeState).darkMode;

  const handleChangeMode = useCallback(() => {
    dispatch(setAppThemeAction(!isDarkMode));
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  return (
    <Styles.ModeToggle id="dark-mode-toggle">
      <input id="dark-mode-checkbox" type="checkbox" onChange={handleChangeMode} />
      <div className="toggle-switch">&nbsp;</div>
      <div className="toggle-bg">&nbsp;</div>
      {isMobile && <span style={{ paddingLeft: 8 }}>Toggle light/dark theme</span>}
    </Styles.ModeToggle>
  );
}

SwitchMode.defaultProps = {
  isMobile: false,
};

export default SwitchMode;
