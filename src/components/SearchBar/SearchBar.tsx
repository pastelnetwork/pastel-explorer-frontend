import * as React from 'react';
import { withTheme } from 'styled-components/macro';
import _debounce from 'lodash.debounce';

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

import RouterLink from '@components/RouterLink/RouterLink';

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

const useStyles = makeStyles({
  option: {
    padding: '0',
  },
});

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

  return (
    <Styles.AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <Styles.IconButton color="inherit" aria-label="Open drawer" onClick={onDrawerToggle}>
                <MenuIcon />
              </Styles.IconButton>
            </Grid>
          </Hidden>
          <Grid item style={{ width: '100%' }}>
            <MuiAutocomplete
              fullWidth
              style={{ margin: '12px 0' }}
              options={searchData}
              classes={classes}
              groupBy={option => option.category}
              getOptionLabel={option => `${option.value}`}
              loading={loading}
              onInputChange={handleInputChange}
              onChange={handleChange}
              getOptionSelected={(option, value) => option.value === value.value}
              noOptionsText="No results containing all your search terms were found"
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
                  label="You may enter a block height, block hash, tx hash or address"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </Styles.AppBar>
  );
};

export default withTheme(SearchBar);
