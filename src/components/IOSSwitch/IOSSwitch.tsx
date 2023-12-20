import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 34,
  height: 19,
  margin: 0,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',
        opacity: 1,
        border: 'none',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: '0.3 !important',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        opacity: '0.3 !important',
      },
      '& .MuiSwitch-thumb': {
        opacity: 1,
        backgroundColor: '#fff',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#0d6efd',
      border: '6px solid #fff',
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#BFBFBF',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      'pointer-events': 'none',
      filter: 'none',
      opacity: '0.5 !important',
      backgroundColor: 'transparent',
      border: '1px solid #dee2e6',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      backgroundColor: '#DFDFDF',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 15,
    height: 15,
    margin: 2,
  },
  '& .MuiSwitch-track': {
    borderRadius: 19 / 2,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
}));

export default IOSSwitch;
