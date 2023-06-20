import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 34,
      height: 19,
      padding: 0,
      margin: 0,
    },
    switchBase: {
      padding: 0,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#0d6efd',
        border: '6px solid #fff',
      },
      '& $thumb': {
        backgroundColor: '#BFBFBF',
      },
      '&$checked $thumb': {
        backgroundColor: '#fff',
      },
      '&.Mui-disabled + $track': {
        'pointer-events': 'none',
        filter: 'none',
        opacity: '0.5 !important',
        backgroundColor: 'transparent',
        border: '1px solid #dee2e6',
      },
      '&.Mui-disabled.Mui-checked + $track': {
        opacity: '0.3 !important',
      },
      '&.Mui-disabled $thumb': {
        backgroundColor: '#DFDFDF',
      },
      '&.Mui-disabled.Mui-checked $thumb': {
        opacity: 1,
        backgroundColor: '#fff',
      },
    },
    thumb: {
      width: 15,
      height: 15,
      margin: 2,
    },
    track: {
      borderRadius: 19 / 2,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default IOSSwitch;
