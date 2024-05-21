import { MarkerProps } from '@components/Map/Map';
import { Typography, Grid, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';

import * as Styles from './ExplorerMap.styles';

const generateDrawerInfoBlock = (description: string, value: string) => {
  return (
    <Styles.InfoBlock container direction="column">
      <Grid item>
        <Typography variant="caption">{parse(description)}</Typography>
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
        <Styles.TitleRow item className="subTitle">
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
                <Typography>{`${parse(translate(`pages.explorer.${type.toLowerCase()}`))} #${
                  index + 1
                }`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {generateDrawerInfoBlock(
                    translate('pages.explorer.latitudeLongitude'),
                    `${latLng[0]} | ${latLng[1]}`,
                  )}
                  {generateDrawerInfoBlock(translate('pages.explorer.country'), country)}
                  {generateDrawerInfoBlock(translate('pages.explorer.city'), city)}
                  {generateDrawerInfoBlock(translate('pages.explorer.ip'), ip)}
                </Grid>
              </AccordionDetails>
            </Styles.Accordion>
          </Grid>
        ))}
      </Grid>
    </Styles.Wrapper>
  );
};
