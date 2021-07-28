import * as React from 'react';
import { withTheme } from 'styled-components/macro';
import _debounce from 'lodash.debounce';
import { darken } from 'polished';

import {
  Grid,
  Hidden,
  Toolbar,
  Theme,
  TextField,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ISearchResponse } from '@utils/types/ISearch';
import ChooseCluster from '@components/ChooseCluster/ChooseCluster';
import RouterLink from '@components/RouterLink/RouterLink';
import { TAppTheme } from '@theme/index';

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

interface ISearchData {
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
    [theme.breakpoints.down('md')]: {
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

const SearchBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
  const classes = useStyles();
  const optionSelectedFromList = React.useRef(false);
  const { fetchData } = useFetch<ISearchResponse>({ method: 'get', url: URLS.SEARCH_URL });
  const [searchData, setSearchData] = React.useState<Array<ISearchData>>([]);
  const [loading, setLoading] = React.useState(false);

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
    (_: React.ChangeEvent<Record<string, unknown>>, value: string) => {
      if (optionSelectedFromList.current || value.length < 1) return null;

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
  return (
    <Styles.AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" wrap="nowrap">
          <Hidden mdUp>
            <Grid item>
              <Styles.IconButton color="inherit" aria-label="Open drawer" onClick={onDrawerToggle}>
                <MenuIcon />
              </Styles.IconButton>
            </Grid>
          </Hidden>
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
                  label="Search: You may enter a block height, block hash, tx hash or address"
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    classes: {
                      root: classes.labelInputRoot,
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      root: classes.inputRoot,
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
        </Grid>
        <Hidden mdDown>
          <SwitchMode />
          <ChooseCluster />
        </Hidden>
      </Toolbar>
    </Styles.AppBar>
  );
};

export default withTheme(SearchBar);
