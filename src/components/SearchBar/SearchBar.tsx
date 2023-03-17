import * as React from 'react';
import { withTheme } from 'styled-components/macro';
import _debounce from 'lodash.debounce';
import { darken } from 'polished';

import { Grid, Hidden, Theme, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';
import MuiAutocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ISearchResponse } from '@utils/types/ISearch';
import ChooseCluster from '@components/ChooseCluster/ChooseCluster';
import RouterLink from '@components/RouterLink/RouterLink';
import { TAppTheme } from '@theme/index';
import breakpoints from '@theme/breakpoints';
import { translate } from '@utils/helpers/i18n';

import SwitchMode from './SwitchMode';
import * as Styles from './SearchBar.styles';
import {
  ADDRESSES_LABEL,
  BLOCKS_IDS_LABEL,
  TRANSACTIONS_LABEL,
  BLOCKS_HEIGHTS_LABEL,
  SENSES_LABEL,
  PASTEL_ID_LABEL,
  USERNAME,
  TOptionsCategories,
  getRoute,
  collectData,
  collectUsernameData,
  TAutocompleteOptions,
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

const filterOptions = createFilterOptions({
  trim: true,
});

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
      ...collectData(data.address, translate(ADDRESSES_LABEL) as TOptionsCategories),
      ...collectData(data.blocksIds, translate(BLOCKS_IDS_LABEL) as TOptionsCategories),
      ...collectData(data.blocksHeights, translate(BLOCKS_HEIGHTS_LABEL) as TOptionsCategories),
      ...collectData(data.transactions, translate(TRANSACTIONS_LABEL) as TOptionsCategories),
      ...collectData(data.senses, translate(SENSES_LABEL) as TOptionsCategories),
      ...collectData(data.pastelIds, translate(PASTEL_ID_LABEL) as TOptionsCategories),
      ...collectUsernameData(data.usernameList, translate(USERNAME) as TOptionsCategories),
    ];

    return setSearchData(groupedData.sort((a, b) => -b.category.localeCompare(a.category)));
  };

  const handleInputChange = _debounce(
    (_: React.ChangeEvent<Record<string, unknown>>, _value: string) => {
      const value = _value.replace(/\s\s+/g, ' ').trim();
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
    const id = setTimeout(() => {
      optionSelectedFromList.current = false;
    }, 600);

    return () => clearTimeout(id);
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
        filterOptions={filterOptions}
        groupBy={option => (option as TAutocompleteOptions).category}
        getOptionLabel={option => `${(option as TAutocompleteOptions).value}`}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onClose={handleClose}
        forcePopupIcon={false}
        getOptionSelected={(option, value) =>
          (option as TAutocompleteOptions).value === (value as TAutocompleteOptions).value
        }
        noOptionsText={translate('components.searchBar.noResults')}
        loadingText={translate('components.searchBar.loadingResults')}
        size="small"
        debug
        renderOption={option => {
          if ((option as TAutocompleteOptions).category === USERNAME) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}/${
                  (option as TAutocompleteOptions).pastelID
                }#${(option as TAutocompleteOptions).value}`}
                value={(option as TAutocompleteOptions).value}
              />
            );
          }
          if ((option as TAutocompleteOptions).category === SENSES_LABEL) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}?hash=${
                  (option as TAutocompleteOptions).value
                }`}
                value={(option as TAutocompleteOptions).value}
              />
            );
          }
          return (
            <RouterLink
              styles={{ padding: '6px 24px 6px 16px' }}
              route={`${getRoute((option as TAutocompleteOptions).category)}/${
                (option as TAutocompleteOptions).value
              }`}
              value={(option as TAutocompleteOptions).value}
            />
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={translate('components.searchBar.inputSearchLabel')}
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
    if (scrollTop <= 0 && forceShowSearchInput) {
      setForceShowSearchInput(false);
      setShowSearchInput(false);
      isClicked = false;
    } else {
      setForceShowSearchInput(!isClicked);
      setShowSearchInput(!isClicked);
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
          aria-label={translate('components.searchBar.openSearch')}
          onClick={handleClick}
        >
          <SearchIcon />
        </Styles.IconButton>
        <Hidden mdUp>
          <Grid item>
            <Styles.IconButton
              color="inherit"
              aria-label={translate('components.searchBar.openDrawer')}
              onClick={onOpenDrawerClick}
            >
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
