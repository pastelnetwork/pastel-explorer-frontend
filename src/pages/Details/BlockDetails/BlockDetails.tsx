import * as React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import {
  Grid,
  IconButton,
  Tooltip,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import RouterLink from '@components/RouterLink/RouterLink';
import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { useFetch } from '@utils/helpers/useFetch/useFetch';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import * as URLS from '@utils/constants/urls';
import * as ROUTES from '@utils/constants/routes';
import { IBlock, IBlockTransaction } from '@utils/types/IBlocks';

import { blockHeaders, transactionHeaders, generateDetailsElement } from './BlockDetails.helpers';
import * as Styles from './BlockDetails.styles';

interface ParamTypes {
  id: string;
}

const BlockDetails = () => {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  const [isExpanded, setIsExpanded] = React.useState(false);
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

  const generateBlockTable = ({ height, confirmations, size, timestamp }: IBlock): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          { id: 1, value: height },
          { id: 3, value: formatNumber(confirmations) },
          { id: 4, value: formatNumber(size, { decimalsLength: 2 }) },
          { id: 6, value: formattedDate(timestamp) },
        ],
      },
    ];
  };

  const generateLatestTransactions = (transactions: Array<IBlockTransaction>): RowsProps[] => {
    const transactionList = transactions.map(transaction => {
      return {
        id: transaction.id,
        data: [
          {
            id: 1,
            value: (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${transaction.id}`}
                value={transaction.id}
              />
            ),
          },
          { id: 2, value: transaction.recipientCount },
          { id: 3, value: formatNumber(transaction.totalAmount, { decimalsLength: 2 }) },
        ],
      };
    });

    return transactionList;
  };

  const handleBlockChange = (currentBlock: string) =>
    history.push(`${ROUTES.BLOCK_DETAILS}/${currentBlock}`);

  const generateHeaderNavigationElement = (hash: string, type: 'previous' | 'next') => {
    if (hash) {
      const icon = type === 'previous' ? <NavigateBeforeIcon /> : <NavigateNextIcon />;
      const tooltip = type === 'previous' ? 'Previous Block' : 'Next Block';

      return (
        <Tooltip title={tooltip} arrow>
          <IconButton onClick={() => handleBlockChange(hash)}>{icon}</IconButton>
        </Tooltip>
      );
    }

    return null;
  };

  const generateTableHeaderWithNavigation = (currentBlock: IBlock) => {
    const { previousBlockHash, nextBlockHash } = currentBlock;

    return (
      <Grid container justify="space-evenly" alignItems="center">
        {generateHeaderNavigationElement(previousBlockHash, 'previous')}
        <Styles.Typography>{`PSL block: ${currentBlock.id}`}</Styles.Typography>
        {generateHeaderNavigationElement(nextBlockHash, 'next')}
      </Grid>
    );
  };

  if (redirect) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  return block ? (
    <>
      <Header title="Block Details" />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Table
            title={generateTableHeaderWithNavigation(block)}
            headers={blockHeaders}
            rows={generateBlockTable(block)}
          />
        </Grid>
        <Grid item>
          <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{isExpanded ? 'Hide Details' : 'Show Details'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column">
                {generateDetailsElement(
                  'Difficulty',
                  formatNumber(block.difficulty, { decimalsLength: 2 }),
                )}
                {generateDetailsElement('Nonce', block.nonce)}
                {generateDetailsElement('Markle Root', block.merkleRoot)}
                {generateDetailsElement('Previous Block', block.previousBlockHash)}
                {generateDetailsElement('Next Block', block.nextBlockHash)}
              </Grid>
            </AccordionDetails>
          </Styles.Accordion>
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
