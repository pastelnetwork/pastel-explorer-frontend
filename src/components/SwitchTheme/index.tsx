import { FC, memo } from 'react';

import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { setAppThemeAction } from '@redux/actions/appThemeAction';
import { AppStateType } from '@redux/reducers';

interface IProps {
  darkMode: boolean;
}

const SwitchThemeV: FC<IProps> = ({ darkMode }) => {
  console.log({ darkMode });
  return (
    <Switch
      defaultChecked
      color="default"
      inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
  );
};

const SwitchTheme = connect(
  ({ theme }: AppStateType) => ({ darkMode: theme.darkMode }),
  dispatch => ({
    setAppTheme: (isDarkMode: boolean) => dispatch(setAppThemeAction(isDarkMode)),
  }),
)(SwitchThemeV);

export default memo(SwitchTheme);
