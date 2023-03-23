import { Skeleton } from '@material-ui/lab';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import useAddressDetails from '@hooks/useAddressDetails';
import Balance from '@components/SvgIcon/Balance';
import Sent from '@components/SvgIcon/Sent';
import Received from '@components/SvgIcon/Received';

import * as Styles from './AddressDetails.styles';

interface ISummaryProps {
  id: string;
  onChange: (_value: string) => void;
  selectedChart: string;
  isBalanceLoading: boolean;
}

const Summary: React.FC<ISummaryProps> = ({ id, onChange, selectedChart, isBalanceLoading }) => {
  const { outgoingSum, incomingSum, isLoading } = useAddressDetails(id);

  return (
    <Styles.SummaryWrapper>
      <Styles.SummaryItem
        className={isBalanceLoading || isLoading ? 'disable' : ''}
        onClick={() => onChange('balance')}
      >
        <Styles.SummaryIcon className={`balance ${selectedChart === 'balance' ? 'active' : ''}`}>
          <Balance />
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
        <Styles.SummaryIcon className={`sent ${selectedChart === 'sent' ? 'active' : ''}`}>
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
              formatNumber(outgoingSum, { decimalsLength: 2 })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem
        className={isBalanceLoading || isLoading ? 'disable' : ''}
        onClick={() => onChange('received')}
      >
        <Styles.SummaryIcon className={`received ${selectedChart === 'received' ? 'active' : ''}`}>
          <Received />
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate('pages.addressDetails.totalReceived', {
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
