import { memo, FC, useCallback, MouseEvent, useMemo } from 'react';
import { Drawer, Button, Tooltip } from '@mui/material';
import parse from 'html-react-parser';

import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { AppStateType } from '@redux/reducers';
import { setApiHostingAction } from '@redux/actions/clusterAction';
import { InitialClusterProps } from '@redux/reducers/clusterReducer';
import { TAppTheme } from '@theme/index';
import useBooleanState from '@hooks/useBooleanState';
import { BASE_URL, BASE_URL_TESTNET, BASE_URL_DEVNET } from '@utils/constants/urls';
import { DEFAULT_CURRENCY, TEST_CURRENCY_NAME } from '@utils/appInfo';
import { getBaseURL } from '@utils/helpers/useFetch/useFetch';

import { ReactComponent as SettingIcon } from '@assets/icons/setting.svg';

import { translate } from '@utils/helpers/i18n';

import ExplorerAPI from './ExplorerAPI';
import * as Styles from './ChooseCluster.styles';

const useStyles = makeStyles((theme: TAppTheme) => ({
  root: {
    padding: 20,
  },
  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    width: 325,
    padding: '0 20px 10px 20px',
  },
  close: {
    minWidth: 'auto',
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: '100%',
    padding: '6px 14px',
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'left',
  },
  item: {
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
  },
  itemLabel: {
    flexDirection: 'column',
    justifyContent: 'start',
    textAlign: 'left',
  },
  itemTitle: {
    width: '100%',
  },
  rootButtonLabel: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(960)]: {
      whiteSpace: 'normal',
      fontSize: 14,
      lineHeight: '14px',
    },
  },
}));

interface IProps {
  url: string;
  setApiHosting: (_url: string, _currencyName: string) => void;
}

const ChooseCluster: FC<IProps> = ({ setApiHosting, url: apiURL }) => {
  const data = [
    {
      id: 'cluster-1',
      name: translate('components.chooseCluster.mainnetBeta'),
      value: 'mainnet',
      api: BASE_URL,
    },
    {
      id: 'cluster-2',
      name: translate('components.chooseCluster.testnet'),
      value: 'testnet',
      api: BASE_URL_TESTNET,
    },
    {
      id: 'cluster-3',
      name: translate('components.chooseCluster.devnet'),
      value: 'devnet',
      api: BASE_URL_DEVNET,
    },
  ];

  const [open, { toggle }] = useBooleanState();
  const classes = useStyles();
  const navigate = useNavigate();
  const { search } = useLocation();

  const currentCluster = useMemo(() => {
    if (apiURL) {
      const itemCluster = data.find(item => item.api === apiURL);
      if (itemCluster) {
        return itemCluster;
      }
    }
    return data[0];
  }, [apiURL]);

  const onChangeCluster = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      const { value, id } = event.currentTarget;
      const queryParams = new URLSearchParams(search);
      queryParams.set('cluster', value);
      if (value === 'mainnet') queryParams.delete('cluster');
      navigate({ search: queryParams.toString() });
      setApiHosting(id, value === 'mainnet' ? DEFAULT_CURRENCY : TEST_CURRENCY_NAME);
      window.location.reload();
    },
    [navigate],
  );

  const handleClusterClose = () => {
    toggle();
  };

  return (
    <>
      <Button
        type="button"
        onClick={toggle}
        variant="outlined"
        color="primary"
        className={`cluster-button ${classes.rootButtonLabel}`}
      >
        <Tooltip title={translate('components.chooseCluster.chooseACluster') || ''}>
          <SettingIcon className="cluster-icon" />
        </Tooltip>
      </Button>
      <Drawer anchor="right" open={open} onClose={toggle} className={classes.root}>
        <div className={classes.list}>
          <Button type="button" className={classes.close} onClick={handleClusterClose}>
            ×
          </Button>
          <Styles.ClusterWrapper>
            <h1 className={classes.title}>
              {parse(translate('components.chooseCluster.chooseACluster'))}
            </h1>
            {data.map(({ id, name, value, api }) => {
              if (!api) {
                return null;
              }

              return (
                <Styles.ButtonStyle
                  type="button"
                  key={id}
                  id={api}
                  value={value}
                  onClick={onChangeCluster}
                  variant="outlined"
                  className={currentCluster.value === value ? 'active' : ''}
                >
                  <span className={classes.itemTitle}>{parse(name)}:</span>
                  <span className={classes.itemTitle}>{api}</span>
                </Styles.ButtonStyle>
              );
            })}
          </Styles.ClusterWrapper>
          <Styles.ExplorerAPIWrapper>
            <h2 className={classes.title}>
              <span>{parse(translate('components.explorerAPI.title'))}</span>
              <Styles.LinkButton href={getBaseURL()} target="_blank" rel="noreferrer">
                {translate('components.explorerAPI.viewFullDocs')}
              </Styles.LinkButton>
            </h2>
            <Styles.ClusterWrapper className="explorer-api">
              <ExplorerAPI />
            </Styles.ClusterWrapper>
          </Styles.ExplorerAPIWrapper>
        </div>
      </Drawer>
    </>
  );
};

const Cluster = connect(
  ({ cluster }: AppStateType) => ({ url: (cluster as InitialClusterProps).url }),
  dispatch => ({
    setApiHosting: (url: string, currencyName: string) =>
      dispatch(setApiHostingAction(url, currencyName)),
  }),
)(ChooseCluster);

export default memo(Cluster);
