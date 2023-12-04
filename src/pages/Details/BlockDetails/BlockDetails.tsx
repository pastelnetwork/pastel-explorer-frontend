import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import {
  CircularProgress,
  Grid,
  Tooltip,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as BlockStyles from '@pages/Blocks/Blocks.styles';

import { blockHeaders, transactionHeaders, generateDetailsElement } from './BlockDetails.helpers';
import * as Styles from './BlockDetails.styles';
import TicketsList from './Tickets';

const BlockDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { swrData, isLoading } = useBlockDetails(id as string);
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

  const renderTicketsTypeList = (transaction: IBlockTransaction) => {
    if (transaction.ticketsTotal === -1) {
      return (
        <BlockStyles.HourglassWrapper>
          <Hourglass />
        </BlockStyles.HourglassWrapper>
      );
    }
    const ticketsTypeList = getTicketsTypeList(transaction.tickets || '');
    if (ticketsTypeList.total > 0) {
      return (
        <div className="inline-block">
          <ExternalLink
            href={`#${transaction.id}`}
            value={ticketsTypeList.total.toString()}
            className="transaction-hash"
            title={ticketsTypeList.text.join(', <br />')}
            isUseTooltip
          />
        </div>
      );
    }

    return <span>0</span>;
  };

  const renderTotalAmount = (transaction: IBlockTransaction) => {
    if (transaction.totalAmount === 0) {
      return (
        <Tooltip title={translateDropdown('pages.blockDetails.shieldedTooltip')}>
          <span>{parse(translate('common.unknown'))}</span>
        </Tooltip>
      );
    }
    return <span>{formatNumber(transaction.totalAmount, { decimalsLength: 2 })}</span>;
  };

  const generateLatestTransactions = (data: Array<IBlockTransaction> | null): RowsProps[] => {
    if (!data) {
      return [];
    }
    const transactionList = data.map(transaction => {
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
            value: <div className="inline-block">{renderTicketsTypeList(transaction)}</div>,
          },
          {
            id: 4,
            value: renderTotalAmount(transaction),
          },
        ],
      };
    });

    return transactionList;
  };

  const handleBlockChange = (currentBlock: string) =>
    navigate(`${ROUTES.BLOCK_DETAILS}/${currentBlock}`);

  const generateHeaderNavigationElement = (hash: string, type: 'previous' | 'next') => {
    if (hash) {
      const icon = type === 'previous' ? <NavigateBeforeIcon /> : <NavigateNextIcon />;
      const tooltip =
        type === 'previous'
          ? parse(translate('pages.blockDetails.previousBlock'))
          : parse(translate('pages.blockDetails.nextBlock'));

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
      <Grid container sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        {generateHeaderNavigationElement(previousBlockHash, 'previous')}
        <Styles.Typography>{`${getCurrencyName()} block: ${currentBlock.id}`}</Styles.Typography>
        {generateHeaderNavigationElement(nextBlockHash, 'next')}
      </Grid>
    );
  };

  return block ? (
    <Styles.Wrapper>
      <Header title={parse(translate('pages.blockDetails.blockDetails'))} />
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
                    ? parse(translate('pages.blockDetails.seeLess'))
                    : parse(translate('pages.blockDetails.seeMore'))}
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
            title={parse(translate('pages.blockDetails.transactions'))}
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
