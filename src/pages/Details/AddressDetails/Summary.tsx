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
}

const Summary: React.FC<ISummaryProps> = ({ id, onChange, selectedChart }) => {
  const { outgoingSum, incomingSum } = useAddressDetails(id);

  return (
    <Styles.SummaryWrapper>
      <Styles.SummaryItem onClick={() => onChange('balance')}>
        <Styles.SummaryIcon className={`balance ${selectedChart === 'balance' ? 'active' : ''}`}>
          <Balance />
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate('pages.addressDetails.balance', { currency: getCurrencyName() })}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {formatNumber(incomingSum + outgoingSum, {
              decimalsLength: 2,
            })}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem onClick={() => onChange('sent')}>
        <Styles.SummaryIcon className={`sent ${selectedChart === 'sent' ? 'active' : ''}`}>
          <Sent />
        </Styles.SummaryIcon>
        <Styles.ItemWrapper>
          <Styles.SummaryLabel>
            {translate('pages.addressDetails.totalSent', { currency: getCurrencyName() })}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {formatNumber(outgoingSum, { decimalsLength: 2 })}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem onClick={() => onChange('received')}>
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
            {formatNumber(incomingSum, { decimalsLength: 2 })}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
    </Styles.SummaryWrapper>
  );
};

export default Summary;
