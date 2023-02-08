import * as React from 'react';
import { Grid } from '@material-ui/core';

import * as Styles from './Header.styles';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className = '' }) => {
  return (
    <Styles.Container className={className}>
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
