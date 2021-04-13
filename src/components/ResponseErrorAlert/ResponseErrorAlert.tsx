import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setResponseError } from '@redux/actions/responseErrorsActions';
import { AppStateType } from '@redux/reducers';

import AlertComponent from '@components/Alert/Alert';

const ResponseErrorAlert = () => {
  const hasError = useSelector((state: AppStateType) => state.responseErrorsReducer.error);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setResponseError(false));

  if (!hasError) {
    return null;
  }

  return (
    <AlertComponent
      isOpen={hasError}
      autoHideDuration={10000}
      title="There was a problem with the query"
      message="Not all data will be visible. Please try refreshing the page."
      severity="error"
      onClose={handleClose}
    />
  );
};

export default ResponseErrorAlert;
