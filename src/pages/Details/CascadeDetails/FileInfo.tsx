import { useState } from 'react';
import { Buffer } from 'buffer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import parse from 'html-react-parser';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import { formatAddress, formatBytes } from '@utils/helpers/format';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import RqIds from './RqIds';
import { getFileIcon } from './CascadeDetails.helpers';
import * as Styles from './CascadeDetails.styles';

type TCascadeData = {
  data_hash: string;
  file_name: string;
  file_type: string;
  make_publicly_accessible: boolean;
  original_file_size_in_bytes: number;
  rq_ic: number;
  rq_max: number;
  rq_oti: string;
  rq_ids: string[];
  creatorPastelID: string;
  currentOwnerPastelID: string;
};

interface IFileInfo {
  data: TCascadeData | null;
}

const getDataHash = (dataHash: string) => {
  const dataHashBase64 = dataHash;
  // Correct padding for base64, if necessary
  const paddedDataHashBase64 = dataHashBase64.padEnd(
    dataHashBase64.length + ((4 - (dataHashBase64.length % 4)) % 4),
    '=',
  );

  // Decode base64 and convert to hex
  const dataHashBytes = Buffer.from(paddedDataHashBase64, 'base64');
  return dataHashBytes.toString('hex');
};

const FileInfo: React.FC<IFileInfo> = ({ data }) => {
  const [opened, setOpened] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <Styles.FileInfoWrapper>
      <Box className="file-container w-full">
        <Box className="icon">{getFileIcon(data.file_type)}</Box>
        <Box className="file-content-info">
          <Box>
            <Typography className="file_name">{data.file_name}</Typography>
          </Box>
          <Box className="mt-4">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.cascade.fileSize'))}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent>
                    {formatBytes(data.original_file_size_in_bytes)}
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.cascade.dataHash'))}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent className="view-more">
                    <Tooltip title={getDataHash(data.data_hash)}>
                      <span>{formatAddress(getDataHash(data.data_hash), 30, -5)}</span>
                    </Tooltip>
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.cascade.makePubliclyAccessible'))}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent>
                    <TicketStyles.ActionRegistrationTicketStatus
                      className={`space-nowrap action-ticket-status ${
                        data.make_publicly_accessible ? 'active' : ''
                      }`}
                    >
                      {data.make_publicly_accessible ? <DoneIcon /> : <CloseIcon />}
                    </TicketStyles.ActionRegistrationTicketStatus>
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.cascade.creatorPastelID'))}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent>
                    {data.creatorPastelID ? (
                      <RouterLink
                        route={`${ROUTES.PASTEL_ID_DETAILS}/${data.creatorPastelID}`}
                        value={formatAddress(data.creatorPastelID, 5, -5)}
                        title={data.creatorPastelID}
                        className="address-link nowrap inline-block read-more full"
                      />
                    ) : (
                      parse(translate('common.na'))
                    )}
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {parse(translate('pages.cascade.currentOwnerPastelID'))}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent>
                    {data.creatorPastelID ? (
                      <RouterLink
                        route={`${ROUTES.PASTEL_ID_DETAILS}/${data.creatorPastelID}`}
                        value={formatAddress(data.creatorPastelID, 5, -5)}
                        title={data.creatorPastelID}
                        className="address-link nowrap inline-block read-more full"
                      />
                    ) : (
                      parse(translate('common.na'))
                    )}
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="raptor-q-parameters">
        <Typography className="title">
          {parse(translate('pages.cascade.raptorQParameters'))}
        </Typography>
        <Box className="mt-10">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.cascade.rqIc'))}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_ic}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.cascade.rqMax'))}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_max}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.cascade.rqOti'))}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_oti}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {parse(translate('pages.cascade.rqIds'))}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent
                  className={`expand-more ${opened ? 'opened' : ''}`}
                  onClick={() => setOpened(!opened)}
                >
                  {opened
                    ? parse(translate('pages.cascade.hideAllRqIds'))
                    : parse(translate('pages.cascade.displayAllRqIds'))}
                  <ExpandMoreIcon />
                </TicketStyles.TicketContent>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="rq-ids">
          <RqIds data={data.rq_ids} opened={opened} />
        </Box>
      </Box>
    </Styles.FileInfoWrapper>
  );
};

export default FileInfo;
