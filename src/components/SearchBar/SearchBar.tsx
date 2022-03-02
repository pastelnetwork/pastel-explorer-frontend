import * as React from 'react';
import { withTheme } from 'styled-components/macro';
import _debounce from 'lodash.debounce';
import { darken } from 'polished';

import { Grid, Hidden, Theme, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ISearchResponse } from '@utils/types/ISearch';
import ChooseCluster from '@components/ChooseCluster/ChooseCluster';
import RouterLink from '@components/RouterLink/RouterLink';
import { TAppTheme } from '@theme/index';
import breakpoints from '@theme/breakpoints';

import SwitchMode from './SwitchMode';
import * as Styles from './SearchBar.styles';
import {
  ADDRESSES_LABEL,
  BLOCKS_IDS_LABEL,
  TRANSACTIONS_LABEL,
  BLOCKS_HEIGHTS_LABEL,
  TOptionsCategories,
  getRoute,
  collectData,
} from './SearchBar.helpers';

interface AppBarProps {
  theme: Theme;
  onDrawerToggle: React.MouseEventHandler<HTMLElement>;
}

export interface ISearchData {
  value: string | number;
  category: TOptionsCategories;
}

const useStyles = makeStyles((theme: TAppTheme) => ({
  option: {
    padding: 0,
  },
  labelInputRoot: {
    background: theme.palette.background.default,
    width: '80%',
  },
  inputRoot: {
    border: '1px solid',
    borderColor: darken(0.1, theme.palette.background.paper),
    marginRight: 16,
    [theme.breakpoints.down(960)]: {
      marginRight: 0,
    },
  },
  listboxOptions: {
    background: theme.palette.background.default,
    border: '1px solid',
    borderColor: darken(0.05, theme.palette.background.paper),
    borderRadius: 5,
  },
}));

let isClicked = false;

const SearchBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
  const classes = useStyles();
  const optionSelectedFromList = React.useRef(false);
  const { fetchData } = useFetch<ISearchResponse>({ method: 'get', url: URLS.SEARCH_URL });
  const [searchData, setSearchData] = React.useState<Array<ISearchData>>([]);
  const [loading, setLoading] = React.useState(false);
  const [isShowSearchInput, setShowSearchInput] = React.useState(false);
  const [forceShowSearchInput, setForceShowSearchInput] = React.useState(false);

  const handleShowSearchInput = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 10) {
      setShowSearchInput(false);
      if (!isClicked) {
        setForceShowSearchInput(false);
      }
    } else if (!forceShowSearchInput) {
      setShowSearchInput(true);
    }
  };

  React.useEffect(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop <= 0 && window.innerWidth < breakpoints.values.sm) {
      setShowSearchInput(true);
      setForceShowSearchInput(true);
    }

    window.addEventListener('scroll', handleShowSearchInput);
    window.addEventListener('resize', handleShowSearchInput);
    return () => {
      window.removeEventListener('scroll', handleShowSearchInput);
      window.removeEventListener('resize', handleShowSearchInput);
    };
  }, []);

  const sortSearchData = ({ data }: ISearchResponse) => {
    if (!data) return [];

    const groupedData = [
      ...collectData(data.address, ADDRESSES_LABEL),
      ...collectData(data.blocksIds, BLOCKS_IDS_LABEL),
      ...collectData(data.blocksHeights, BLOCKS_HEIGHTS_LABEL),
      ...collectData(data.transactions, TRANSACTIONS_LABEL),
    ];

    return setSearchData(groupedData.sort((a, b) => -b.category.localeCompare(a.category)));
  };

  const handleInputChange = _debounce(
    (_: React.ChangeEvent<Record<string, unknown>>, _value: string) => {
      const value = _value.trimLeft().replace(/\s\s+/g, ' ');
      if (optionSelectedFromList.current || !value.length) return null;
      !loading && setLoading(true);
      searchData.length && setSearchData([]);
      return fetchData({ params: { query: value } })
        .then(response => response && sortSearchData(response))
        .finally(() => setLoading(false));
    },
    500,
  );

  // When user will select option from list
  // Prevent component from fetching new data and changing component states
  const handleChange = () => {
    optionSelectedFromList.current = true;

    // Reset reference object when to allow user search again if he will click on some option from dropdown
    setTimeout(() => {
      optionSelectedFromList.current = false;
    }, 600);

    return () => clearTimeout();
  };

  const handleClose = () => searchData.length && setSearchData([]);

  const dropdownOpen = Boolean(searchData.length) || loading;

  const renderSearchInput = () => (
    <Styles.AutocompleteWrapper item>
      <MuiAutocomplete
        fullWidth
        open={dropdownOpen}
        options={searchData}
        classes={{
          option: classes.option,
          paper: classes.listboxOptions,
        }}
        groupBy={option => option.category}
        getOptionLabel={option => `${option.value}`}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onClose={handleClose}
        forcePopupIcon={false}
        getOptionSelected={(option, value) => option.value === value.value}
        noOptionsText="No results containing all your search terms were found"
        loadingText="Loading results..."
        size="small"
        renderOption={option => (
          <RouterLink
            styles={{ padding: '6px 24px 6px 16px' }}
            route={`${getRoute(option.category)}/${option.value}`}
            value={option.value}
          />
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Search by block height, block hash, TX hash or address"
            InputLabelProps={{
              ...params.InputLabelProps,
              classes: {
                root: `${classes.labelInputRoot} label-input`,
              },
            }}
            InputProps={{
              ...params.InputProps,
              classes: {
                root: `${classes.inputRoot} input`,
              },
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            variant="outlined"
          />
        )}
      />
    </Styles.AutocompleteWrapper>
  );

  const handleClick = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === 0 && forceShowSearchInput) {
      setForceShowSearchInput(false);
      setShowSearchInput(false);
      isClicked = false;
    } else {
      setForceShowSearchInput(!isClicked);
      isClicked = !forceShowSearchInput;
    }
  };

  const onOpenDrawerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onDrawerToggle(event);
  };

  return (
    <Styles.AppBar
      position="relative"
      elevation={0}
      className={`${isShowSearchInput ? 'search-show' : ''} ${forceShowSearchInput ? 'force' : ''}`}
    >
      <Styles.ToolbarStyle className="disable-padding">
        <Styles.GridStyle className="top" container alignItems="center" wrap="nowrap">
          {renderSearchInput()}
        </Styles.GridStyle>
        <Styles.IconButton
          className="search-icon"
          id="search-icon"
          color="inherit"
          aria-label="Open search"
          onClick={handleClick}
        >
          <SearchIcon />
        </Styles.IconButton>
        <Hidden mdUp>
          <Grid item>
            <Styles.IconButton color="inherit" aria-label="Open drawer" onClick={onOpenDrawerClick}>
              <MenuIcon />
            </Styles.IconButton>
          </Grid>
        </Hidden>
        <SwitchMode />
        <ChooseCluster />
      </Styles.ToolbarStyle>
      <Styles.GridStyle className="search-popup" container alignItems="center" wrap="nowrap">
        {renderSearchInput()}
      </Styles.GridStyle>
    </Styles.AppBar>
  );
};

export default withTheme(SearchBar);
