import * as React from 'react';
import { withTheme } from 'styled-components/macro';

import { Grid, Hidden, Theme, Toolbar, TextField } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import * as Styles from './SearchBar.styles';

interface AppBarProps {
  theme: Theme;
  onDrawerToggle: React.MouseEventHandler<HTMLElement>;
}

interface IOptions {
  value: string;
  category: string;
}

const MOCKED_DATA: IOptions[] = [
  {
    value: 'ff761b152c458cabfb7e4c6b98f64ad8c37841c68eedd111569d3e3a9a9db86d',
    category: 'Transactions',
  },
  {
    value: 'ff761b152c458cabfb7e4c6b98f64ad8c37841c68eedd111569d3e3a9a9db86d',
    category: 'Transactions',
  },
  {
    value: 'b5e347b4503786b0b6006db4c7a5e62be94d139093043d84276096a05841430e',
    category: 'Transactions',
  },
  { value: '44600', category: 'Block Heightes' },
  { value: '44598', category: 'Block Heightes' },
  { value: 'PtbxkRceZLApBBYg9ftY5CRSHYLfuGPkyhR', category: 'Addresses' },
  {
    value: '00000012f451fe53212548d865d4eda87847ca4870614b002eb7898c8aecc3b',
    category: 'Block Hashes',
  },
];

const SearchBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
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
            <Styles.Autocomplete
              options={MOCKED_DATA.sort((a, b) => -b.category.localeCompare(a.category))}
              // eslint-disable-next-line
              groupBy={(option: any) => option.category}
              // eslint-disable-next-line
              getOptionLabel={(option: any) => option.value}
              renderInput={params => (
                <TextField
                  {...params}
                  label="You may enter a block height, block hash, tx hash or address."
                  variant="outlined"
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
