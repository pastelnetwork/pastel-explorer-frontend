import * as React from 'react';

import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as URLS from '@utils/constants/urls';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { ISummary, ISummaryStats } from '@utils/types/ISummary';

import themeVariant from '@theme/variants';

import Modal from '@components/Modal/Modal';
import BarChart from '@components/Charts/BarChart/BarChart';

import * as Styles from './Summary.styles';
import { initialSummaryList, calculateDifference, SummaryItemProps } from './Summary.helpers';

const Summary: React.FC = () => {
  const modalData = React.useRef<Partial<SummaryItemProps> | undefined>(undefined);
  const [summaryList, setSummaryList] = React.useState(initialSummaryList);
  const [openModal, setOpenModal] = React.useState(false);
  const { fetchData } = useFetch<ISummary>({ method: 'get', url: URLS.SUMMARY_URL });

  const generateSummaryData = (summary: ISummary) => {
    const { currentStats, lastDayStats } = summary;

    const updatedSummaryList = summaryList.map(summaryElement => {
      const key = summaryElement.key as keyof ISummaryStats;

      return {
        ...summaryElement,
        value: currentStats[key],
        previousValue: lastDayStats[key],
        difference: calculateDifference(currentStats[key], lastDayStats[key]),
      };
    });

    setSummaryList(updatedSummaryList);
  };

  const updateSummaryList = () => {
    fetchData().then(response => {
      if (!response) return null;
      return generateSummaryData(response);
    });
  };

  const handleToggleModal = (data: Partial<SummaryItemProps> | undefined = undefined) => () => {
    if (!openModal) {
      modalData.current = data;
    }

    return setOpenModal(prevState => !prevState);
  };

  React.useEffect(() => updateSummaryList(), []);

  return (
    <Styles.Grid container spacing={4}>
      <Modal open={openModal} toggleOpen={handleToggleModal()} title={modalData.current?.name}>
        {modalData.current && (
          <BarChart
            data={{
              labels: ['Yesterday', 'Today'],
              datasets: [
                {
                  data: [Number(modalData.current.previousValue), Number(modalData.current.value)],
                  // TODO take colors from theme
                  backgroundColor: ['#ef9a9a', '#28998a'],
                },
              ],
            }}
          />
        )}
      </Modal>

      {summaryList.map(
        ({ id, name, value, difference, previousValue, divideToAmount, decimals }) => (
          <Grid item xs={6} md={4} lg={2} key={id}>
            <Styles.Card my={0}>
              <Styles.CardContent onClick={handleToggleModal({ name, value, previousValue })}>
                <Styles.Typography variant="h6" my={2}>
                  {name}
                </Styles.Typography>
                <Styles.Typography variant="h4" my={2}>
                  <Styles.Values>
                    {value === null ? (
                      <Skeleton animation="wave" variant="text" />
                    ) : (
                      formatNumber(value, {
                        divideToAmount,
                        decimalsLength: decimals,
                      })
                    )}
                  </Styles.Values>
                </Styles.Typography>
                {difference === null ? (
                  <Skeleton animation="wave" variant="text" />
                ) : (
                  <Styles.Percentage
                    variant="subtitle2"
                    mb={4}
                    color="textSecondary"
                    noWrap
                    percentagecolor={`${
                      difference > 0 ? themeVariant.custom.green.dark : themeVariant.custom.red.dark
                    }`}
                  >
                    <span>
                      {`${difference > 0 ? '+' : ''}`}
                      {difference}%
                    </span>
                    Since yesterday
                  </Styles.Percentage>
                )}
              </Styles.CardContent>
            </Styles.Card>
          </Grid>
        ),
      )}
    </Styles.Grid>
  );
};

export default Summary;
