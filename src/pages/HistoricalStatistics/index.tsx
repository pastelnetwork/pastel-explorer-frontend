import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
// application
import { statistics } from '@utils/constants/statistics';
import { translate } from '@utils/helpers/i18n';
import { getCurrencyName } from '@utils/appInfo';

import * as Styles from './StatisticsOvertime.styles';

const Statistics = () => {
  return (
    <Styles.Wrapper>
      <Styles.ContentWrapper>
        <Grid container spacing={3} alignItems="center">
          {statistics.map(({ id, image, title, url }) => (
            <Grid item key={id} className="card-item" xs={12} sm={6} lg={4} xl={3}>
              <Styles.CardItem>
                <Styles.BlockTitle>
                  <Link to={url}>{parse(translate(title, { currency: getCurrencyName() }))}</Link>
                </Styles.BlockTitle>
                <Styles.ChartImage>
                  <Link to={url}>
                    <img
                      alt=""
                      width="100%"
                      height="100%"
                      style={{ objectFit: 'contain' }}
                      src={image}
                    />
                  </Link>
                </Styles.ChartImage>
              </Styles.CardItem>
            </Grid>
          ))}
        </Grid>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default Statistics;
