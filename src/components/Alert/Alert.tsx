import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

import * as Styles from './Alert.styles';

interface AlertComponentProps {
  isOpen: boolean;
  severity?: AlertProps['severity'];
  autoHideDuration?: number;
  message?: React.ReactNode;
  title?: React.ReactNode;
  outsideClickClose?: boolean;
  onClose?: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  isOpen,
  onClose,
  severity = 'success',
  autoHideDuration = 4000,
  outsideClickClose = true,
  message = '',
  title = '',
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(isOpen);

  React.useEffect(() => setIsAlertOpen(isOpen), [isOpen]);

  const handleClose = () => {
    setIsAlertOpen(false);
    return onClose && onClose();
  };

  const handleOutsideClick = () => (outsideClickClose ? handleClose() : undefined);

  return (
    <Snackbar open={isAlertOpen} autoHideDuration={autoHideDuration} onClose={handleOutsideClick}>
      <Alert onClose={handleClose} severity={severity}>
        {title && <Styles.Title>{title}</Styles.Title>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;

AlertComponent.defaultProps = {
  severity: 'success',
  autoHideDuration: 4000,
  message: '',
  title: '',
  outsideClickClose: true,
  onClose: () => {},
};
