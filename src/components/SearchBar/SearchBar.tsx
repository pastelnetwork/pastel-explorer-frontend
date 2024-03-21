import * as React from 'react';
import { NavLink } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import { darken } from 'polished';
import parse from 'html-react-parser';

import { TextField, CircularProgress } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import MuiAutocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';

import Social from '@components/Social/Social';
import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { ISearchResponse } from '@utils/types/ISearch';
import ChooseCluster from '@components/ChooseCluster/ChooseCluster';
import RouterLink from '@components/RouterLink/RouterLink';
import { TAppTheme } from '@theme/index';
import breakpoints from '@theme/breakpoints';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';

import PastelLogoWhite from '@assets/images/pastel-logo-white.svg';
import PastelLogo from '@assets/images/pastel-logo.svg';

import * as SidebarStyles from '../Sidebar/Sidebar.styles';
import SwitchMode from './SwitchMode';
import * as Styles from './SearchBar.styles';
import {
  ADDRESSES_TEXT_LABEL,
  BLOCKS_IDS_TEXT_LABEL,
  TRANSACTIONS_TEXT_LABEL,
  BLOCKS_HEIGHTS_TEXT_LABEL,
  SENSES_TEXT_LABEL,
  PASTEL_ID_TEXT_LABEL,
  USERNAME_TEXT_LABEL,
  ADDRESSES_LABEL,
  BLOCKS_IDS_LABEL,
  TRANSACTIONS_LABEL,
  BLOCKS_HEIGHTS_LABEL,
  SENSES_LABEL,
  PASTEL_ID_LABEL,
  COLLECTION_LABEL,
  CASCADE_LABEL,
  USERNAME,
  COLLECTION,
  CASCADE,
  TOptionsCategories,
  getRoute,
  collectData,
  collectUsernameData,
  TAutocompleteOptions,
  collectCascadeData,
  collectCollectionData,
} from './SearchBar.helpers';

interface AppBarProps {
  isDarkMode: boolean;
}

export interface ISearchData {
  value: string | number;
  category: TOptionsCategories;
}

const useStyles = makeStyles((theme: TAppTheme) =>
  createStyles({
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
      margin: 0,
      background: theme.palette.background.default,
      border: 0,
      borderRadius: 4,
    },
  }),
);

let isClicked = false;

const filterOptions = createFilterOptions({
  trim: true,
});

const SearchBar: React.FC<AppBarProps> = ({ isDarkMode }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const optionSelectedFromList = React.useRef(false);
  const { fetchData } = useFetch<ISearchResponse>({ method: 'get', url: URLS.SEARCH_URL });
  const [searchData, setSearchData] = React.useState<Array<ISearchData>>([]);
  const [loading, setLoading] = React.useState(false);
  const [isShowSearchInput, setShowSearchInput] = React.useState(false);
  const [forceShowSearchInput, setForceShowSearchInput] = React.useState(false);
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [noResult, setNoResult] = React.useState(false);

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
      ...collectData(
        data.address,
        ADDRESSES_LABEL,
        parse(translate(ADDRESSES_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectData(
        data.blocksIds,
        BLOCKS_IDS_LABEL,
        parse(translate(BLOCKS_IDS_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectData(
        data.blocksHeights,
        BLOCKS_HEIGHTS_LABEL,
        parse(translate(BLOCKS_HEIGHTS_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectData(
        data.transactions,
        TRANSACTIONS_LABEL,
        parse(translate(TRANSACTIONS_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectData(
        data.senses,
        SENSES_LABEL,
        parse(translate(SENSES_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectData(
        data.pastelIds,
        PASTEL_ID_LABEL,
        parse(translate(PASTEL_ID_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectUsernameData(
        data.usernameList,
        USERNAME,
        parse(translate(USERNAME_TEXT_LABEL)) as TOptionsCategories,
      ),
      ...collectCascadeData(
        data.cascadeList,
        CASCADE,
        parse(translate(CASCADE_LABEL)) as TOptionsCategories,
      ),
      ...collectCollectionData(
        data.collectionNameList,
        COLLECTION,
        parse(translate(COLLECTION_LABEL)) as TOptionsCategories,
      ),
    ];
    setNoResult(!groupedData.length);
    return setSearchData(groupedData.sort((a, b) => -b.category.localeCompare(a.category)));
  };

  const handleInputChange = _debounce((_: React.SyntheticEvent<Element, Event>, _value: string) => {
    const value = _value.replace(/\s\s+/g, ' ').trim();
    if (optionSelectedFromList.current || !value.length) return null;
    !loading && setLoading(true);
    searchData.length && setSearchData([]);
    return fetchData({ params: { keyword: value } })
      .then(response => response && sortSearchData(response))
      .finally(() => setLoading(false));
  }, 500);

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

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  const isSearchOpen = Boolean(anchorEl);
  const dropdownOpen = Boolean(searchData.length) || loading;

  const renderSearchFooter = () => {
    return (
      <Styles.SearchFooter>
        <div className="search-footer-left">
          <h6>{parse(translate('components.searchBar.findMore'))}</h6>
          <p>{parse(translate('components.searchBar.connectCommunity'))}</p>
        </div>
        <Social className="social-search" />
      </Styles.SearchFooter>
    );
  };

  const renderNoResult = () => {
    return <Styles.EmptyBox>{parse(translate('components.searchBar.noResults'))}</Styles.EmptyBox>;
  };

  const handleCloseSearch = () => {
    setAnchorEl(null);
    setNoResult(false);
    setSearchData([]);
  };

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
        groupBy={option => (option as TAutocompleteOptions).categoryText}
        getOptionLabel={option => `${(option as TAutocompleteOptions).value}`}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onClose={handleClose}
        onFocus={handleFocus}
        onBlur={handleBlur}
        forcePopupIcon={false}
        isOptionEqualToValue={(option, value) =>
          (option as TAutocompleteOptions).value === (value as TAutocompleteOptions).value
        }
        noOptionsText={renderNoResult()}
        loadingText={parse(translate('components.searchBar.loadingResults'))}
        size="small"
        renderOption={(props, option) => {
          if ((option as TAutocompleteOptions).category === USERNAME) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px', display: 'block' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}/${
                  (option as TAutocompleteOptions).pastelID
                }#${(option as TAutocompleteOptions).value}`}
                value={(option as TAutocompleteOptions).value}
                key={`${(option as TAutocompleteOptions).category}-${
                  (option as TAutocompleteOptions).value
                }`}
                className="search-link"
                onClick={handleCloseSearch}
              />
            );
          }
          if ((option as TAutocompleteOptions).category === SENSES_LABEL) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px', display: 'block' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}?hash=${
                  (option as TAutocompleteOptions).value
                }`}
                value={(option as TAutocompleteOptions).value}
                key={`${(option as TAutocompleteOptions).category}-${
                  (option as TAutocompleteOptions).value
                }`}
                className="search-link"
                onClick={handleCloseSearch}
              />
            );
          }
          if ((option as TAutocompleteOptions).category === CASCADE) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px', display: 'block' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}?txid=${
                  (option as TAutocompleteOptions).transactionHash
                }`}
                value={(option as TAutocompleteOptions).value}
                key={`${(option as TAutocompleteOptions).category}-${
                  (option as TAutocompleteOptions).value
                }`}
                className="search-link"
                onClick={handleCloseSearch}
              />
            );
          }
          if ((option as TAutocompleteOptions).category === COLLECTION) {
            return (
              <RouterLink
                styles={{ padding: '6px 24px 6px 16px', display: 'block' }}
                route={`${getRoute((option as TAutocompleteOptions).category)}/${
                  (option as TAutocompleteOptions).alias
                }`}
                value={(option as TAutocompleteOptions).value}
                key={`${(option as TAutocompleteOptions).category}-${
                  (option as TAutocompleteOptions).value
                }`}
                className="search-link"
                onClick={handleCloseSearch}
              />
            );
          }
          return (
            <RouterLink
              styles={{ padding: '6px 24px 6px 16px', display: 'block' }}
              route={`${getRoute((option as TAutocompleteOptions).category)}/${
                (option as TAutocompleteOptions).value
              }`}
              value={(option as TAutocompleteOptions).value}
              key={`${(option as TAutocompleteOptions).category}-${
                (option as TAutocompleteOptions).value
              }`}
              className="search-link"
              onClick={handleCloseSearch}
            />
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={translateDropdown('components.searchBar.search')}
            InputLabelProps={{
              ...params.InputLabelProps,
              classes: {
                root: `${classes.labelInputRoot} label-input`,
              },
            }}
            autoFocus
            InputProps={{
              ...params.InputProps,
              classes: {
                root: `${classes.inputRoot} input`,
              },
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <button
                      type="button"
                      className="close-button"
                      aria-label="Cancel"
                      onClick={handleCloseSearch}
                    >
                      <CancelIcon className="cancel-icon" />
                    </button>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            variant="outlined"
          />
        )}
        PaperComponent={({ children }) => (
          <Styles.PaperComponentWrapper>
            {loading ? <Styles.EmptyBox>{children}</Styles.EmptyBox> : children}
            {renderSearchFooter()}
          </Styles.PaperComponentWrapper>
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

  const handleFakeButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchData([]);
    setAnchorEl(event.currentTarget);
    setNoResult(false);
  };

  const handleSearchClose = () => {
    setAnchorEl(null);
  };

  const renderFakeInput = () => {
    return (
      <Styles.FakeInput type="button" onClick={handleFakeButtonClick}>
        {parse(translate('components.searchBar.search'))}
      </Styles.FakeInput>
    );
  };

  const searchId = isSearchOpen ? 'search-popover' : undefined;

  const renderSearchContent = () => {
    return (
      <>
        {renderFakeInput()}
        <Styles.PopoverWrapper
          id={searchId}
          open={isSearchOpen}
          anchorEl={anchorEl}
          onClose={handleSearchClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Styles.SearchInputWrapper>
            {renderSearchInput()}
            {!dropdownOpen ? (
              <Box>
                {noResult ? (
                  <Styles.EmptyBox>
                    {parse(translate('components.searchBar.noResults'))}
                  </Styles.EmptyBox>
                ) : (
                  <Box className="search-feature">
                    <p className="search-feature-title">
                      {parse(translate('components.searchBar.searchBy'))}:
                    </p>
                    <ul className="search-feature-list">
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.blocksHeights'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.blocksIds'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.txID'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.addresses'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.pastelID'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.username'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.cascadeFilename'))}
                      </li>
                      <li className="search-feature-item">
                        {parse(translate('components.searchBar.senseImageHash'))}
                      </li>
                    </ul>
                  </Box>
                )}
                {renderSearchFooter()}
              </Box>
            ) : null}
          </Styles.SearchInputWrapper>
        </Styles.PopoverWrapper>
      </>
    );
  };

  return (
    <Styles.AppBar
      position="relative"
      elevation={0}
      className={`${isShowSearchInput ? 'search-show' : ''} ${forceShowSearchInput ? 'force' : ''}`}
    >
      <SidebarStyles.Brand
        component={NavLink}
        to={ROUTES.EXPLORER}
        button
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
      >
        <Box ml={1}>
          <SidebarStyles.BrandLogo
            src={isDarkMode ? PastelLogoWhite : PastelLogo}
            alt="Pastel Logo"
          />
        </Box>
      </SidebarStyles.Brand>
      <Styles.ToolbarStyle className="disable-padding">
        <Styles.GridStyle
          className={`top ${isInputFocus ? 'autocomplete-focus' : ''}`}
          container
          alignItems="center"
          wrap="nowrap"
        >
          {renderSearchContent()}
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
        <SwitchMode />
        <ChooseCluster />
      </Styles.ToolbarStyle>
      <Styles.GridStyle className="search-popup" container alignItems="center" wrap="nowrap">
        {renderFakeInput()}
      </Styles.GridStyle>
    </Styles.AppBar>
  );
};

export default SearchBar;
