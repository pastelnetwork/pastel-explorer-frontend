import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import { TAppTheme } from '@theme/index';
import { decompress_zstd_compressed_data_func } from '@utils/helpers/encryption';

import * as TicketStyles from '@components/Ticket/Ticket.styles';
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
        <Styles.ProgressBarItem style={{ width: `${value}%` }} />
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

export const getSimilarRegisteredImagesData = (rarenessScoresTable: string) => {
  if (!rarenessScoresTable) {
    return [];
  }
  const uncompressedRarenessScoresTable = decompress_zstd_compressed_data_func(rarenessScoresTable);
  let fancyGridData = [];
  for (let i = 0; i < Object.values(uncompressedRarenessScoresTable.image_hash).length; i += 1) {
    fancyGridData.push({
      image: `data:image/jpeg;base64,${uncompressedRarenessScoresTable.thumbnail[i][0]}`,
      imageHash: formatImageHash(uncompressedRarenessScoresTable.image_hash[i]),
      imageHashOriginal: uncompressedRarenessScoresTable.image_hash[i],
      dateTimeAdded: uncompressedRarenessScoresTable.register_time[i][0],
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

const SimilarRegisteredImages: React.FC<ISimilarRegisteredImages> = ({ rarenessScoresTable }) => {
  if (!rarenessScoresTable) {
    return null;
  }
  const fancyGridData = getSimilarRegisteredImagesData(rarenessScoresTable);

  return (
    <Styles.TableWrapper>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="customized table" className="custom-table latest-transactions">
          <TableHead className="table__row-header">
            <TableRow>
              <StyledTableCell component="th">Rank</StyledTableCell>
              <StyledTableCell component="th">Thumbnail</StyledTableCell>
              <StyledTableCell component="th">Image Hash</StyledTableCell>
              <StyledTableCell component="th">Date-Time Added</StyledTableCell>
              <StyledTableCell component="th">Match Type</StyledTableCell>
              <StyledTableCell component="th">Dupe Probability</StyledTableCell>
              <StyledTableCell component="th">Dupe Probability</StyledTableCell>
              <StyledTableCell component="th">Cosine Similarity</StyledTableCell>
              <StyledTableCell component="th">Cosine Gain</StyledTableCell>
              <StyledTableCell component="th">Hoeffding’s Dependency</StyledTableCell>
              <StyledTableCell component="th">Hoeffding Gain</StyledTableCell>
              <StyledTableCell component="th">Hilbert Schmidt Information Criteria</StyledTableCell>
              <StyledTableCell component="th">Hilbert Schmidt Gain</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fancyGridData?.map((item, index) => (
              <StyledTableRow
                className="table__row"
                key={item.imageHashOriginal}
                style={{
                  background: item.likelyDupe
                    ? 'linear-gradient(to bottom, #d9a7c7, #f4dae5)'
                    : undefined,
                }}
              >
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {index + 1}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <img src={item.image} alt={item.imageHashOriginal} />
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.imageHash}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.dateTimeAdded}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.matchType}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {(item.finalDupeProbability * 100).toFixed(2)}%
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <ProgressBar value={parseFloat((item.finalDupeProbability * 100).toFixed(2))} />
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.cosineSimilarity}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.cosineGain}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.hoeffdingDependency}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.hoeffdingGain}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.hilbertSchmidtInformationCriteria}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
                <StyledTableCell component="td" scope="row">
                  <TicketStyles.TicketContent className="white-space-nowrap">
                    {item.hilbertSchmidtGain}
                  </TicketStyles.TicketContent>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Styles.TableWrapper>
  );
};

export default SimilarRegisteredImages;