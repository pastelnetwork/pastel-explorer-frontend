import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import parse from 'html-react-parser';

import { TAppTheme } from '@theme/index';
import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import * as TicketStyles from '@components/Ticket/Ticket.styles';
import imagePlaceholder from '@assets/images/no-image-placeholder.svg';

import * as Styles from './SenseDetails.styles';

export const StyledTableCell = withStyles((theme: TAppTheme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme: TAppTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

interface IProgressBar {
  value: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ value }) => {
  return (
    <Styles.ProgressBarWrapper>
      <Tooltip title={`${value}%`}>
        <Styles.ProgressBarItem className="progress-bar-item" style={{ width: `${value}%` }} />
      </Tooltip>
    </Styles.ProgressBarWrapper>
  );
};

interface ISimilarRegisteredImages {
  rarenessScoresTable: string;
}

const formatImageHash = (hash: string) => {
  return `${hash.substring(0, 10)}...`;
};

type TSimilarRegisteredImage = {
  image: string | null;
  imageHash: string;
  imageHashOriginal: string;
  dateTimeAdded: string;
  matchType: string;
  finalDupeProbability: number;
  cosineSimilarity: number;
  cosineGain: number;
  hoeffdingDependency: number;
  hoeffdingGain: number;
  hilbertSchmidtInformationCriteria: number;
  hilbertSchmidtGain: number;
  likelyDupe: boolean;
};

export const getSimilarRegisteredImagesData = (rarenessScoresTable: string) => {
  if (!rarenessScoresTable) {
    return [];
  }
  const uncompressedRarenessScoresTable = decompress_zstd_compressed_data_func(rarenessScoresTable);

  const getRegisterTime = (value: string | Array<string[]>) => {
    try {
      if (value?.length) {
        return value[0][0];
      }
      return value?.toString()?.split('.')[0];
    } catch {
      return '';
    }
  };
  let fancyGridData = [];
  for (let i = 0; i < Object.values(uncompressedRarenessScoresTable.image_hash).length; i += 1) {
    fancyGridData.push({
      image: uncompressedRarenessScoresTable.thumbnail[i]
        ? `data:image/jpeg;base64,${uncompressedRarenessScoresTable.thumbnail[i]}`
        : null,
      imageHash: formatImageHash(uncompressedRarenessScoresTable.image_hash[i]),
      imageHashOriginal: uncompressedRarenessScoresTable.image_hash[i],
      dateTimeAdded: getRegisterTime(uncompressedRarenessScoresTable.register_time[i]),
      likelyDupe: uncompressedRarenessScoresTable.is_likely_dupe[i],
      matchType: uncompressedRarenessScoresTable.match_type[i],
      finalDupeProbability: uncompressedRarenessScoresTable.final_dupe_probability[i],
      cosineSimilarity: uncompressedRarenessScoresTable.cos_scores[i],
      cosineGain: uncompressedRarenessScoresTable.cos_gains[i],
      hoeffdingDependency: uncompressedRarenessScoresTable.hoef_scores[i],
      hoeffdingGain: uncompressedRarenessScoresTable.hoef_gains[i],
      hilbertSchmidtInformationCriteria: uncompressedRarenessScoresTable.hsic_scores[i],
      hilbertSchmidtGain: uncompressedRarenessScoresTable.hsic_scores[i],
    });
  }
  if (fancyGridData.length) {
    fancyGridData = fancyGridData.sort((a, b) => b.finalDupeProbability - a.finalDupeProbability);
  }

  return fancyGridData;
};

interface ISimilarRegisteredImageRow {
  index: number;
  item: TSimilarRegisteredImage;
  totalItem: number;
}

const SimilarRegisteredImageRow: React.FC<ISimilarRegisteredImageRow> = ({
  item,
  index,
  totalItem,
}) => {
  const toggleHover = () => {
    const currentRow = document.getElementById(`table__row_${index}`);
    if (currentRow) {
      currentRow.classList.toggle('active');
    }
    if (index > 0) {
      const prevRow = document.getElementById(`table__row_${index - 1}`);
      if (prevRow) {
        prevRow.classList.toggle('prev_row_active');
      }
    }
    if (index < totalItem) {
      const nextRow = document.getElementById(`table__row_${index + 1}`);
      if (nextRow) {
        nextRow.classList.toggle('next_row_active');
      }
    }
  };

  return (
    <StyledTableRow
      className="table__row"
      id={`table__row_${index}`}
      style={{
        background: item.likelyDupe ? 'linear-gradient(to bottom, #d9a7c7, #f4dae5)' : undefined,
      }}
    >
      <StyledTableCell component="td" scope="row" align="center">
        <TicketStyles.TicketContent>{index + 1}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell
        component="td"
        scope="row"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="image-row"
      >
        <img src={item.image || imagePlaceholder} alt={item.imageHashOriginal} />
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>
          {item.matchType === 'Seed Image' ? (
            <>{item.imageHash}</>
          ) : (
            <RouterLink
              route={`${ROUTES.SENSE_DETAILS}?hash=${item.imageHashOriginal}`}
              value={item.imageHash}
              title={item.imageHash}
              className="address-link"
            />
          )}
        </TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.dateTimeAdded}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent
          className={`white-space-nowrap ${item.matchType === 'Seed Image' ? 'inline-flex' : ''}`}
        >
          {item.matchType}
          {item.matchType === 'Seed Image' ? (
            <Tooltip title={translateDropdown('pages.senseDetails.seedImagesInfo')}>
              <InfoIcon className="seed-images-info" />
            </Tooltip>
          ) : null}
        </TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>
          {(item.finalDupeProbability * 100).toFixed(2)}%
        </TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <ProgressBar value={parseFloat((item.finalDupeProbability * 100).toFixed(2))} />
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.cosineSimilarity}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.cosineGain}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.hoeffdingDependency}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.hoeffdingGain}</TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>
          {item.hilbertSchmidtInformationCriteria}
        </TicketStyles.TicketContent>
      </StyledTableCell>
      <StyledTableCell component="td" scope="row">
        <TicketStyles.TicketContent>{item.hilbertSchmidtGain}</TicketStyles.TicketContent>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const SimilarRegisteredImages: React.FC<ISimilarRegisteredImages> = ({ rarenessScoresTable }) => {
  if (!rarenessScoresTable) {
    return (
      <Styles.EmptyWrapper>
        <Styles.EmptyData>{parse(translate('common.noData'))}</Styles.EmptyData>
      </Styles.EmptyWrapper>
    );
  }
  const fancyGridData = getSimilarRegisteredImagesData(rarenessScoresTable);

  return (
    <Styles.TableWrapper>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="customized table" className="custom-table latest-transactions">
          <TableHead className="table__row-header">
            <TableRow>
              <StyledTableCell component="th" className="rank" align="center">
                {parse(translate('pages.senseDetails.rank'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="thumbnail">
                {parse(translate('pages.senseDetails.thumbnail'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="imageHash">
                {parse(translate('pages.senseDetails.imageHash'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="dateTimeAdded">
                {parse(translate('pages.senseDetails.dateTimeAdded'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="matchType">
                {parse(translate('pages.senseDetails.matchType'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="dupeProbability">
                {parse(translate('pages.senseDetails.dupeProbability'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="dupeProbability chart">
                {parse(translate('pages.senseDetails.dupeProbability'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="cosineSimilarity">
                {parse(translate('pages.senseDetails.cosineSimilarity'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="cosineGain">
                {parse(translate('pages.senseDetails.cosineGain'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="hoeffdingsDependency">
                {parse(translate('pages.senseDetails.hoeffdingsDependency'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="hoeffdingGain">
                {parse(translate('pages.senseDetails.hoeffdingGain'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="hilbertSchmidtInformationCriteria">
                {parse(translate('pages.senseDetails.hilbertSchmidtInformationCriteria'))}
              </StyledTableCell>
              <StyledTableCell component="th" className="hilbertSchmidtGain">
                {parse(translate('pages.senseDetails.hilbertSchmidtGain'))}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fancyGridData?.map((item, index) => (
              <SimilarRegisteredImageRow
                key={item.imageHashOriginal}
                item={item}
                index={index}
                totalItem={fancyGridData.length - 1}
              />
            ))}
            {!fancyGridData.length ? (
              <StyledTableRow className="table__row">
                <StyledTableCell component="td" scope="row" align="center" colSpan={13}>
                  <Styles.EmptyData>{translate('common.noData')}</Styles.EmptyData>
                </StyledTableCell>
              </StyledTableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Styles.TableWrapper>
  );
};

export default SimilarRegisteredImages;
