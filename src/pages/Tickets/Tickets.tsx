import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Sense from './Sense';
import Cascade from './Cascade';
import PastelNFT from './PastelNFT';
import Other from './Other';
import * as Styles from './Tickets.styles';

const Tickets: React.FC = () => {
  const [isMobile, setMobileView] = useState(false);

  const handleResize = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Styles.TicketsContainer>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} lg={6} className="left">
          <Sense isMobile={isMobile} />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} lg={6} className="right">
          <Cascade isMobile={isMobile} />
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} lg={6} className="left">
          <PastelNFT isMobile={isMobile} />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} lg={6} className="right">
          <Other isMobile={isMobile} />
        </Styles.GirdStyle>
      </Grid>
    </Styles.TicketsContainer>
  );
};

export default Tickets;
