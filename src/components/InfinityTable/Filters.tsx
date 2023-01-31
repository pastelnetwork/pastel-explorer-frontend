import { memo, FC, useCallback, MouseEvent, useEffect, ReactNode } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
  dropdownFilters?: TFilter[];
  dropdownLabel?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters: FC<IProps> = ({
  filters,
  title,
  headerBackground,
  dropdownFilters,
  dropdownLabel,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dateRange, dropdownType } = useSelector(getFilterState);
  const time: string = dateRange || 'all';

  const handleSelectTime = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    dispatch(setFilterValueAction({ dateRange: value, dropdownType }));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setFilterValueAction({ dateRange: 'all', dropdownType }));
    };
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setFilterValueAction({ dateRange, dropdownType: event.target.value as string[] }));
  };

  const renderDropdownCheckbox = () => {
    if (!dropdownFilters || !dropdownFilters?.length) {
      return null;
    }

    const renderValue = (selected: string[]) => {
      return selected
        ?.map(i => {
          const item = dropdownFilters.find(f => f.value === i);
          return item?.name;
        })
        .join(', ');
    };

    return (
      <FormControl className="dropdown-filter">
        {dropdownLabel && !dropdownType?.length ? (
          <InputLabel id="dropdownCheckbox">{dropdownLabel}</InputLabel>
        ) : null}
        <Select
          labelId="dropdownCheckbox"
          multiple
          value={dropdownType || []}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => renderValue(selected as string[])}
          MenuProps={MenuProps}
        >
          {dropdownFilters.map(item => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={dropdownType?.indexOf(item.value) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Styles.Wrapper className={headerBackground ? 'background' : ''}>
      <h4>{title}</h4>
      <Styles.FilterWrapper>
        {renderDropdownCheckbox()}
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
      </Styles.FilterWrapper>
    </Styles.Wrapper>
  );
};

export default memo<IProps>(Filters);
