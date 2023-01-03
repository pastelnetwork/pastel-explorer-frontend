import { memo, FC, useCallback, MouseEvent, useEffect, ReactNode } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValueAction } from '@redux/actions/filterAction';
import { TAppTheme } from '@theme/index';
import { TFilter } from '@utils/types/IFilter';
import { getFilterState } from '@redux/reducers/filterReducer';
import * as Styles from './InfinityTable.styles';

const useStyles = makeStyles((theme: TAppTheme) => {
  return {
    listFilter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: `${theme.spacing(1)}px`,
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
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
      padding: '2px 10px',
    },
  };
});

interface IProps {
  title: ReactNode;
  id?: string;
  filters: TFilter[];
  headerBackground?: boolean;
}

const Filters: FC<IProps> = ({ filters, title, headerBackground }) => {
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
    <Styles.Wrapper className={headerBackground ? 'background' : ''}>
      <h4>{title}</h4>
      <div className={`${classes.listFilter} list-filter`}>
        {filters.map(({ name, value }) => (
          <MenuItem
            key={value}
            classes={{
              root: `filter-item ${classes.rootMenuItem} ${
                time === value ? 'filter-item-active' : ''
              }`,
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
    </Styles.Wrapper>
  );
};

export default memo<IProps>(Filters);
