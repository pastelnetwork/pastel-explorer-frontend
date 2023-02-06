import { memo, FC, useCallback, MouseEvent, useEffect, ReactNode, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 350,
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
  const [open, setOpen] = useState(false);
  const [ticketType, setTicketType] = useState<string[]>(dropdownType || []);

  const handleSelectTime = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    dispatch(setFilterValueAction({ dateRange: value, dropdownType }));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    return () => {
      dispatch(setFilterValueAction({ dateRange: 'all', dropdownType }));
    };
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTicketType((event.target.value as string[]).filter(v => v));
  };

  const handleFilter = () => {
    setOpen(false);
    dispatch(setFilterValueAction({ dateRange, dropdownType: ticketType }));
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
        {dropdownLabel ? <div className="dropdown-label">{dropdownLabel}</div> : null}
        <Select
          multiple
          displayEmpty
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={ticketType || []}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => {
            if ((selected as string[]).length === 0) {
              return <>All</>;
            }

            return renderValue(selected as string[]);
          }}
          MenuProps={MenuProps}
        >
          {dropdownFilters.map(item => (
            <Styles.MenuItem key={item.value} value={item.value}>
              <Checkbox checked={ticketType?.indexOf(item.value) > -1} />
              <ListItemText primary={item.name} />
            </Styles.MenuItem>
          ))}
          <Styles.FilterButtonWrapper>
            <Button className="btn-close" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button className="btn-filter" type="button" onClick={handleFilter}>
              Filter
            </Button>
          </Styles.FilterButtonWrapper>
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
