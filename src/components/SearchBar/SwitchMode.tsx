import { useCallback, MouseEvent } from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { IconButton } from '@material-ui/core';

interface IProps {
  isMobile?: boolean;
}
function SwitchMode({ isMobile }: IProps) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(getThemeState).darkMode;
  const handleChangeMode = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(setAppThemeAction(!isDarkMode));
      localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
    },
    [isDarkMode],
  );

  return (
    <IconButton
      title="Toggle light/dark theme"
      onClick={handleChangeMode}
      style={{
        fontSize: 'inherit',
        color: 'inherit',
        borderRadius: 15,
        width: isMobile ? '100%' : 'auto',
      }}
    >
      {isDarkMode ? (
        <Brightness4Icon fill="white" style={{ fill: 'white' }} />
      ) : (
        <Brightness7Icon />
      )}
      {isMobile && <span style={{ paddingLeft: 8 }}>Toggle light/dark theme</span>}
    </IconButton>
  );
}
SwitchMode.defaultProps = {
  isMobile: false,
};
export default SwitchMode;
