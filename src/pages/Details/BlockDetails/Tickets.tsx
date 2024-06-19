/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { decode } from 'js-base64';
import parse from 'html-react-parser';

import { getSenseImage } from '@utils/helpers/url';
import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import {
  ITicket,
  IPastelIDRegistrationTicket,
  IUserNameChangeTicket,
  INftRegistrationTicket,
  INftActivationTicket,
  INftCollectionRegistrationTicket,
  INftCollectionActivationTicket,
  INftRoyaltyTicket,
  IActionRegistrationTicket,
  IActionTicket,
  IActionActivationTicket,
  IOfferTicket,
  IAcceptTicket,
  ITransferTicket,
  TTicketType,
  TSenseRequests,
  ICascadeApiTicket,
  IInferenceAPICreditPackTicket,
} from '@utils/types/ITransactions';
import {
  PastelIDRegistrationTicket,
  UserNameChangeTicket,
  NFTRegistrationTicket,
  NFTActivationTicket,
  NFTCollectionRegistrationTicket,
  NFTCollectionActivationTicket,
  NFTRoyaltyTicket,
  ActionActivationTicket,
  ActionRegistrationTicket,
  InferenceAPICreditPackTicket,
  OfferTicket,
  AcceptTicket,
  TransferTicket,
  getTicketTitle,
} from '@components/Ticket';
import { translate } from '@utils/helpers/i18n';
import * as ascii85 from '@utils/helpers/ascii85';
import { getFileIcon } from '@pages/Details/CascadeDetails/CascadeDetails.helpers';
import { axiosInstance } from '@utils/helpers/useFetch/useFetch';

import * as TableStyles from '@components/Table/Table.styles';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as SenseStyles from '@pages/Details/SenseDetails/SenseDetails.styles';
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';
import * as Styles from './BlockDetails.styles';

interface ITicketsList {
  data: ITicket[];
  senses?: TSenseRequests[];
  showActivationTicket?: boolean;
  variant?: string;
  isShowCascade?: boolean;
}

const FILE_TYPE = [
  'video/mp4',
  'video/quicktime',
  'image/gif',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'audio/mpeg',
  'audio/ogg',
];
const FILE_EXTENSION = ['mp4', 'mov', 'gif', 'png', 'jpeg', 'jpg', 'svg', 'mp3', 'ogg'];
const VIDEO_FILE_TYPE = ['video/mp4', 'video/quicktime'];
const IMAGE_FILE_TYPE = ['image/gif', 'image/png', 'image/jpeg', 'image/svg+xml'];
const AUDIO_FILE_TYPE = ['audio/mpeg', 'audio/ogg'];
const VIDEO_FILE_EXTENSION = ['mp4', 'mov'];
const IMAGE_FILE_EXTENSION = ['gif', 'png', 'jpeg', 'jpg', 'svg'];
const AUDIO_FILE_EXTENSION = ['mp3', 'ogg'];

const CascadeItem = ({
  transactionHash,
  file_type,
  file_name,
}: {
  transactionHash: string;
  file_type: string;
  file_name: string;
}) => {
  const [fileContent, setFileContent] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadFile = async () => {
    if (transactionHash) {
      const url = `${process.env.REACT_APP_EXPLORER_OPENNODE_API_URL}/get_publicly_accessible_cascade_file_by_registration_ticket_txid/${transactionHash}`;
      axiosInstance
        .get(url, { responseType: 'blob' })
        .then(res => {
          setFileContent(URL.createObjectURL(new Blob([res.data], { type: file_type })));
        })
        .catch(() => {
          // noop
        });
    }
  };

  useEffect(() => {
    downloadFile();
  }, [transactionHash]);

  const parseFileName = file_name.split('.');
  const getFileContent = () => {
    if (
      VIDEO_FILE_TYPE.includes(file_type) ||
      VIDEO_FILE_EXTENSION.includes(parseFileName[parseFileName.length - 1])
    ) {
      return (
        <video controls muted autoPlay playsInline>
          <source src={fileContent} type="video/mp4" />
          <source src={fileContent} type="video/quicktime" />
          {parse(translate('pages.blockDetails.videoNotSupport'))}
        </video>
      );
    }

    if (
      IMAGE_FILE_TYPE.includes(file_type) ||
      IMAGE_FILE_EXTENSION.includes(parseFileName[parseFileName.length - 1])
    ) {
      return (
        <img
          src={fileContent}
          alt={file_name}
          className={file_type === 'image/svg+xml' ? 'svg' : ''}
        />
      );
    }
    if (
      AUDIO_FILE_TYPE.includes(file_type) ||
      AUDIO_FILE_EXTENSION.includes(parseFileName[parseFileName.length - 1])
    ) {
      return (
        <audio controls muted autoPlay>
          <source src={fileContent} type="audio/ogg" />
          <source src={fileContent} type="audio/mpeg" />
          {parse(translate('pages.blockDetails.audioNotSupport'))}
        </audio>
      );
    }

    return null;
  };
  if (
    FILE_TYPE.includes(file_type) ||
    FILE_EXTENSION.includes(parseFileName[parseFileName.length - 1])
  ) {
    return (
      <TicketStyles.TicketContent>
        {fileContent ? (
          <>
            <Styles.VideoWrapper className="video">
              <Box className={`main-content ${AUDIO_FILE_TYPE.includes(file_type) ? 'audio' : ''}`}>
                {getFileContent()}
              </Box>
              <Box className="view-full">
                (
                <Styles.ViewFullButton onClick={handleClickOpen}>
                  {parse(translate('pages.blockDetails.viewFull'))}
                </Styles.ViewFullButton>
                )
              </Box>
            </Styles.VideoWrapper>
            <SenseStyles.Dialog onClose={handleClose} open={open}>
              <SenseStyles.FullImageWrapper>{getFileContent()}</SenseStyles.FullImageWrapper>
            </SenseStyles.Dialog>
          </>
        ) : (
          <Styles.VideoWrapper>
            <CircularProgress size={40} />
          </Styles.VideoWrapper>
        )}
      </TicketStyles.TicketContent>
    );
  }
  return (
    <TicketStyles.TicketContent>
      <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>{getFileIcon(file_type)}</Link>
    </TicketStyles.TicketContent>
  );
};

const TicketsList: React.FC<ITicketsList> = ({
  data,
  senses,
  showActivationTicket = false,
  variant,
  isShowCascade = false,
}) => {
  if (!data?.length) {
    return null;
  }

  const decodeApiTicket = (apiTicket: string) => {
    let result = null;
    try {
      result = JSON.parse(decode(apiTicket)) as ICascadeApiTicket;
    } catch {
      try {
        result = ascii85.decode(apiTicket) as ICascadeApiTicket;
      } catch (error) {
        console.error(error);
      }
    }

    return result;
  };

  const renderSenseInfo = (ticket: IActionRegistrationTicket, transactionHash: string) => {
    if (['sense', 'cascade'].indexOf(ticket.action_type) === -1 || !ticket?.activation_ticket) {
      return null;
    }
    const sense = senses?.find(s => s.transactionHash === transactionHash);
    if (!sense) {
      if (ticket.action_type === 'sense' && ticket.activation_txId) {
        return (
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <TicketStyles.TicketTitle>
                {parse(translate('pages.blockDetails.senseOutputDetails'))}
              </TicketStyles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <TicketStyles.TicketContent>
                {parse(translate('pages.tickets.pendingSenseGenerate'))}
              </TicketStyles.TicketContent>
            </Grid>
          </Grid>
        );
      }

      const actionTicket = ticket?.action_ticket;
      const parseActionTicket = JSON.parse(decode(actionTicket)) as IActionTicket;
      const apiTicket = decodeApiTicket(parseActionTicket.api_ticket) as ICascadeApiTicket;
      if (!apiTicket.file_type) {
        return null;
      }

      return (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {isShowCascade
                ? parse(translate('pages.blockDetails.file'))
                : parse(translate('pages.blockDetails.cascadeFileType'))}
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            {isShowCascade ? (
              <CascadeItem
                transactionHash={transactionHash}
                file_type={apiTicket.file_type}
                file_name={apiTicket.file_name}
              />
            ) : (
              <TicketStyles.TicketContent>
                <Link to={`${ROUTES.CASCADE_DETAILS}?txid=${transactionHash}`}>
                  {getFileIcon(apiTicket.file_type)}
                </Link>
              </TicketStyles.TicketContent>
            )}
          </Grid>
        </Grid>
      );
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {parse(translate('pages.blockDetails.senseOutputDetails'))}
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              {sense.imageFileCdnUrl ? (
                <Link
                  to={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${sense.imageFileHash}`}
                >
                  <img
                    src={
                      sense.imageFileCdnUrl
                        ? getSenseImage(sense.imageFileCdnUrl)
                        : noImagePlaceholder
                    }
                    alt={sense.imageFileHash}
                    className="sense-img"
                  />
                </Link>
              ) : (
                parse(translate('pages.tickets.pendingSenseGenerate'))
              )}
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {parse(translate('pages.blockDetails.imageHash'))}
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              <RouterLink
                route={`${ROUTES.SENSE_DETAILS}?txid=${transactionHash}&hash=${sense.imageFileHash}`}
                value={sense.imageFileHash}
                title={sense.imageFileHash}
                className="address-link"
              />
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <TicketStyles.TicketTitle>
              {parse(translate('pages.blockDetails.senseVersion'))}
            </TicketStyles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <TicketStyles.TicketContent>
              {sense.imageFileHash.indexOf('nosense') === -1
                ? sense.dupeDetectionSystemVersion
                : ''}
            </TicketStyles.TicketContent>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderContent = (
    type: string,
    ticket:
      | IPastelIDRegistrationTicket
      | IUserNameChangeTicket
      | INftRegistrationTicket
      | INftActivationTicket
      | INftCollectionRegistrationTicket
      | INftCollectionActivationTicket
      | INftRoyaltyTicket
      | IActionRegistrationTicket
      | IActionTicket
      | IActionActivationTicket
      | IOfferTicket
      | IAcceptTicket
      | IInferenceAPICreditPackTicket
      | ITransferTicket,
    transactionHash: string,
  ) => {
    switch (type) {
      case 'username-change':
        return <UserNameChangeTicket ticket={ticket as IUserNameChangeTicket} />;
      case 'nft-reg':
        return (
          <NFTRegistrationTicket
            ticket={ticket as INftRegistrationTicket}
            transactionHash={transactionHash}
          />
        );
      case 'nft-act':
        return <NFTActivationTicket ticket={ticket as INftActivationTicket} />;
      case 'collection-reg':
        return (
          <NFTCollectionRegistrationTicket ticket={ticket as INftCollectionRegistrationTicket} />
        );
      case 'collection-act':
        return <NFTCollectionActivationTicket ticket={ticket as INftCollectionActivationTicket} />;
      case 'nft-royalty':
        return <NFTRoyaltyTicket ticket={ticket as INftRoyaltyTicket} />;
      case 'action-reg':
        return (
          <ActionRegistrationTicket
            ticket={ticket as IActionRegistrationTicket}
            senseInfo={renderSenseInfo(ticket as IActionRegistrationTicket, transactionHash)}
            showActivationTicket={showActivationTicket}
            transactionHash={transactionHash}
          />
        );
      case 'action-act':
        return <ActionActivationTicket ticket={ticket as IActionActivationTicket} />;
      case 'offer':
        return <OfferTicket ticket={ticket as IOfferTicket} variant={variant} />;
      case 'accept':
        return <AcceptTicket ticket={ticket as IAcceptTicket} variant={variant} />;
      case 'transfer':
        return <TransferTicket ticket={ticket as ITransferTicket} variant={variant} />;
      case 'contract':
        return (
          <InferenceAPICreditPackTicket ticket={ticket as IInferenceAPICreditPackTicket} showFull />
        );
      default:
        return <PastelIDRegistrationTicket ticket={ticket as IPastelIDRegistrationTicket} />;
    }
  };

  return (
    <Styles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-12">
        <TableStyles.BlockTitle>
          {variant !== 'transaction'
            ? parse(translate('pages.blockDetails.tickets'))
            : getTicketTitle(
                data[0].type as TTicketType,
                (data[0].data.ticket as INftCollectionRegistrationTicket)?.collection_ticket
                  ?.item_type,
              )}
        </TableStyles.BlockTitle>
        <Box className="custom-table tickets-table">
          {data.map(ticket => (
            <Styles.GridStyle
              item
              key={ticket.id}
              className="table__row"
              id={ticket.transactionHash}
            >
              {variant !== 'transaction' ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={3} className="max-w-355">
                      <TicketStyles.TicketTitle>
                        {parse(translate('pages.blockDetails.txId'))}:
                      </TicketStyles.TicketTitle>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <TicketStyles.TicketContent>
                        <RouterLink
                          route={`${ROUTES.TRANSACTION_DETAILS}/${ticket.transactionHash}`}
                          value={ticket.transactionHash}
                          title={ticket.transactionHash}
                          className="address-link"
                        />
                      </TicketStyles.TicketContent>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={3} className="max-w-355">
                      <TicketStyles.TicketTitle>
                        {parse(translate('pages.blockDetails.type'))}:
                      </TicketStyles.TicketTitle>
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <TicketStyles.TicketContent>
                        {getTicketTitle(
                          ticket.type as TTicketType,
                          (ticket.data.ticket as INftCollectionRegistrationTicket)
                            ?.collection_ticket?.item_type,
                        )}
                      </TicketStyles.TicketContent>
                    </Grid>
                  </Grid>
                </>
              ) : null}

              {renderContent(ticket.type, ticket.data.ticket, ticket.transactionHash)}
            </Styles.GridStyle>
          ))}
        </Box>
      </TableStyles.BlockWrapper>
    </Styles.GridStyle>
  );
};

export default TicketsList;
