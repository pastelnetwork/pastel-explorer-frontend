import { memo, ReactNode, useState } from 'react';
// import { BackIcon } from '@components/Icons';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// application
import { TAppTheme } from '@theme/index';
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import { statistics } from '@utils/constants/statistics';

import * as Styles from './HistoricalStatisticsLayout.styles';

interface IProps {
  children: ReactNode;
  currentBgColor: string;
  title?: string;
}

const useStyles = makeStyles((theme: TAppTheme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    border: 0,
    outline: 'unset',
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
    background: 'inherit',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    // fill: theme.palette.text.primary,
    stroke: theme.palette.text.primary,
    width: 24,
    height: 22,
    [theme.breakpoints.down('sm')]: {
      width: 19,
      height: 17,
    },
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
        name: 'Select chart',
        value: '0',
      },
    ];
    for (let i = 0; i < statistics.length; i += 1) {
      if (statistics[i].title !== title) {
        results.push({
          name: statistics[i].title,
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
            <NavigateBeforeIcon /> {title ? <span>{title}</span> : null}
          </Styles.BackButton>
          <Styles.DropdownWrapper>
            <Dropdown
              value={selectedChart}
              onChange={handleDropdownChange}
              options={generateChartOption()}
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
