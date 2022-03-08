import { MarkerProps } from '@components/Map/Map';
import { Typography, Grid, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import * as Styles from './ExplorerMap.styles';

const generateDrawerInfoBlock = (description: string, value: string) => {
  return (
    <Styles.InfoBlock container direction="column">
      <Grid item>
        <Typography variant="caption">{description}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Styles.InfoBlock>
  );
};

export const generateDrawerContent = ({ name, latLng, data }: MarkerProps) => {
  return (
    <Styles.Wrapper>
      <Grid container spacing={5}>
        <Styles.TitleRow item>
          <Styles.Title variant="h3">Map details</Styles.Title>
        </Styles.TitleRow>
        <Styles.TitleRow item>
          <Styles.SubTitle variant="h4" align="center" gutterBottom>
            {name}
          </Styles.SubTitle>
        </Styles.TitleRow>
      </Grid>
      <Grid container direction="column" spacing={2}>
        {data.map(({ type, country, city, id, ip }, index: number) => (
          <Grid item key={id}>
            <Styles.Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{`${type} #${index + 1}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {generateDrawerInfoBlock('Latitude | Longitude', `${latLng[0]} | ${latLng[1]}`)}
                  {generateDrawerInfoBlock('Country', country)}
                  {generateDrawerInfoBlock('City', city)}
                  {generateDrawerInfoBlock('Pastel ID', id)}
                  {generateDrawerInfoBlock('IP', ip)}
                </Grid>
              </AccordionDetails>
            </Styles.Accordion>
          </Grid>
        ))}
      </Grid>
    </Styles.Wrapper>
  );
};
