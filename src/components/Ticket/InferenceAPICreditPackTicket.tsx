import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { decode } from 'js-base64';

import RouterLink from '@components/RouterLink/RouterLink';
import { formattedDate } from '@utils/helpers/date/date';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import {
  IInferenceAPICreditPackTicket,
  IAgreeingSupernodesSignatures,
} from '@utils/types/ITransactions';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './Ticket.styles';

interface IInferenceAPICreditPackTicketProps {
  ticket: IInferenceAPICreditPackTicket;
  showFull?: boolean;
}

const AgreeingSupernodesSignatures = ({ data }: { data: IAgreeingSupernodesSignatures }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) {
    return null;
  }

  const renderAgreeingSupernodesSignatures = (items: IAgreeingSupernodesSignatures) => {
    if (!items) {
      return null;
    }
    const keys = Object.keys(items);
    return keys.map(value => {
      const currentItem = items[value];
      return (
        <Styles.AgreeingSupernodesSignaturesItem key={value}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Styles.TicketTitle>{value}</Styles.TicketTitle>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <Styles.TicketTitle>
                {parse(
                  translate(
                    'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.creditPackPurchaseRequestFieldsJsonB64Signature',
                  ),
                )}
              </Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent sx={{ wordBreak: 'break-word' }}>
                {currentItem.credit_pack_purchase_request_fields_json_b64_signature}
              </Styles.TicketContent>
            </Grid>
          </Grid>
          <Grid container spacing={3} key={value}>
            <Grid item xs={4} sm={3} className="max-w-355">
              <Styles.TicketTitle>
                {parse(
                  translate(
                    'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.priceAgreementRequestResponseHashSignature',
                  ),
                )}
              </Styles.TicketTitle>
            </Grid>
            <Grid item xs={8} sm={9}>
              <Styles.TicketContent sx={{ wordBreak: 'break-word' }}>
                {currentItem.price_agreement_request_response_hash_signature}
              </Styles.TicketContent>
            </Grid>
          </Grid>
        </Styles.AgreeingSupernodesSignaturesItem>
      );
    });
  };

  return (
    <Styles.Accordion
      expanded={isExpanded}
      onChange={(event, isPanelExpanded) => setIsExpanded(isPanelExpanded)}
    >
      <AccordionSummary>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.agreeingSupernodesSignaturesDict',
                ),
              )}
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
      <AccordionDetails>{renderAgreeingSupernodesSignatures(data)}</AccordionDetails>
    </Styles.Accordion>
  );
};

const InferenceAPICreditPackTicket: React.FC<IInferenceAPICreditPackTicketProps> = ({
  ticket,
  showFull = false,
}) => {
  const [isExpandedConfirmation, setIsExpandedConfirmation] = useState(false);
  const [isExpandedRequest, setIsExpandedRequest] = useState(false);
  const [isExpandedResponse, setIsExpandedResponse] = useState(false);

  if (!ticket?.contract_ticket) {
    return null;
  }
  const parseContractTicket =
    typeof ticket.contract_ticket === 'string'
      ? JSON.parse(decode(`${ticket.contract_ticket}`))
      : ticket.contract_ticket;

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
              {parse(translate('components.ticket.inferenceAPICreditPackTicket.secondaryKey'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.secondary_key}</Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(translate('components.ticket.inferenceAPICreditPackTicket.subType'))}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>{ticket.sub_type}</Styles.TicketContent>
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

        {parseContractTicket.ticket_input_data_dict?.credit_pack_purchase_request_dict ? (
          <Styles.Accordion
            expanded={isExpandedRequest}
            onChange={(event, isPanelExpanded) => setIsExpandedRequest(isPanelExpanded)}
          >
            <AccordionSummary>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestDict',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="expand-more">
                    {isExpandedRequest
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
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPurchaseRequestMessageVersion',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict
                        .credit_purchase_request_message_version_string
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditUsageTrackingPslAddress',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict
                        .credit_usage_tracking_psl_address
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.listOfAuthorizedPastelidsAllowedToUseCreditPack',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict.list_of_authorized_pastelids_allowed_to_use_credit_pack?.join(
                      ', ',
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.requestPastelBlockHeight',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict.request_pastel_block_height}`}
                      value={
                        parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict
                          .request_pastel_block_height
                      }
                      title={parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict.request_pastel_block_height?.toString()}
                      className="address-link"
                    />
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.requestTimestampUtcIsoString',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formattedDate(
                      new Date(
                        parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict.request_timestamp_utc_iso_string,
                      ).getTime() / 1000,
                      { dayName: false },
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.requestedInitialCreditsInCreditPack',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formatNumber(
                      parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_dict
                        .requested_initial_credits_in_credit_pack,
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Styles.Accordion>
        ) : null}

        {parseContractTicket.ticket_input_data_dict
          ?.credit_pack_purchase_request_confirmation_dict ? (
          <Styles.Accordion
            expanded={isExpandedConfirmation}
            onChange={(event, isPanelExpanded) => setIsExpandedConfirmation(isPanelExpanded)}
          >
            <AccordionSummary>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestConfirmationDict',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="expand-more">
                    {isExpandedConfirmation
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
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPurchaseRequestConfirmationMessageVersion',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .credit_purchase_request_confirmation_message_version_string
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPurchaseRequestConfirmationPastelBlockHeight',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_confirmation_dict.credit_purchase_request_confirmation_pastel_block_height}`}
                      value={
                        parseContractTicket.ticket_input_data_dict
                          .credit_pack_purchase_request_confirmation_dict
                          .credit_purchase_request_confirmation_pastel_block_height
                      }
                      title={parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_confirmation_dict.credit_purchase_request_confirmation_pastel_block_height?.toString()}
                      className="address-link"
                    />
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPurchaseRequestConfirmation',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formattedDate(
                      new Date(
                        parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_confirmation_dict.credit_purchase_request_confirmation_utc_iso_string,
                      ).getTime() / 1000,
                      { dayName: false },
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(translate('components.ticket.inferenceAPICreditPackTicket.id'))}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict.id
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.requestingEndUserPastelid',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent sx={{ wordBreak: 'break-word' }}>
                    {parseContractTicket.ticket_input_data_dict
                      .credit_pack_purchase_request_confirmation_dict
                      .requesting_end_user_pastelid ? (
                      <RouterLink
                        route={`${ROUTES.PASTEL_ID_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_confirmation_dict.requesting_end_user_pastelid}`}
                        value={
                          parseContractTicket.ticket_input_data_dict
                            .credit_pack_purchase_request_confirmation_dict
                            .requesting_end_user_pastelid
                        }
                        title={
                          parseContractTicket.ticket_input_data_dict
                            .credit_pack_purchase_request_confirmation_dict
                            .requesting_end_user_pastelid
                        }
                        className="address-link"
                      />
                    ) : (
                      parse(translate('common.na'))
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.requestingEndUserPastelidSignature',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent sx={{ wordBreak: 'break-word' }}>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .requesting_end_user_pastelid_signature_on_sha3_256_hash_of_credit_pack_purchase_request_confirmation_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestConfirmation',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .requesting_end_user_pastelid_signature_on_sha3_256_hash_of_credit_pack_purchase_request_confirmation_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequest',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .sha3_256_hash_of_credit_pack_purchase_request_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponse',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .sha3_256_hash_of_credit_pack_purchase_request_response_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.txidOfCreditPurchaseBurnTransaction',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_confirmation_dict
                        .txid_of_credit_purchase_burn_transaction
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Styles.Accordion>
        ) : null}

        {parseContractTicket.ticket_input_data_dict?.credit_pack_purchase_request_response_dict ? (
          <Styles.Accordion
            expanded={isExpandedResponse}
            onChange={(event, isPanelExpanded) => setIsExpandedResponse(isPanelExpanded)}
          >
            <AccordionSummary>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent className="expand-more">
                    {isExpandedResponse
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
              <AgreeingSupernodesSignatures
                data={
                  parseContractTicket.ticket_input_data_dict
                    .credit_pack_purchase_request_response_dict.agreeing_supernodes_signatures_dict
                }
              />

              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.creditPurchaseRequestResponseMessageVersionString',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .credit_purchase_request_response_message_version_string
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.creditUsageTrackingPslAddress',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .credit_usage_tracking_psl_address
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.creditUsageTrackingPslAddress',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict.id
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.listOfPotentiallyAgreeingSupernodes',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.list_of_potentially_agreeing_supernodes?.join(
                      ', ',
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.listOfSupernodePastelidsAgreeingToCreditPackPurchaseTerms',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.list_of_supernode_pastelids_agreeing_to_credit_pack_purchase_terms?.join(
                      ', ',
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.proposedTotalCostOfCreditPackInPsl',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formatNumber(
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .proposed_total_cost_of_credit_pack_in_psl,
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.pslCostPerCredit',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formatNumber(
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict.psl_cost_per_credit,
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.requestResponsePastelBlockHeight',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    <RouterLink
                      route={`${ROUTES.BLOCK_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.request_response_pastel_block_height}`}
                      value={
                        parseContractTicket.ticket_input_data_dict
                          .credit_pack_purchase_request_response_dict
                          .request_response_pastel_block_height
                      }
                      title={parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.request_response_pastel_block_height?.toString()}
                      className="address-link"
                    />
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.requestResponseTimestamp',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {formattedDate(
                      new Date(
                        parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.request_response_timestamp_utc_iso_string,
                      ).getTime() / 1000,
                      { dayName: false },
                    )}
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.respondingSupernodePastelid',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    <RouterLink
                      route={`${ROUTES.PASTEL_ID_DETAILS}/${parseContractTicket.ticket_input_data_dict.credit_pack_purchase_request_response_dict.responding_supernode_pastelid}`}
                      value={
                        parseContractTicket.ticket_input_data_dict
                          .credit_pack_purchase_request_response_dict.responding_supernode_pastelid
                      }
                      title={
                        parseContractTicket.ticket_input_data_dict
                          .credit_pack_purchase_request_response_dict.responding_supernode_pastelid
                      }
                      className="address-link"
                    />
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.respondingSupernodeSignatureOnCreditPackPurchaseRequestResponseHash',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent sx={{ wordBreak: 'break-word' }}>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .responding_supernode_signature_on_credit_pack_purchase_request_response_hash
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.hasOfCreditPackPurchaseRequestFields',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .sha3_256_hash_of_credit_pack_purchase_request_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={3} className="max-w-355">
                  <Styles.TicketTitle>
                    {parse(
                      translate(
                        'components.ticket.inferenceAPICreditPackTicket.creditPackPurchaseRequestResponseDict.hashOfCreditPackPurchaseRequestResponseFields',
                      ),
                    )}
                  </Styles.TicketTitle>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Styles.TicketContent>
                    {
                      parseContractTicket.ticket_input_data_dict
                        .credit_pack_purchase_request_response_dict
                        .sha3_256_hash_of_credit_pack_purchase_request_response_fields
                    }
                  </Styles.TicketContent>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Styles.Accordion>
        ) : null}

        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'components.ticket.inferenceAPICreditPackTicket.ticketInputDataFullyParsed',
                ),
              )}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {parseContractTicket.ticket_input_data_fully_parsed_sha3_256_hash}
            </Styles.TicketContent>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} className="max-w-355">
            <Styles.TicketTitle>
              {parse(
                translate(
                  'components.ticket.inferenceAPICreditPackTicket.ticketUncompressedSizeInBytes',
                ),
              )}
            </Styles.TicketTitle>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Styles.TicketContent>
              {formatNumber(parseContractTicket.ticket_uncompressed_size_in_bytes)}
            </Styles.TicketContent>
          </Grid>
        </Grid>
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
          <Styles.TicketTitle>{parse(translate('pages.tickets.version'))}</Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
              ?.credit_purchase_request_message_version_string || parse(translate('common.na'))}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('pages.tickets.initialCredits'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
              ?.requested_initial_credits_in_credit_pack
              ? formatNumber(
                  parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                    ?.requested_initial_credits_in_credit_pack,
                )
              : parse(translate('common.na'))}
          </Styles.TicketContent>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={3} className="max-w-355">
          <Styles.TicketTitle>
            {parse(translate('components.ticket.inferenceAPICreditPackTicket.pastelID'))}
          </Styles.TicketTitle>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Styles.TicketContent>
            {parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
              ?.requesting_end_user_pastelid ? (
              <RouterLink
                route={`${ROUTES.TRANSACTION_DETAILS}/${parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict?.requesting_end_user_pastelid}`}
                value={
                  parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                    ?.requesting_end_user_pastelid || ''
                }
                title={
                  parseContractTicket?.ticket_input_data_dict?.credit_pack_purchase_request_dict
                    ?.requesting_end_user_pastelid
                }
                className="address-link"
              />
            ) : (
              parse(translate('common.na'))
            )}
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

export default InferenceAPICreditPackTicket;
