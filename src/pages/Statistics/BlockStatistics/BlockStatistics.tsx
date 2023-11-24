import * as React from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';

// third party
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { Grid, darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import parse from 'html-react-parser';

import { TAppTheme } from '@theme/index';
import * as ROUTES from '@utils/constants/routes';
import { BlockUnconfirmed } from '@utils/types/ITransactions';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import BlockVisualization from './BlockVisualization/BlockVisualization';
import { ITransformBlocksData } from './BlockStatistics.helpers';
import MempoolModal from './MempoolModal';
import * as BlockVisualizationStyle from './BlockVisualization/BlockVisualization.styles';

import * as Styles from '../Statistics.styles';

gsap.registerPlugin(Flip);

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

type TLayout = {
  state?: Flip.FlipState;
  items: ITransformBlocksData[];
};

const StatisticsBlocks: React.FC<IStatisticsBlocks> = ({ blockElements, blocksUnconfirmed }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [openMempoolModal, setMempoolModal] = React.useState(false);
  const el = React.useRef(null);
  const q = gsap.utils.selector(el);
  const [ctx] = React.useState(() =>
    gsap.context(() => {
      // noop
    }),
  );
  const [layout, setLayout] = React.useState<TLayout>({
    items: [],
  });

  React.useEffect(() => {
    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    if (blockElements?.length) {
      if (!layout.items.length) {
        setLayout({
          items: blockElements,
        });
      } else if (blockElements[0].id !== layout.items[0].id) {
        setLayout({
          items: [...blockElements],
          state: Flip.getState([...q('.block-box')]),
        });
      }
    }
  }, [blockElements, q]);

  React.useLayoutEffect(() => {
    if (!layout.state) return;

    ctx.add(() => {
      Flip.from(layout.state as Flip.FlipState, {
        absolute: true,
        ease: 'power1.inOut',
        targets: q('.block-box'),
        scale: true,
        simple: true,
        onEnter: elements => {
          return gsap.fromTo(
            elements,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              delay: 0.2,
              duration: 0.3,
            },
          );
        },
      });
    });
  }, [ctx, layout]);

  const renderMempoolBlock = () => {
    const size =
      blocksUnconfirmed?.reduce((a, b) => {
        return a + b.size;
      }, 0) || 0;
    const txsCount =
      blocksUnconfirmed?.reduce((a, b) => {
        return a + b.txsCount;
      }, 0) || 0;
    const ticketsCount =
      blocksUnconfirmed?.reduce((a, b) => {
        return a + b.ticketsTotal;
      }, 0) || 0;

    return (
      <Grid item>
        <BlockVisualization
          title={translateDropdown('pages.statistics.mempool')}
          height={
            <span style={{ fontSize: 14 }}>
              {parse(translate('pages.statistics.pendingBlock'))}
            </span>
          }
          className="block-unconfirmed"
          size={translateDropdown('pages.statistics.size', {
            size: size ? (size / 1024).toFixed(2) : 0,
          })}
          transactionCount={
            txsCount > 1
              ? translateDropdown('pages.statistics.transactions', { txsCount })
              : translateDropdown('pages.statistics.transaction', { txsCount })
          }
          ticketsCount={
            ticketsCount > 1
              ? translateDropdown('pages.statistics.tickets', { ticketsCount })
              : translateDropdown('pages.statistics.ticket', { ticketsCount })
          }
          minutesAgo={translateDropdown('pages.statistics.blocksUnconfirmedTime', {
            time: blocksUnconfirmed ? blocksUnconfirmed.length * 10 : 0,
          })}
          clickHandler={() => (txsCount ? setMempoolModal(!openMempoolModal) : null)}
        />
      </Grid>
    );
  };

  return (
    <>
      <Styles.BlockWrapper>
        <Styles.BlockTitle>
          {parse(translate('pages.statistics.blocksStatistics'))}
        </Styles.BlockTitle>
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
              <BlockVisualizationStyle.BlockAnimationWrapper ref={el}>
                {layout.items
                  .slice(1, 8)
                  .map(
                    ({ id, height, size, transactionCount, minutesAgo, ticketsCount, status }) => (
                      <div key={id} className={`block-box ${status}`}>
                        <BlockVisualization
                          clickHandler={() => navigate(`${ROUTES.BLOCK_DETAILS}/${id}`)}
                          height={height}
                          size={size}
                          transactionCount={transactionCount}
                          minutesAgo={minutesAgo}
                          ticketsCount={ticketsCount}
                        />
                      </div>
                    ),
                  )}
              </BlockVisualizationStyle.BlockAnimationWrapper>
            </Styles.GridBlocksStatisticsRoot>
          ) : (
            <Styles.ChartSection>
              <>
                <Skeleton animation="wave" variant="rect" height={207} />
                <Styles.LoadingText>{parse(translate('common.loadingData'))}</Styles.LoadingText>
              </>
            </Styles.ChartSection>
          )}
        </Styles.GridStyle>
      </Styles.BlockWrapper>
      {openMempoolModal ? (
        <MempoolModal open onClose={() => setMempoolModal(!openMempoolModal)} />
      ) : null}
    </>
  );
};

export default StatisticsBlocks;
