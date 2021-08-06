import { useCallback, ChangeEvent } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import themeVariant from '@theme/variants';

const {
  custom: {
    blue: { solitude, licorice },
  },
} = themeVariant;
const SwitchMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(getThemeState).darkMode;
  const handleChangeMode = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { checked: value } = event.target;
    dispatch(setAppThemeAction(value));
    localStorage.setItem('darkMode', value ? 'true' : 'false');
  }, []);

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isDarkMode} onChange={handleChangeMode} />}
        label={isDarkMode ? 'Light' : 'Dark'}
        style={{ color: isDarkMode ? solitude : licorice }}
      />
    </div>
  );
};

export default SwitchMode;
