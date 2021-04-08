import * as React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert, { AlertProps } from '@material-ui/lab/Alert';

interface AlertComponentProps {
  isOpen: boolean;
  severity?: AlertProps['severity'];
  autoHideDuration?: number;
  message?: string;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  isOpen,
  severity = 'success',
  autoHideDuration = 4000,
  message = '',
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(isOpen);

  React.useEffect(() => setIsAlertOpen(isOpen), [isOpen]);

  const handleClose = () => setIsAlertOpen(false);

  return (
    <Snackbar open={isAlertOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
