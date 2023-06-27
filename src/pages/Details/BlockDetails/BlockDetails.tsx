import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  CircularProgress,
  Grid,
  Tooltip,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import RouterLink, { ExternalLink } from '@components/RouterLink/RouterLink';
import Header from '@components/Header/Header';
import Table, { RowsProps } from '@components/Table/Table';
import CopyButton from '@components/CopyButton/CopyButton';
import Hourglass from '@components/Hourglass/Hourglass';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedDate } from '@utils/helpers/date/date';
import * as ROUTES from '@utils/constants/routes';
import { IBlock, IBlockTransaction } from '@utils/types/IBlocks';
import { formatAddress } from '@utils/helpers/format';
import { useSortData } from '@utils/hooks';
import { getCurrencyName } from '@utils/appInfo';
import * as TransactionStyles from '@pages/Details/TransactionDetails/TransactionDetails.styles';
import { getTicketsTypeList } from '@pages/Movement/Movement.helpers';
import useBlockDetails from '@hooks/useBlockDetails';
import { translate } from '@utils/helpers/i18n';
import * as BlockStyles from '@pages/Blocks/Blocks.styles';

import { blockHeaders, transactionHeaders, generateDetailsElement } from './BlockDetails.helpers';
import * as Styles from './BlockDetails.styles';
import TicketsList from './Tickets';

interface ParamTypes {
  id: string;
}

const BlockDetails = () => {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const { swrData, isLoading } = useBlockDetails(id);
  const [isMobile, setMobileView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [block, setBlock] = useState<IBlock | null>();
  const [transactions, handleClickSortTransaction] = useSortData<IBlockTransaction>({
    inititalData: block?.transactions || null,
  });

  const handleShowSubMenu = () => {
    setMobileView(false);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  useEffect(() => {
    if (swrData) {
      setBlock(swrData);
    }
  }, [isLoading, swrData]);

  const generateBlockTable = ({ height, confirmations, size, timestamp }: IBlock): RowsProps[] => {
    return [
      {
        id: 1,
        data: [
          { id: 1, value: height },
          { id: 3, value: formatNumber(confirmations) },
          { id: 4, value: formatNumber(size / 1024, { decimalsLength: 2 }) },
          { id: 6, value: formattedDate(timestamp, { dayName: false }) },
        ],
      },
    ];
  };

  const generateLatestTransactions = (data: Array<IBlockTransaction> | null): RowsProps[] => {
    if (!data) {
      return [];
    }
    const transactionList = data.map(transaction => {
      const ticketsTypeList = getTicketsTypeList(transaction.tickets || '');
      return {
        id: transaction.id,
        data: [
          {
            id: 1,
            value: (
              <Grid container alignItems="center" wrap="nowrap">
                <CopyButton copyText={transaction.id} />
                <RouterLink
                  route={`${ROUTES.TRANSACTION_DETAILS}/${transaction.id}`}
                  value={isMobile ? formatAddress(transaction.id) : transaction.id}
                  textSize="large"
                  className="transaction-hash"
                />
              </Grid>
            ),
          },
          { id: 2, value: transaction.recipientCount },
          {
            id: 3,
            value: (
              <div className="inline-block">
                {transaction.ticketsTotal === -1 ? (
                  <BlockStyles.HourglassWrapper>
                    <Hourglass />
                  </BlockStyles.HourglassWrapper>
                ) : (
                  <>
                    {ticketsTypeList.total > 0 ? (
                      <div className="inline-block">
                        <ExternalLink
                          href={`#${transaction.id}`}
                          value={ticketsTypeList.total.toString()}
                          className="transaction-hash"
                          title={ticketsTypeList.text.join(', <br />')}
                          isUseTooltip
                        />
                      </div>
                    ) : (
                      <>0</>
                    )}
                  </>
                )}
              </div>
            ),
          },
          {
            id: 4,
            value: (
              <>
                {transaction.totalAmount === 0 ? (
                  <Tooltip title={translate('pages.blockDetails.shieldedTooltip')}>
                    <span>{translate('common.unknown')}</span>
                  </Tooltip>
                ) : (
                  formatNumber(transaction.totalAmount, { decimalsLength: 2 })
                )}
              </>
            ),
          },
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
      const tooltip =
        type === 'previous'
          ? translate('pages.blockDetails.previousBlock')
          : translate('pages.blockDetails.nextBlock');

      return (
        <Tooltip title={tooltip} arrow>
          <Styles.IconButtonStyle className={type} onClick={() => handleBlockChange(hash)}>
            {icon}
          </Styles.IconButtonStyle>
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
        <Styles.Typography>{`${getCurrencyName()} block: ${currentBlock.id}`}</Styles.Typography>
        {generateHeaderNavigationElement(nextBlockHash, 'next')}
      </Grid>
    );
  };

  return block ? (
    <Styles.Wrapper>
      <Header title={translate('pages.blockDetails.blockDetails')} />
      <Grid container direction="column" spacing={2}>
        <Styles.GridStyle item>
          <Table
            title={generateTableHeaderWithNavigation(block)}
            headers={blockHeaders}
            rows={generateBlockTable(block)}
            // handleClickSort={handleClickSort}
            className="block"
            blockWrapperClassName="block-wrapper"
            tableWrapperClassName="block-table-wrapper"
          >
            <Styles.Accordion onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="see-more">
                  {isExpanded
                    ? translate('pages.blockDetails.seeLess')
                    : translate('pages.blockDetails.seeMore')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {generateDetailsElement(
                    translate('pages.blockDetails.difficulty'),
                    formatNumber(block.difficulty, { decimalsLength: 2 }),
                  )}
                  {generateDetailsElement(translate('pages.blockDetails.nonce'), block.nonce)}
                  {generateDetailsElement(
                    translate('pages.blockDetails.merkleRoot'),
                    block.merkleRoot,
                  )}
                  {generateDetailsElement(
                    translate('pages.blockDetails.previousBlock'),
                    block.previousBlockHash,
                  )}
                  {generateDetailsElement(
                    translate('pages.blockDetails.nextBlock'),
                    block.nextBlockHash,
                  )}
                </Grid>
              </AccordionDetails>
            </Styles.Accordion>
          </Table>
        </Styles.GridStyle>
        <Styles.GridStyle item>
          <Table
            title={translate('pages.blockDetails.transactions')}
            headers={transactionHeaders}
            rows={generateLatestTransactions(transactions)}
            handleClickSort={handleClickSortTransaction}
            className="transactions"
            tableWrapperClassName="transactions-table-wrapper"
            blockWrapperClassName="mb-12"
          />
        </Styles.GridStyle>
        {block?.tickets?.length ? (
          <Styles.GridStyle item>
            <TicketsList data={block?.tickets} senses={block?.senses} showActivationTicket />
          </Styles.GridStyle>
        ) : null}
      </Grid>
    </Styles.Wrapper>
  ) : (
    <TransactionStyles.LoadingWrapper>
      <TransactionStyles.Loader>
        <CircularProgress size={40} />
      </TransactionStyles.Loader>
    </TransactionStyles.LoadingWrapper>
  );
};

export default BlockDetails;
