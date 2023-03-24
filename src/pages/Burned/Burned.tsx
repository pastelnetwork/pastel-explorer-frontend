import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';

import Overview from './Overview';
import Address from './Address';
import * as Styles from './Burned.styles';

const Burned = () => {
  return (
    <Styles.BurnedWrapper>
      <Address />
      <Grid container direction="column">
        <Grid item xs={12}>
          <Overview />
        </Grid>
      </Grid>
    </Styles.BurnedWrapper>
  );
};

export default Burned;
