import { useEffect, useState } from 'react';

import { useUsdPrice } from '@hooks/useTransactionDetails';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { translateDropdown } from '@utils/helpers/i18n';

export const useStorageFee = (pslPrice: number) => {
  const { usdPrice } = useUsdPrice();
  const [storageFee, setStorageFee] = useState('0');

  useEffect(() => {
    if (pslPrice && usdPrice) {
      setStorageFee(
        ` (${formatNumber(pslPrice * usdPrice, { decimalsLength: 2 })} ${translateDropdown(
          'common.usd',
        )})`,
      );
    } else {
      setStorageFee(` (0 ${translateDropdown('common.usd')})`);
    }
  }, [pslPrice, usdPrice]);

  return {
    storageFee,
  };
};
