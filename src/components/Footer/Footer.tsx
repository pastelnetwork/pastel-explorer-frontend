import { Grid } from '@material-ui/core';
import getYear from 'date-fns/getYear';

import { currentDate } from '@utils/helpers/date/date';

import * as Styles from './Footer.styles';

const Footer: React.FC = () => (
  <Styles.Container>
    <Grid item>
      <Styles.Typography>{`© ${getYear(currentDate)} - Pastel`}</Styles.Typography>
    </Grid>
  </Styles.Container>
);

export default Footer;
