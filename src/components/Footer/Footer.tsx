import { Grid } from '@material-ui/core';
import getYear from 'date-fns/getYear';

import Social from '@components/Social/Social';
import { currentDate } from '@utils/helpers/date/date';

import * as Styles from './Footer.styles';

const Footer: React.FC = () => (
  <Styles.Container>
    <Grid item>
      <Styles.Typography>{`© ${getYear(currentDate)} - Pastel Network`}</Styles.Typography>
    </Grid>
    <Social />
  </Styles.Container>
);

export default Footer;
