import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { IAddress, IAddressData } from '@utils/types/IAddress';
import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import { addressHeaders, transactionHeaders } from './AddressDetails.helpers';

interface ParamTypes {
  id: string;
}

const AddressDetails = () => {
  const { id } = useParams<ParamTypes>();
  const [addresses, setAddresses] = React.useState<IAddress | null>(null);
  const [redirect, setRedirect] = React.useState(false);
  const { fetchData } = useFetch<IAddress>({
    method: 'get',
    url: `${URLS.ADDRESS_URL}/${id}`,
  });

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response) {
        setRedirect(true);
      } else {
        setAddresses(response);
      }
    });
  }, [id]);

  const generateAddressSummary = ({ incomingSum, outgoingSum }: IAddress): RowsProps[] => {
    const outgoingAbsoluteSum = Math.abs(outgoingSum);

    return [
      {
        id: 1,
        data: [
          { id: 1, value: formatNumber(outgoingAbsoluteSum, { decimalsLength: 2 }) },
          { id: 2, value: formatNumber(incomingSum, { decimalsLength: 2 }) },
          { id: 3, value: formatNumber(incomingSum - outgoingAbsoluteSum, { decimalsLength: 2 }) },
        ],
      },
    ];
  };

  const generateLatestTransactions = (addressList: Array<IAddressData>): RowsProps[] => {
    const transactionList = addressList.map(({ amount, timestamp, transactionHash }) => {
      return {
        id: transactionHash,
        data: [
          { id: 1, value: formattedDate(timestamp) },
          {
            id: 2,
            value: (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${transactionHash}`}
                value={transactionHash}
              />
            ),
          },
          { id: 3, value: formatNumber(amount, { decimalsLength: 2 }) },
        ],
      };
    });

    return transactionList;
  };

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return addresses ? (
    <>
      <Header title="Address Details" />
      <Grid container direction="column">
        <Grid item>
          <Table
            title={`PSL address: ${id}`}
            headers={addressHeaders}
            rows={generateAddressSummary(addresses)}
          />
        </Grid>
        <Grid item>
          <Table
            title="Latest Transactions"
            headers={transactionHeaders}
            rows={generateLatestTransactions(addresses.data)}
          />
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default AddressDetails;
