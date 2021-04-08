import * as React from 'react';

import useStyles from './Explorer.styles';

const Explorer: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.container}>Explorer Page</div>;
};

export default Explorer;
