import * as React from 'react';

import { Grid, List } from '@material-ui/core';

import * as Styles from './Footer.styles';

const Footer: React.FC = () => (
  <Styles.Wrapper>
    <Grid container spacing={0}>
      <Grid container item xs={12} md={6} justify="flex-end">
        <List>
          <Styles.ListItem button>
            <Styles.ListItemText primary={`© ${new Date().getFullYear()} - Pastel`} />
          </Styles.ListItem>
        </List>
      </Grid>
    </Grid>
  </Styles.Wrapper>
);

export default Footer;
