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

import { translate } from '@utils/helpers/i18n';
import DateTimePicker from '@components/DateTimePicker';
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
        maxWidth: '98%',
        margin: 'auto',
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
  showDateTimePicker?: boolean;
  defaultDateRange?: {
    startDate: number;
    endDate: number | null;
  };
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
  showDateTimePicker = false,
  defaultDateRange,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dateRange, dropdownType, customDateRange } = useSelector(getFilterState);
  const time: string = dateRange || 'all';
  const [open, setOpen] = useState(false);
  const [ticketType, setTicketType] = useState<string[]>(dropdownType || []);

  const handleSelectTime = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    dispatch(
      setFilterValueAction({
        dateRange: value,
        dropdownType,
        customDateRange: { startDate: 0, endDate: null },
      }),
    );
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    return () => {
      dispatch(
        setFilterValueAction({
          dateRange: 'all',
          dropdownType,
          customDateRange: { startDate: 0, endDate: null },
        }),
      );
    };
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTicketType((event.target.value as string[]).filter(v => v));
  };

  const handleFilter = () => {
    setOpen(false);
    dispatch(setFilterValueAction({ dateRange, dropdownType: ticketType, customDateRange }));
  };

  const handleDateRangeApply = (_startDate: number, _endDate: number | null) => {
    dispatch(
      setFilterValueAction({
        dateRange: 'custom',
        dropdownType: ticketType,
        customDateRange: { startDate: _startDate, endDate: _endDate },
      }),
    );
  };

  const renderDropdownCheckbox = () => {
    if (!dropdownFilters || !dropdownFilters?.length) {
      return null;
    }

    const renderValue = (selected: string[]) => {
      return selected
        ?.map(i => {
          const item = dropdownFilters.find(f => f.value === i);
          return translate(item?.name || '');
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
              return <>{translate('components.infinityTable.filters.all')}</>;
            }

            return renderValue(selected as string[]);
          }}
          MenuProps={MenuProps}
        >
          {dropdownFilters.map(item => (
            <Styles.MenuItem key={item.value} value={item.value}>
              <Checkbox checked={ticketType?.indexOf(item.value) > -1} />
              <ListItemText primary={translate(item.name)} />
            </Styles.MenuItem>
          ))}
          <Styles.FilterButtonWrapper>
            <Button className="btn-close" type="button" onClick={handleClose}>
              {translate('components.infinityTable.filters.close')}
            </Button>
            <Button className="btn-filter" type="button" onClick={handleFilter}>
              {translate('components.infinityTable.filters.filter')}
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
                {translate(name)}
              </Button>
            </MenuItem>
          ))}
          {showDateTimePicker ? (
            <MenuItem
              classes={{
                root: `filter-item date-picker ${classes.rootMenuItem} ${
                  time === 'custom' ? 'filter-item-active' : ''
                }`,
              }}
            >
              <DateTimePicker onApply={handleDateRangeApply} defaultDateRange={defaultDateRange} />
            </MenuItem>
          ) : null}
        </div>
      </Styles.FilterWrapper>
    </Styles.Wrapper>
  );
};

export default memo<IProps>(Filters);
