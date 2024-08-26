import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { getCurrencyName } from '@utils/appInfo';
import RouterLink from '@components/RouterLink/RouterLink';
import { formattedDate, formatFullDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import {
  IMultiVolumeTicket,
  IMultiVolumeFIle,
} from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';
import { formatBytes, formatAddress } from '@utils/helpers/format';
import { fakeFilesData } from '@pages/Details/CascadeDetails/mockup';
import * as CascadeDetailsStyles from '@pages/Details/CascadeDetails/CascadeDetails.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import { useUsdPrice } from '@hooks/useTransactionDetails';

import { getStorageFee } from './Ticket.helpers';
import * as Styles from './Ticket.styles';

interface ICascadeMultiVolumeTicketProps {
  ticket: IMultiVolumeTicket;
  showFull?: boolean;
}

const Files = ({ files }: { files: IMultiVolumeFIle[]}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { usdPrice } = useUsdPrice();

  return (
    <Styles.Accordion
      expanded={isExpanded}
      onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
    >
      <AccordionSummary>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('pages.tickets.files'))}:
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent className="expand-more">
              {isExpanded
                ? parse(translate('components.ticket.actionRegistrationTicket.hideDetail'))
                : parse(
                    translate('components.ticket.actionRegistrationTicket.clickToSeeDetail'),
                  )}{' '}
              <ExpandMoreIcon />
            </Styles.TicketContent>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {files?.map((item) => {
            const reqBurnTxnAmount = getStorageFee(item.req_burn_txn_amount, usdPrice);
            const reqAmount = getStorageFee(item.req_amount, usdPrice);
            return (
              <CascadeDetailsStyles.FileItem key={item.file_id} className='file-item'>
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
                      {formatNumber(item.req_burn_txn_amount)} {getCurrencyName()} {reqBurnTxnAmount}
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
                      {formatNumber(item.req_amount)} {getCurrencyName()} {reqAmount}
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
              </CascadeDetailsStyles.FileItem>
            )
          })}
        </Box>
      </AccordionDetails>
    </Styles.Accordion>
  )
}

const CascadeMultiVolumeTicket: React.FC<ICascadeMultiVolumeTicketProps> = ({
  ticket,
  showFull = false,
}) => {
  const { usdPrice } = useUsdPrice();

  if (!ticket?.tx_info) {
    return null;
  }
  const txInfo = JSON.parse(ticket.tx_info);
  const storageFee = getStorageFee(txInfo.multisig_tx_total_fee, usdPrice);

  if (showFull) {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.inferenceAPICreditPackTicket.height'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              <RouterLink
                route={`${ROUTES.BLOCK_DETAILS}/${ticket.height}`}
                value={ticket.height}
                title={ticket.height?.toString()}
                className="address-link"
              />
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.inferenceAPICreditPackTicket.key'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.key}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.multiVolume.secondaryKey'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.secondary_key}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('pages.cascade.dataHash'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.contract_ticket.sha3_256_hash_of_original_file}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.multiVolume.fileName'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.fileName}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'components.ticket.multiVolume.totalFee',
                ),
              )}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {txInfo.multisig_tx_total_fee ? formatNumber(txInfo.multisig_tx_total_fee) : parse(translate('common.na'))} {getCurrencyName()} {storageFee}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'components.ticket.multiVolume.totalFile',
                ),
              )}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {txInfo.multisig_outputs_count}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'pages.cascade.fileSize',
                ),
              )}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
            {ticket.contract_ticket.size_of_original_file_mb ?
                      formatBytes(ticket.contract_ticket.size_of_original_file_mb * 1000000) : parse(translate('common.na'))
                      }
            </Styles.TicketContent>
          </Grid>
        </Grid>
        {ticket?.timestamp ? (
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <Styles.TicketTitle>
                {parse(translate('components.ticket.inferenceAPICreditPackTicket.timestamp'))}
              </Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent>
                {formattedDate(Number(ticket.timestamp), { dayName: false })}
              </Styles.TicketContent>
            </Grid>
          </Grid>
        ) : null}
        <Files files={(ticket.files || fakeFilesData) as IMultiVolumeFIle[]} />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.inferenceAPICreditPackTicket.height'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            <RouterLink
              route={`${ROUTES.BLOCK_DETAILS}/${ticket.height}`}
              value={ticket.height}
              title={ticket.height?.toString()}
              className="address-link"
            />
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.inferenceAPICreditPackTicket.key'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.key}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.multiVolume.secondaryKey'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.secondary_key}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('pages.cascade.dataHash'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.contract_ticket.sha3_256_hash_of_original_file}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.multiVolume.fileName'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>{ticket.fileName}</Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.multiVolume.totalFee',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {txInfo.multisig_tx_total_fee ? formatNumber(txInfo.multisig_tx_total_fee) : parse(translate('common.na'))} {getCurrencyName()} {storageFee}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'components.ticket.multiVolume.totalFile',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {txInfo.multisig_outputs_count}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(
              translate(
                'pages.cascade.fileSize',
              ),
            )}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
          {ticket.contract_ticket.size_of_original_file_mb ?
                    formatBytes(ticket.contract_ticket.size_of_original_file_mb * 1000000) : parse(translate('common.na'))
                    }
          </Styles.TicketContent>
        </Grid>
      </Grid>
      {ticket?.timestamp ? (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.inferenceAPICreditPackTicket.timestamp'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formattedDate(Number(ticket.timestamp), { dayName: false })}
            </Styles.TicketContent>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default CascadeMultiVolumeTicket;
