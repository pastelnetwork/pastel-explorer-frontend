import { useSelector, useDispatch } from 'react-redux';

import { setResponseError } from '@redux/actions/responseErrorsActions';
import { AppStateType } from '@redux/reducers';

import { translate } from '@utils/helpers/i18n';
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
      title={translate('components.responseErrorAlert.title')}
      message={message || translate('components.responseErrorAlert.content')}
      severity="error"
      outsideClickClose={false}
      onClose={handleClose}
    />
  );
};

export default ResponseErrorAlert;
