import { memo, FC, useCallback, MouseEvent, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValueAction } from '@redux/actions/filterAction';
import { TAppTheme } from '@theme/index';
import { TFilter } from '@utils/types/IFilter';
import { getFilterState } from '@redux/reducers/filterReducer';

const useStyles = makeStyles((theme: TAppTheme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    listFilter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      border: `1px solid ${theme.palette.background.default}`,
      borderRadius: `${theme.spacing(1)}px`,
    },
    button: {
      paddingRight: 0,
      minWidth: 'auto',
    },
    paper: {
      border: '1px solid',
    },
    rootMenuItem: {
      display: 'block',
      backgroundColor: 'inherit',
      padding: 0,
      minHeight: 'auto',
    },
    rootMenuItemButton: {
      width: '100%',
      textAlign: 'left',
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

const Filters: FC<IProps> = ({ filters, title }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dateRange } = useSelector(getFilterState);
  const time: string = dateRange || 'all';

  const handleSelectTime = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    dispatch(setFilterValueAction({ dateRange: value }));
  }, []);
  useEffect(() => {
    return () => {
      dispatch(setFilterValueAction({ dateRange: 'all' }));
    };
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <span>{title}</span>
      <div className={classes.listFilter}>
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
      </div>
    </div>
  );
};

export default memo<IProps>(Filters);
