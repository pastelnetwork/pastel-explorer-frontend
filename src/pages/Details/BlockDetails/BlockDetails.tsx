import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import RouterLink from '@components/RouterLink/RouterLink';
import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { ITransaction } from '@utils/types/ITransactions';
import { IBlock } from '@utils/types/IBlocks';

import { blockHeaders, transactionHeaders } from './BlockDetails.helpers';

interface ParamTypes {
  id: string;
}

const BlockDetails = () => {
  const { id } = useParams<ParamTypes>();

  const [block, setBlock] = React.useState<IBlock | null>();
  const [redirect, setRedirect] = React.useState(false);
  const { fetchData } = useFetch<{ data: IBlock }>({
    method: 'get',
    url: `${URLS.BLOCK_URL}/${id}`,
  });

  React.useEffect(() => {
    fetchData().then(response => {
      if (!response?.data) {
        setRedirect(true);
      } else {
        setBlock(response.data);
      }
    });
  }, [id]);

  const generateBlockTable = ({
    height,
    difficulty,
    confirmations,
    size,
    nonce,
    timestamp,
  }: IBlock): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          { id: 1, value: height },
          { id: 2, value: formatNumber(difficulty, { decimalsLength: 2 }) },
          { id: 3, value: formatNumber(confirmations) },
          { id: 4, value: formatNumber(size, { decimalsLength: 2 }) },
          { id: 5, value: nonce },
          { id: 6, value: formattedDate(timestamp) },
        ],
      },
    ];
  };

  const generateLatestTransactions = (transactions: Array<ITransaction>): RowsProps[] => {
    const transactionList = transactions.map(transaction => {
      return {
        id: transaction.id,
        data: [
          { id: 1, value: transaction.blockHash },
          {
            id: 2,
            value: (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${transaction.id}`}
                value={transaction.id}
              />
            ),
          },
          { id: 3, value: transaction.coinbase },
        ],
      };
    });

    return transactionList;
  };

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return block ? (
    <>
      <Header title="Block Details" />
      <Grid container direction="column">
        <Grid item>
          <Table
            title={`PSL block: ${block.id}`}
            headers={blockHeaders}
            rows={generateBlockTable(block)}
          />
        </Grid>
        <Grid item>
          <Table
            title="Latest Transactions"
            headers={transactionHeaders}
            rows={generateLatestTransactions(block.transactions)}
          />
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default BlockDetails;
