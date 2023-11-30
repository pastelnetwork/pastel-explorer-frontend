import * as React from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import * as Styles from './Header.styles';

interface HeaderProps {
  title: string | React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className = '' }) => {
  return (
    <Styles.Container className={className}>
      <Grid sx={{ justifyContent: 'space-between' }} container>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
    </Styles.Container>
  );
};

Header.defaultProps = {
  className: '',
};

export default Header;
