import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IModalProps {
  open: boolean;
  title?: string;
  toggleOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ open, title, toggleOpen, children }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={toggleOpen}
    aria-labelledby={title}
    aria-describedby={`${title} historical data chart`}
  >
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default Modal;
