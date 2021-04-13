import * as React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

interface AlertComponentProps {
  isOpen: boolean;
  severity?: AlertProps['severity'];
  autoHideDuration?: number;
  message?: string;
  title?: string;
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  isOpen,
  onClose,
  severity = 'success',
  autoHideDuration = 4000,
  message = '',
  title = '',
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(isOpen);

  React.useEffect(() => setIsAlertOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setIsAlertOpen(false);
    return onClose && onClose();
  };

  return (
    <Snackbar open={isAlertOpen} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
