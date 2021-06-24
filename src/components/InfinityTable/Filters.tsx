import { memo, FC, useState, useCallback, MouseEvent, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValueAction } from '@redux/actions/filterAction';
// import ListItemText from '@material-ui/core/ListItemText';
import { TAppTheme } from '@theme/index';
import { TFilter } from '@utils/types/IFilter';
import { getFilterState } from '@redux/reducers/filterReducer';

const useStyles = makeStyles((theme: TAppTheme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      paddingRight: 0,
      minWidth: 'auto',
    },
    paper: {
      border: '1px solid',
    },
    rootMenu: {
      border: `1px solid ${theme.palette.background.paper}`,
      background: theme.palette.background.default,
    },
    rootMenuItem: {
      display: 'block',
      backgroundColor: 'inherit',
      padding: 0,
    },
    rootMenuItemButton: {
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
      backgroundColor: 'inherit !important',
      padding: `${theme.spacing(1.5)}px ${theme.spacing(4)}px`,
    },
    rootMenuItemActive: {
      backgroundColor: 'rgba(45, 55, 72, 0.04) !important',
    },
  };
});

interface IProps {
  title: string;
  id?: string;
  filters: TFilter[];
}

const Filters: FC<IProps> = ({ title, filters }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<MenuProps['anchorEl'] | null>(null);
  const toggle = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prev: MenuProps['anchorEl'] | null) => (prev ? null : event.currentTarget));
  }, []);
  const { dateRange } = useSelector(getFilterState);
  const time: string = dateRange || 'all';

  const handleSelectTime = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    dispatch(setFilterValueAction({ dateRange: value }));
    setAnchorEl(null);
  }, []);
  useEffect(() => {
    return () => {
      dispatch(setFilterValueAction({ dateRange: 'all' }));
    };
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <span>{title}</span>
      <Button
        type="button"
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.button }}
        onClick={toggle}
      >
        <svg
          width="18"
          height="4"
          viewBox="0 0 18 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3C9.5523 3 10 2.5523 10 2C10 1.4477 9.5523 1 9 1C8.4477 1 8 1.4477 8 2C8 2.5523 8.4477 3 9 3Z"
            stroke="#B0B7C3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3C16.5523 3 17 2.5523 17 2C17 1.4477 16.5523 1 16 1C15.4477 1 15 1.4477 15 2C15 2.5523 15.4477 3 16 3Z"
            stroke="#B0B7C3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 3C2.55228 3 3 2.5523 3 2C3 1.4477 2.55228 1 2 1C1.44772 1 1 1.4477 1 2C1 2.5523 1.44772 3 2 3Z"
            stroke="#B0B7C3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Menu
        id="customized-menu"
        keepMounted
        elevation={0}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={toggle}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ paper: classes.rootMenu, list: classes.rootMenu }}
      >
        {filters.map(({ name, value }) => (
          <MenuItem
            key={value}
            classes={{
              root: `${classes.rootMenuItem} ${time === value ? classes.rootMenuItemActive : ''}`,
            }}
          >
            <Button
              classes={{ root: classes.rootMenuItemButton }}
              type="button"
              value={value}
              onClick={handleSelectTime}
            >
              {name}
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default memo<IProps>(Filters);
