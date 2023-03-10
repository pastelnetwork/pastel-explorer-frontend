import { memo, ReactNode, useState } from 'react';
// import { BackIcon } from '@components/Icons';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// application
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import { statistics } from '@utils/constants/statistics';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './HistoricalStatisticsLayout.styles';

interface IProps {
  children: ReactNode;
  currentBgColor: string;
  title?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const HistoricalStatisticsLayout = ({ children, currentBgColor, title }: IProps) => {
  const classes = useStyles();
  const [selectedChart, setSelectedChart] = useState('0');
  const history = useHistory();

  const handleDropdownChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      const url = event.target.value as string;
      setSelectedChart(url);
      if (url !== '0') {
        history.push(url);
      }
    }
  };

  const generateChartOption = () => {
    const results: OptionsProps[] = [
      {
        name: title?.toString() || '',
        value: '0',
      },
    ];
    for (let i = 0; i < statistics.length; i += 1) {
      if (statistics[i].title !== title) {
        results.push({
          name: translate(statistics[i].title),
          value: statistics[i].url,
        });
      }
    }
    return results;
  };

  return (
    <div className={classes.root}>
      <div style={{ flex: 1 }}>
        <Styles.BackButtonWrapper>
          <Styles.BackButton type="button" onClick={() => history.goBack()}>
            <NavigateBeforeIcon /> {translate('components.historicalStatisticsLayout.back')}
          </Styles.BackButton>
          <Styles.DropdownWrapper>
            <Dropdown
              value={selectedChart}
              onChange={handleDropdownChange}
              options={generateChartOption()}
              label="Historical statistic:"
              classNameWrapper="historical-statistics"
            />
          </Styles.DropdownWrapper>
        </Styles.BackButtonWrapper>
        <Styles.ChartWrapper style={{ backgroundColor: currentBgColor }}>
          {children || <Skeleton animation="wave" variant="rect" height={386} />}
        </Styles.ChartWrapper>
      </div>
    </div>
  );
};

HistoricalStatisticsLayout.defaultProps = {
  title: '',
};

export default memo(HistoricalStatisticsLayout);
