import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName, isPastelBurnAddress } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import useAddressDetails from '@hooks/useAddressDetails';
import Balance, { BurnBalance } from '@components/SvgIcon/Balance';
import Sent from '@components/SvgIcon/Sent';
import Received, { RedReceived } from '@components/SvgIcon/Received';
import * as ROUTES from '@utils/constants/routes';

import * as Styles from './AddressDetails.styles';

interface ISummaryProps {
  id: string;
  onChange: (_value: string) => void;
  selectedChart: string;
  isBalanceLoading: boolean;
}

const Summary: React.FC<ISummaryProps> = ({ id, onChange, selectedChart, isBalanceLoading }) => {
  const history = useHistory();
  const isBurnAddress = isPastelBurnAddress(id);
  const { outgoingSum, incomingSum, isLoading, error } = useAddressDetails(id);

  if (error) {
    history.push(ROUTES.NOT_FOUND);
  }

  return (
    <Styles.SummaryWrapper>
      <Styles.SummaryItem
        className={isBalanceLoading || isLoading ? 'disable' : ''}
        onClick={() => onChange('balance')}
      >
        <Styles.SummaryIcon
          className={`balance ${isBurnAddress ? 'burn' : ''} ${
            selectedChart === 'balance' ? 'active' : ''
          }`}
        >
          {isBurnAddress ? <BurnBalance /> : <Balance />}
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate('pages.addressDetails.balance', { currency: getCurrencyName() })}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(incomingSum + outgoingSum, {
                decimalsLength: 2,
              })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem
        className={isBalanceLoading || isLoading ? 'disable' : ''}
        onClick={() => onChange('sent')}
      >
        <Styles.SummaryIcon
          className={`sent ${isBurnAddress ? 'burn' : ''} ${
            selectedChart === 'sent' ? 'active' : ''
          }`}
        >
          <Sent />
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate('pages.addressDetails.totalSent', { currency: getCurrencyName() })}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(outgoingSum > 0 ? outgoingSum * -1 : 0, { decimalsLength: 2 })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem
        className={isBalanceLoading || isLoading ? 'disable' : ''}
        onClick={() => onChange('received')}
      >
        <Styles.SummaryIcon
          className={`received ${isBurnAddress ? 'burn' : ''} ${
            selectedChart === 'received' ? 'active' : ''
          }`}
        >
          {isBurnAddress ? <RedReceived /> : <Received />}
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate(`pages.addressDetails.${isBurnAddress ? 'totalBurned' : 'totalReceived'}`, {
              currency: getCurrencyName(),
            })}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(incomingSum, { decimalsLength: 2 })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
    </Styles.SummaryWrapper>
  );
};

export default Summary;
