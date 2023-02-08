import { Grid } from '@material-ui/core';

import Header from '@components/Header/Header';

import Sense from './Sense';
import Cascade from './Cascade';
import PastelNFT from './PastelNFT';
import Other from './Other';
import * as Styles from './Tickets.styles';

const Tickets: React.FC = () => {
  return (
    <Styles.TicketsContainer>
      <Header title="Tickets" className="mb-0" />
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} md={6} className="left">
          <Sense />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} md={6} className="right">
          <Cascade />
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} md={6} className="left">
          <PastelNFT />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} md={6} className="right">
          <Other />
        </Styles.GirdStyle>
      </Grid>
    </Styles.TicketsContainer>
  );
};

export default Tickets;
