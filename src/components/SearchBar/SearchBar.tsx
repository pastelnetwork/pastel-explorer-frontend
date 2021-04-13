import { withTheme } from 'styled-components/macro';
import { Search as SearchIcon } from 'react-feather';

import { Grid, Hidden, Theme, Toolbar } from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import * as Styles from './SearchBar.styles';

interface AppBarProps {
  theme: Theme;
  onDrawerToggle: React.MouseEventHandler<HTMLElement>;
}

const SearchBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => (
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
          <Styles.Search>
            <Styles.SearchIconWrapper>
              <SearchIcon />
            </Styles.SearchIconWrapper>
            <Styles.Input placeholder="You may enter a block height, block hash, tx hash or address." />
          </Styles.Search>
        </Grid>
      </Grid>
    </Toolbar>
  </Styles.AppBar>
);

export default withTheme(SearchBar);
