import { useSelector, useDispatch } from 'react-redux';

import { setResponseError } from '@redux/actions/responseErrorsActions';
import { AppStateType } from '@redux/reducers';

import AlertComponent from '@components/Alert/Alert';

const ResponseErrorAlert = () => {
  const { error, message } = useSelector((state: AppStateType) => state.responseErrorsReducer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setResponseError(false));

  if (!error) {
    return null;
  }

  return (
    <AlertComponent
      isOpen={error}
      title="There was a problem with the query"
      message={message || 'Not all data will be visible. Please try refreshing the page.'}
      severity="error"
      outsideClickClose={false}
      onClose={handleClose}
    />
  );
};

export default ResponseErrorAlert;
