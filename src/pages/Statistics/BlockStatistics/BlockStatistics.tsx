import * as React from 'react';
// third party
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { Grid, darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { TAppTheme } from '@theme/index';
import * as ROUTES from '@utils/constants/routes';
import { BlockUnconfirmed } from '@utils/types/ITransactions';
import { translate } from '@utils/helpers/i18n';

import BlockVisualization from './BlockVisualization/BlockVisualization';
import { ITransformBlocksData } from './BlockStatistics.helpers';

import * as Styles from '../Statistics.styles';

const useStyles = makeStyles((_theme: TAppTheme) => ({
  wrapper: {
    margin: 0,
  },
  root: {
    padding: '25px 20px',
    overflowX: 'auto',
    width: '100%',
    margin: 0,
    marginBottom: 0,
    '&::-webkit-scrollbar': {
      background: _theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      background: darken(_theme.palette.background.paper, 0.5),
    },
  },
}));

interface IStatisticsBlocks {
  blockElements: ITransformBlocksData[];
  blocksUnconfirmed: BlockUnconfirmed[] | null;
}

const StatisticsBlocks: React.FC<IStatisticsBlocks> = ({ blockElements, blocksUnconfirmed }) => {
  const history = useHistory();
  const classes = useStyles();

  const renderMempoolBlock = () => {
    if (blocksUnconfirmed?.length) {
      const size = blocksUnconfirmed.reduce((a, b) => {
        return a + b.size;
      }, 0);
      const txsCount = blocksUnconfirmed.reduce((a, b) => {
        return a + b.txsCount;
      }, 0);

      return (
        <Grid item>
          <BlockVisualization
            title={translate('pages.statistics.mempool')}
            height={
              <span style={{ fontSize: 14 }}>{translate('pages.statistics.pendingBlock')}</span>
            }
            className="block-unconfirmed"
            size={translate('pages.statistics.size', { size: (size / 1024).toFixed(2) })}
            transactionCount={
              txsCount > 1
                ? translate('pages.statistics.transactions', { txsCount })
                : translate('pages.statistics.transaction', { txsCount })
            }
            minutesAgo={translate('pages.statistics.blocksUnconfirmedTime', {
              time: blocksUnconfirmed.length * 10,
            })}
          />
        </Grid>
      );
    }

    return null;
  };

  return (
    <>
      <Styles.BlockWrapper>
        <Styles.BlockTitle>{translate('pages.statistics.blocksStatistics')}</Styles.BlockTitle>
        <Styles.GridStyle classes={{ root: classes.wrapper }} container>
          {blockElements?.length ? (
            <Styles.GridBlocksStatisticsRoot
              wrap="nowrap"
              container
              justify="space-between"
              alignItems="center"
              spacing={8}
            >
              {renderMempoolBlock()}
              <Grid item>
                <div
                  style={{
                    width: 3,
                    height: 145,
                    borderLeft: '3px dashed',
                    marginLeft: -10,
                    marginTop: -30,
                  }}
                />
              </Grid>
              {blockElements
                .slice(1, 8)
                .map(({ id, height, size, transactionCount, minutesAgo }) => (
                  <Grid item key={id}>
                    <BlockVisualization
                      clickHandler={() => history.push(`${ROUTES.BLOCK_DETAILS}/${id}`)}
                      height={height}
                      size={size}
                      transactionCount={transactionCount}
                      minutesAgo={minutesAgo}
                    />
                  </Grid>
                ))}
            </Styles.GridBlocksStatisticsRoot>
          ) : (
            <Styles.ChartSection>
              <>
                <Skeleton animation="wave" variant="rect" height={207} />
                <Styles.LoadingText>{translate('common.loadingData')}</Styles.LoadingText>
              </>
            </Styles.ChartSection>
          )}
        </Styles.GridStyle>
      </Styles.BlockWrapper>
    </>
  );
};

export default StatisticsBlocks;
