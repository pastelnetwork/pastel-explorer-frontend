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

import { formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { useUsdPrice } from '@hooks/useTransactionDetails';
import { getStorageFee } from '@pages/Tickets/Tickets.helpers';
import { getCurrencyName } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import { formatAddress, formatBytes } from '@utils/helpers/format';
import * as TicketStyles from '@components/Ticket/Ticket.styles';

import RqIds from './RqIds';
import { getFileIcon, getCascadeVolumeIcon } from './CascadeDetails.helpers';
import * as Styles from './CascadeDetails.styles';
import { fakeFilesData } from './mockup'

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
  sub_type?: string;
  name_of_original_file?: string;
  size_of_original_file_mb?: number;
  key?: string;
  secondary_key?: string;
  sha3_256_hash_of_original_file?: string;
  ticket?: {
    action_ticket: string;
    action_type: string;
    called_at: number;
    key: string;
    label: string;
    storage_fee: number;
    type: string;
    version: number;
    sub_type?: string;
    secondary_key?: string;
    contract_ticket?: string;
  };
  tx_info?: {
    compressed_size: number;
    compression_ratio: string;
    is_compressed: boolean;
    multisig_outputs_count: number;
    multisig_tx_total_fee: number;
    uncompressed_size: number;
  };
  volumes?: string[];
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
  const { usdPrice } = useUsdPrice();
  const [opened, setOpened] = useState(false);

  if (!data) {
    return null;
  }

  if (data?.ticket?.sub_type === 'cascade_multi_volume_metadata') {
    return (
      <Styles.FileInfoWrapper>
        <Box className="file-container w-full">
          <Box className="icon">{getCascadeVolumeIcon(data?.name_of_original_file || '')}</Box>
          <Box className="file-content-info">
            <Box>
              <Typography className="file_name">{data.name_of_original_file}</Typography>
            </Box>
            <Box className="mt-4">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <TicketStyles.TicketTitle>
                      {parse(translate('pages.cascade.fileSize'))}:
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {data.size_of_original_file_mb ?
                      formatBytes(data.size_of_original_file_mb * 1000000) : parse(translate('common.na'))
                      }
                    </TicketStyles.TicketContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <TicketStyles.TicketTitle>
                      {parse(translate('pages.cascade.dataHash'))}:
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent className="view-more">
                      {data.sha3_256_hash_of_original_file ?
                        <Tooltip title={data.sha3_256_hash_of_original_file}>
                          <span>{formatAddress(data.sha3_256_hash_of_original_file, 30, -5)}</span>
                        </Tooltip> : parse(translate('common.na'))
                      }
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
                      {parse(translate('pages.tickets.multisigOutputsCount'))}:
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {data?.tx_info?.multisig_outputs_count ? formatNumber(data?.tx_info.multisig_outputs_count) : parse(translate('common.na'))}
                    </TicketStyles.TicketContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <TicketStyles.TicketTitle>
                      {parse(translate('pages.tickets.key'))}:
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {data?.ticket?.key ?
                        <Tooltip title={getDataHash(data?.ticket?.key)}>
                          <span>{formatAddress(getDataHash(data?.ticket?.key), 30, -5)}</span>
                        </Tooltip> : parse(translate('common.na'))
                      }
                    </TicketStyles.TicketContent>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className="raptor-q-parameters">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography className="title">
                {parse(translate('pages.tickets.files'))}
              </Typography>
            </Grid>
          </Grid>
          <Box className="mt-10">
            {fakeFilesData?.map((item) => (
              <Styles.FileItem key={item.file_id} className='file-item'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.fileID'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {item.file_id}
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.uploadTimestamp'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {formatFullDate(new Date(item.upload_timestamp).getTime())}
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.taskID'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {item.task_id}
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.regTxID'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.reg_txid}`}
                        value={formatAddress(item.reg_txid, 15, -5)}
                        title={item.reg_txid}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.activationTxID'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.activation_txid}`}
                        value={formatAddress(item.activation_txid, 15, -5)}
                        title={item.activation_txid}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.reqBurnTxnAmount'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {formatNumber(item.req_burn_txn_amount)} {getCurrencyName()} {getStorageFee(item.req_burn_txn_amount, usdPrice)}
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.burnTxnId'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.burn_txn_id}`}
                        value={formatAddress(item.burn_txn_id, 15, -5)}
                        title={item.burn_txn_id}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.reqAmount'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      {formatNumber(item.req_amount)} {getCurrencyName()} {getStorageFee(item.req_amount, usdPrice)}
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.isConcluded'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <TicketStyles.ActionRegistrationTicketStatus
                        className={`space-nowrap action-ticket-status icon ${
                          item.is_concluded ? 'active' : ''
                        }`}
                      >
                        {item.is_concluded ? <DoneIcon /> : <CloseIcon />}
                      </TicketStyles.ActionRegistrationTicketStatus>
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.cascadeMetadataTicketId'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.TRANSACTION_DETAILS}/${item.cascade_metadata_ticket_id}`}
                        value={formatAddress(item.cascade_metadata_ticket_id, 15, -5)}
                        title={item.cascade_metadata_ticket_id}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.startBlock'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.BLOCK_DETAILS}/${item.start_block}`}
                        value={item.start_block}
                        title={item.start_block.toString()}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TicketStyles.TicketTitle>
                      {parse(translate('components.ticket.multiVolume.doneBlock'))}
                    </TicketStyles.TicketTitle>
                    <TicketStyles.TicketContent>
                      <RouterLink
                        route={`${ROUTES.BLOCK_DETAILS}/${item.done_block}`}
                        value={item.done_block}
                        title={item.done_block.toString()}
                        className="address-link nowrap inline-block read-more full"
                      />
                    </TicketStyles.TicketContent>
                  </Grid>
                </Grid>
              </Styles.FileItem>
            ))}
          </Box>
        </Box>
      </Styles.FileInfoWrapper>
    )
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
