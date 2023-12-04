import * as React from 'react';
import { Typography, Dialog, AppBar, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { translate } from '@utils/helpers/i18n';
import parse from 'html-react-parser';

import * as Styles from '@pages/Details/TransactionDetails/TransactionDetails.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface ISenseRawDataProps {
  rawData: string;
  open: boolean;
  toggleOpen: () => void;
}

const SenseRawData: React.FC<ISenseRawDataProps> = ({ rawData, open, toggleOpen }) => {
  const classes = Styles.useStyles();
  return (
    <Dialog fullScreen open={open} onClose={toggleOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Styles.TransactionRawDataToolbar>
          <IconButton edge="start" color="inherit" onClick={toggleOpen} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {parse(translate('pages.senseDetails.senseRawData'))}
          </Typography>
        </Styles.TransactionRawDataToolbar>
      </AppBar>
      {rawData ? (
        <Styles.TransactionRawData>
          <code>{JSON.stringify(JSON.parse(JSON.parse(rawData)), null, 2)}</code>
        </Styles.TransactionRawData>
      ) : (
        parse(translate('pages.senseDetails.noData'))
      )}
    </Dialog>
  );
};

export default SenseRawData;
