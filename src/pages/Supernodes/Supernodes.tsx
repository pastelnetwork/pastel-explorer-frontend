import { useState, useEffect, ChangeEvent, useRef, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import ExplorerMap from '@pages/Explorer/ExplorerMap/ExplorerMap';
import CopyButton from '@components/CopyButton/CopyButton';
import SupernodeStatistics from '@pages/Explorer/SupernodeStatistics/SupernodeStatistics';
import { INetworkSupernodes } from '@utils/types/INetwork';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { formattedTimeElapsed, formatFullDate } from '@utils/helpers/date/date';
import { formatAddress } from '@utils/helpers/format';
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import useSupernodes from '@hooks/useSupernodes';
import { translate, translateDropdown } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';
import * as TableStyles from '@components/Table/Table.styles';
import * as PastelIdStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';

import {
  STATUS_LIST,
  getCsvHeaders,
  getCsvData,
  generateStatusData,
  DATA_DEFAULT_SORT,
} from './Supernodes.helpers';
import * as Styles from './Supernodes.styles';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const Supernodes: React.FC = () => {
  const [order, setOrder] = useState(DATA_DEFAULT_SORT);
  const [orderBy, setOrderBy] = useState('lastPaidTime');
  const downloadRef = useRef(null);
  const { masternodes, isLoading } = useSupernodes();
  const [status, setStatus] = useState<string>(STATUS_LIST[0].value);
  const [originalSupernodes, setOriginalSupernodes] = useState<Array<INetworkSupernodes>>([]);
  const [currentSupernodes, setCurrentSupernodes] = useState<Array<INetworkSupernodes>>([]);
  const [supernodes, setSupernodes] = useState<Array<INetworkSupernodes>>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (masternodes?.length) {
      setOriginalSupernodes(masternodes);
      setCurrentSupernodes(masternodes);
      setSupernodes(masternodes);
    }
  }, [isLoading, masternodes]);

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setStatus(event.target.value as string);
      let newSupernodes: INetworkSupernodes[] = [];
      if (event.target.value !== 'all') {
        newSupernodes = originalSupernodes.filter(s => s.status === event.target.value);
        setCurrentSupernodes(originalSupernodes.filter(s => s.status === event.target.value));
      } else {
        newSupernodes = originalSupernodes;
        setCurrentSupernodes(originalSupernodes);
      }

      setSupernodes(newSupernodes);
    }
  };

  const generateStatusOptions = () => {
    const results: OptionsProps[] = [];
    STATUS_LIST.map((item: OptionsProps) => {
      let total = originalSupernodes.filter((i: INetworkSupernodes) => i.status === item.value)
        .length;
      if (item.value === 'all') {
        total = originalSupernodes.length;
      }
      if (total <= 0) {
        return item;
      }

      return results.push({
        value: item.value,
        name: `${translateDropdown(item.name)} (${total})`,
      });
    });

    return results;
  };

  const handleToggle = (address: string) => {
    const newList = [...selected];
    if (selected.includes(address)) {
      const index = newList.indexOf(address);
      if (index > -1) {
        newList.splice(index, 1);
      }
    } else {
      newList.push(address);
    }
    setSelected(newList);
  };

  const compare = (a: INetworkSupernodes, b: INetworkSupernodes) => {
    return order === DATA_DEFAULT_SORT
      ? descendingComparator(a, b, orderBy as keyof INetworkSupernodes)
      : -descendingComparator(a, b, orderBy as keyof INetworkSupernodes);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderSortIcon = (field: string) => {
    if (field !== orderBy) {
      return null;
    }
    return order === DATA_DEFAULT_SORT ? <ArrowDropDown /> : <ArrowDropUp />;
  };

  return (
    <>
      <Styles.Gird>
        <Styles.ExplorerMapColumn>
          <ExplorerMap hidePeer />
        </Styles.ExplorerMapColumn>
        <Styles.SupernodeColumn>
          <SupernodeStatistics />
        </Styles.SupernodeColumn>
      </Styles.Gird>
      <Styles.BlockWrapper>
        <Styles.GridWrapper item>
          <TableStyles.BlockWrapper className="mb-0">
            <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
              <Styles.TitleWrapper>
                <TableStyles.BlockTitle>
                  <Styles.Title>{parse(translate('pages.supernodes.supernodeList'))}</Styles.Title>{' '}
                  {supernodes.length > 0 ? (
                    <Styles.SubTitle>
                      (
                      {parse(
                        translate('pages.supernodes.totalSupernodes', {
                          total: formatNumber(originalSupernodes.length),
                        }),
                      )}
                      )
                    </Styles.SubTitle>
                  ) : null}
                </TableStyles.BlockTitle>
                <div className="filter-wrapper">
                  <Dropdown
                    value={status}
                    onChange={handleChange}
                    options={generateStatusOptions()}
                    label={translateDropdown('pages.supernodes.supernodeStatus')}
                    classNameWrapper="supernode-status"
                  />
                  <Styles.CSVLinkButton
                    data={getCsvData(currentSupernodes)}
                    filename="supernode_list.csv"
                    headers={getCsvHeaders()}
                    separator=","
                    ref={downloadRef}
                    className="download"
                  >
                    {parse(translate('pages.historicalStatistics.downloadCSV'))}
                  </Styles.CSVLinkButton>
                </div>
              </Styles.TitleWrapper>
            </PastelIdStyles.BlockWrapper>
            <Styles.ContentWrapper>
              <TableStyles.PaperWrapper>
                <TableStyles.TableWrapper className="scroll">
                  <Table className="custom-table activities-table offers">
                    <TableHead className="table__row-header">
                      <TableRow>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('ip')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.supernodeIP'))}
                            {renderSortIcon('ip')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('port')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.port'))}
                            {renderSortIcon('port')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('address')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.address'))}
                            {renderSortIcon('address')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('status')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.status'))}
                            {renderSortIcon('status')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('country')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.country'))}
                            {renderSortIcon('country')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell
                          className="nowrap"
                          onClick={() => handleRequestSort('lastPaidTime')}
                        >
                          <span className="header-cell">
                            {parse(translate('pages.supernodes.lastPaid'))}
                            {renderSortIcon('lastPaidTime')}
                          </span>
                        </TableStyles.TableCell>
                        <TableStyles.TableCell className="nowrap">&nbsp;</TableStyles.TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {supernodes?.sort(compare)?.map(masternode => (
                        <Fragment key={`${masternode.ip}:${masternode.port}`}>
                          <TableRow
                            className={`table__row ${
                              selected.includes(masternode.address) ? 'row_active' : ''
                            }`}
                          >
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.supernodeIP')}:`}
                              className="cell-content nowrap"
                            >
                              {masternode.ip}
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.port')}:`}
                              className="cell-content nowrap"
                            >
                              {masternode.port}
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.address')}:`}
                              className="cell-content nowrap read-more"
                            >
                              <span className="wrapper-content">
                                <CopyButton copyText={masternode.address} />
                                <RouterLink
                                  route={`${ROUTES.ADDRESS_DETAILS}/${masternode.address}`}
                                  value={masternode.address}
                                  textSize="large"
                                  title={masternode.address}
                                  className="address-link"
                                />
                              </span>
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.status')}:`}
                              className="cell-content nowrap"
                            >
                              {generateStatusData(masternode.status)}
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.country')}:`}
                              className="cell-content nowrap"
                            >
                              {masternode.country}
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.lastPaid')}:`}
                              className="cell-content nowrap"
                            >
                              {formattedTimeElapsed(masternode.lastPaidTime)}
                            </TableStyles.RowCell>
                            <TableStyles.RowCell
                              data-title={`${translateDropdown('pages.supernodes.seeMore')}:`}
                              className="cell-content nowrap see-more"
                              width="50px"
                            >
                              <Tooltip
                                title={
                                  selected.includes(masternode.address)
                                    ? translateDropdown('pages.supernodes.seeLess')
                                    : translateDropdown('pages.supernodes.seeMore')
                                }
                              >
                                <IconButton
                                  onClick={() => handleToggle(masternode.address)}
                                  className={selected.includes(masternode.address) ? 'open' : ''}
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </Tooltip>
                            </TableStyles.RowCell>
                          </TableRow>
                          {selected.includes(masternode.address) ? (
                            <TableRow className="row_more_active">
                              <TableStyles.TableCell colSpan={7}>
                                <div className="masternode-detail">
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.rank'))}
                                    </Box>
                                    <Box className="bold">
                                      {masternode.masternodeRank < 0
                                        ? parse(translate('common.na'))
                                        : masternode.masternodeRank}
                                    </Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.lastPaidBlock'))}
                                    </Box>
                                    <Box className="bold">
                                      <RouterLink
                                        route={`${ROUTES.BLOCK_DETAILS}/${masternode.lastPaidBlock}`}
                                        value={masternode.lastPaidBlock}
                                        textSize="large"
                                        title={masternode.lastPaidBlock.toString()}
                                        className="address-link"
                                      />
                                    </Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.snPastelIdPubkey'))}
                                    </Box>
                                    <Box className="bold">
                                      <span className="wrapper-content">
                                        <CopyButton copyText={masternode.snPastelIdPubkey} />
                                        <RouterLink
                                          route={`${ROUTES.PASTEL_ID_DETAILS}/${masternode.snPastelIdPubkey}`}
                                          value={formatAddress(masternode.snPastelIdPubkey, 5, -5)}
                                          textSize="large"
                                          title={masternode.snPastelIdPubkey}
                                          className="address-link"
                                        />
                                      </span>
                                    </Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.city'))}
                                    </Box>
                                    <Box className="bold">{masternode.city}</Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.rankAsOfBlockHeight'))}
                                    </Box>
                                    <Box className="bold">
                                      {masternode.rankAsOfBlockHeight < 0 ? (
                                        parse(translate('common.na'))
                                      ) : (
                                        <RouterLink
                                          route={`${ROUTES.BLOCK_DETAILS}/${masternode.rankAsOfBlockHeight}`}
                                          value={masternode.rankAsOfBlockHeight}
                                          textSize="large"
                                          title={masternode.rankAsOfBlockHeight.toString()}
                                          className="address-link"
                                        />
                                      )}
                                    </Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.activeSeconds'))}
                                    </Box>
                                    <Box className="bold">{masternode.activeSeconds}</Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.protocolVersion'))}
                                    </Box>
                                    <Box className="bold">{masternode.protocolVersion}</Box>
                                  </div>
                                  <div>
                                    <Box className="title">
                                      {parse(translate('pages.supernodes.dateTimeLastSeen'))}
                                    </Box>
                                    <Box className="bold">
                                      {formatFullDate(masternode.dateTimeLastSeen * 1000)}
                                    </Box>
                                  </div>
                                </div>
                              </TableStyles.TableCell>
                            </TableRow>
                          ) : null}
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableStyles.TableWrapper>
              </TableStyles.PaperWrapper>
            </Styles.ContentWrapper>
          </TableStyles.BlockWrapper>
        </Styles.GridWrapper>
      </Styles.BlockWrapper>
    </>
  );
};

export default Supernodes;
