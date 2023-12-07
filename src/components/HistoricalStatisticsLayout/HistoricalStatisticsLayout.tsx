import { memo, ReactNode, useState } from 'react';
// import { BackIcon } from '@components/Icons';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import parse from 'html-react-parser';
import { SelectChangeEvent } from '@mui/material/Select';
// application
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import { statistics } from '@utils/constants/statistics';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import { getCurrencyName } from '@utils/appInfo';

import * as Styles from './HistoricalStatisticsLayout.styles';

interface IProps {
  children: ReactNode;
  currentBgColor: string;
  title?: string | ReactNode;
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
  const navigate = useNavigate();

  const handleDropdownChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      const url = event.target.value as string;
      setSelectedChart(url);
      if (url !== '0') {
        navigate(url);
      }
    }
  };

  const generateChartOption = () => {
    const results: OptionsProps[] = [
      {
        name: title && title !== '[object Object]' ? title?.toString() : '',
        value: '0',
      },
    ];
    for (let i = 0; i < statistics.length; i += 1) {
      if (statistics[i].title !== title) {
        results.push({
          name: translateDropdown(statistics[i].title, { currency: getCurrencyName() }),
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
          <Styles.BackButton type="button" onClick={() => navigate(-1)}>
            <NavigateBeforeIcon /> {parse(translate('components.historicalStatisticsLayout.back'))}
          </Styles.BackButton>
          <Styles.DropdownWrapper>
            <Dropdown
              value={selectedChart}
              onChange={handleDropdownChange}
              options={generateChartOption()}
              label={`${translateDropdown(
                'components.historicalStatisticsLayout.historicalStatistic',
              )}:`}
              classNameWrapper="historical-statistics"
            />
          </Styles.DropdownWrapper>
        </Styles.BackButtonWrapper>
        <Styles.ChartWrapper style={{ backgroundColor: currentBgColor }}>
          {children || <Skeleton animation="wave" variant="rectangular" height={386} />}
        </Styles.ChartWrapper>
      </div>
    </div>
  );
};

HistoricalStatisticsLayout.defaultProps = {
  title: '',
};

export default memo(HistoricalStatisticsLayout);
