import * as React from 'react';
import { Grid } from '@material-ui/core';

import * as Styles from './Header.styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Styles.Container>
      <Grid justify="space-between" container>
        <Grid item>
          <Styles.Typography variant="h3" gutterBottom>
            {title}
          </Styles.Typography>
        </Grid>
      </Grid>
      <Styles.Divider my={1} />
    </Styles.Container>
  );
};

export default Header;
