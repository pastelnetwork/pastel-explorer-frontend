import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

import { translate } from '@utils/helpers/i18n';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import doc from '@assets/icons/filetypes/doc.svg';
import gif from '@assets/icons/filetypes/gif.svg';
import jpg from '@assets/icons/filetypes/jpg.svg';
import mp3 from '@assets/icons/filetypes/mp3.svg';
import pdf from '@assets/icons/filetypes/pdf.svg';
import png from '@assets/icons/filetypes/png.svg';
import svg from '@assets/icons/filetypes/svg.svg';
import txt from '@assets/icons/filetypes/txt.svg';
import unknown from '@assets/icons/filetypes/unknown.svg';
import xls from '@assets/icons/filetypes/xls.svg';
import zip from '@assets/icons/filetypes/zip.svg';
import avi from '@assets/icons/filetypes/avi.svg';
import mov from '@assets/icons/filetypes/mov.svg';
import mxf from '@assets/icons/filetypes/mxf.svg';
import mp4 from '@assets/icons/filetypes/mp4.svg';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import RqIds from './RqIds';
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
};

interface IFileInfo {
  data: TCascadeData | null;
}

const FileInfo: React.FC<IFileInfo> = ({ data }) => {
  const [opened, setOpened] = useState(false);

  if (!data) {
    return null;
  }
  const fileIcon = () => {
    switch (data.file_type) {
      case 'image/jpeg':
        return <img src={jpg} alt="jpg" />;
      case 'application/msword':
        return <img src={doc} alt="doc" />;
      case 'image/gif':
        return <img src={gif} alt="gif" />;
      case 'audio/mpeg':
        return <img src={mp3} alt="mp3" />;
      case 'application/pdf':
        return <img src={pdf} alt="pdf" />;
      case 'image/svg+xml':
        return <img src={svg} alt="svg" />;
      case 'text/plain':
        return <img src={txt} alt="txt" />;
      case 'application/vnd.ms-excel':
        return <img src={xls} alt="xls" />;
      case 'image/png':
        return <img src={png} alt="png" />;
      case 'video/mp4':
        return <img src={mp4} alt="mp4" />;
      case 'video/mxf':
        return <img src={mxf} alt="mxf" />;
      case 'video/avi':
        return <img src={avi} alt="avi" />;
      case 'video/mov':
        return <img src={mov} alt="mov" />;
      case 'application/zip':
      case 'application/x-gzip':
        return <img src={zip} alt="zip" />;
      default:
        return <img src={unknown} alt="unknown" />;
    }
  };

  return (
    <Styles.FileInfoWrapper>
      <Box className="file-container w-full">
        <Box className="icon">{fileIcon()}</Box>
        <Box className="file-content-info">
          <Box>
            <Typography className="file_name">{data.file_name}</Typography>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {translate('pages.cascade.fileSize')}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent>
                    {formatNumber(data.original_file_size_in_bytes / 1024, { decimalsLength: 2 })}{' '}
                    {translate('pages.cascade.kb')}
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {translate('pages.cascade.dataHash')}:
                  </TicketStyles.TicketTitle>
                  <TicketStyles.TicketContent className="view-more">
                    {data.data_hash}
                  </TicketStyles.TicketContent>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <TicketStyles.TicketTitle>
                    {translate('pages.cascade.makePubliclyAccessible')}:
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
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box className="raptor-q-parameters">
        <Typography className="title">{translate('pages.cascade.raptorQParameters')}</Typography>
        <Box className="mt-10">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {translate('pages.cascade.rqIc')}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_ic}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {translate('pages.cascade.rqMax')}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_max}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {translate('pages.cascade.rqOti')}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent>{data.rq_oti}</TicketStyles.TicketContent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <TicketStyles.TicketTitle>
                  {translate('pages.cascade.rqIds')}:
                </TicketStyles.TicketTitle>
                <TicketStyles.TicketContent
                  className={`expand-more ${opened ? 'opened' : ''}`}
                  onClick={() => setOpened(!opened)}
                >
                  {opened
                    ? translate('pages.cascade.hideAllRqIds')
                    : translate('pages.cascade.displayAllRqIds')}
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
