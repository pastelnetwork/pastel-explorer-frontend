import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';

import Overview from './Overview';
import * as Styles from './Burned.styles';

const Burned = () => {
  return (
    <Styles.BurnedWrapper>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Overview />
        </Grid>
      </Grid>
    </Styles.BurnedWrapper>
  );
};

export default Burned;
