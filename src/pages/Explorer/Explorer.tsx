import * as React from 'react';

import useStyles from './Explorer.styles';

import axios from '../../utils/axios/axios';

const Explorer: React.FC = () => {
  const classes = useStyles();

  React.useEffect(() => {
    axios.get('/ext/summary').then(response => console.log(response));
  }, []);

  return <div className={classes.container}>Explorer Page</div>;
};

export default Explorer;
