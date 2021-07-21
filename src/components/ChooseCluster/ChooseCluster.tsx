import { memo, FC, useCallback, MouseEvent, useMemo } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// import FilledInput from '@material-ui/core/FilledInput';
// import { CloseOutlined } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { AppStateType } from '@redux/reducers';
import { setApiHostingAction } from '@redux/actions/clusterAction';
import { TAppTheme } from '@theme/index';
import useBooleanState from '@hooks/useBooleanState';

const useStyles = makeStyles((theme: TAppTheme) => ({
  root: {
    padding: 20,
  },
  list: {
    width: 325,
    padding: '0 20px 20px 20px',
  },
  close: {
    minWidth: 'auto',
    paddingLeft: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'center',
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
    [theme.breakpoints.down('md')]: {
      whiteSpace: 'normal',
      fontSize: 14,
      lineHeight: '14px',
      padding: 5,
    },
  },
}));

const data = [
  {
    id: 'cluster-1',
    name: 'Mainnet Beta',
    value: 'mainnet',
    api: 'https://api.pastel.network.com',
  },
  {
    id: 'cluster-2',
    name: 'Testnet',
    value: 'testnet',
    api: 'https://api-test.pastel.network.com',
  },
  {
    id: 'cluster-3',
    name: 'Devnet',
    value: 'devnet',
    api: 'https://api-dev.pastel.network.com',
  },
];

interface IProps {
  url: string;
  setApiHosting: (_url: string) => void;
}

const ChooseCluster: FC<IProps> = ({ setApiHosting, url: apiURL }) => {
  const [open, { toggle }] = useBooleanState();
  const classes = useStyles();
  const { replace } = useHistory();
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
    (event: MouseEvent<HTMLButtonElement>) => {
      const { value, id } = event.currentTarget;
      const queryParams = new URLSearchParams(search);
      queryParams.set('cluster', value);
      if (value === 'mainnet') queryParams.delete('cluster');
      replace({
        search: queryParams.toString(),
      });
      setApiHosting(id);
    },
    [replace],
  );

  return (
    <>
      <Button
        classes={{ label: classes.rootButtonLabel }}
        type="button"
        onClick={toggle}
        variant="outlined"
        color="primary"
      >
        {currentCluster.name}
      </Button>
      <Drawer anchor="right" open={open} onClose={toggle} className={classes.root}>
        <div className={classes.list}>
          <Button type="button" className={classes.close} onClick={toggle}>
            ×
          </Button>
          <h1 className={classes.title}>Choose a Cluster</h1>
          {data.map(({ id, name, value, api }) => (
            <Button
              type="button"
              key={id}
              id={api}
              value={value}
              onClick={onChangeCluster}
              variant="outlined"
              color={currentCluster.value === value ? 'primary' : 'default'}
              classes={{ root: classes.item, label: classes.itemLabel }}
            >
              <span className={classes.itemTitle}>{name}:</span>
              <span className={classes.itemTitle}>{api}</span>
            </Button>
          ))}
        </div>
      </Drawer>
    </>
  );
};

const Cluster = connect(
  ({ cluster }: AppStateType) => ({ url: cluster.url }),
  dispatch => ({
    setApiHosting: (url: string) => dispatch(setApiHostingAction(url)),
  }),
)(ChooseCluster);

export default memo(Cluster);
