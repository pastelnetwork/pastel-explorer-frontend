import { Skeleton } from '@mui/lab';
import parse from 'html-react-parser';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName, isPastelBurnAddress } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import Balance, { BurnBalance } from '@components/SvgIcon/Balance';
import Sent from '@components/SvgIcon/Sent';
import Received, { RedReceived } from '@components/SvgIcon/Received';

import * as Styles from './AddressDetails.styles';

interface ISummaryProps {
  id: string;
  onChange: (_value: string) => void;
  selectedChart: string;
  isBalanceLoading: boolean;
  outgoingSum: number;
  incomingSum: number;
}

const Summary: React.FC<ISummaryProps> = ({
  id,
  onChange,
  selectedChart,
  isBalanceLoading,
  outgoingSum,
  incomingSum,
}) => {
  const isBurnAddress = isPastelBurnAddress(id);

  return (
    <Styles.SummaryWrapper>
      <Styles.SummaryItem
        className={isBalanceLoading ? 'disable' : ''}
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
            {parse(translate('pages.addressDetails.balance', { currency: getCurrencyName() }))}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isBalanceLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(incomingSum - outgoingSum, {
                decimalsLength: 2,
              })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem
        className={isBalanceLoading ? 'disable' : ''}
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
            {parse(translate('pages.addressDetails.totalSent', { currency: getCurrencyName() }))}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isBalanceLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(Math.abs(outgoingSum), { decimalsLength: 2 })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
      <Styles.SummaryItem
        className={isBalanceLoading ? 'disable' : ''}
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
            {parse(
              translate(`pages.addressDetails.${isBurnAddress ? 'totalBurned' : 'totalReceived'}`, {
                currency: getCurrencyName(),
              }),
            )}
          </Styles.SummaryLabel>
          <Styles.SummaryValue>
            {isBalanceLoading ? (
              <Skeleton animation="wave" variant="text" />
            ) : (
              formatNumber(Math.abs(incomingSum), { decimalsLength: 2 })
            )}
          </Styles.SummaryValue>
        </Styles.ItemWrapper>
      </Styles.SummaryItem>
    </Styles.SummaryWrapper>
  );
};

export default Summary;
