import { Grid, List } from '@material-ui/core';
import getYear from 'date-fns/getYear';

import { currentDate } from '@utils/helpers/date/date';

import * as Styles from './Footer.styles';

const Footer: React.FC = () => (
  <Styles.Wrapper>
    <Grid container spacing={0}>
      <Grid container item xs={12} md={6} justify="flex-end">
        <List>
          <Styles.ListItem button>
            <Styles.ListItemText primary={`© ${getYear(currentDate)} - Pastel`} />
          </Styles.ListItem>
        </List>
      </Grid>
    </Grid>
  </Styles.Wrapper>
);

export default Footer;
