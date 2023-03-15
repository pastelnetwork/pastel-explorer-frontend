import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import * as Styles from './Alert.styles';

const MyComponent = () => {
  return (
    <Snackbar open>
      <Alert severity="success">
        <button type="button">Click</button>
        <Styles.Title className="my-title-class">Title</Styles.Title>
        Content
      </Alert>
    </Snackbar>
  );
};

export default MyComponent;
