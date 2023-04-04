import Box from '@material-ui/core/Box';

import RouterLink from '@components/RouterLink/RouterLink';
import * as ROUTES from '@utils/constants/routes';
import { translate } from '@utils/helpers/i18n';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

interface IPastelData {
  blockHash: string;
  blockHeight: number;
  utcTimestampWhenRequestSubmitted: string;
  pastelIdOfSubmitter: string;
  pastelIdOfRegisteringSupernode1: string;
  pastelIdOfRegisteringSupernode2: string;
  pastelIdOfRegisteringSupernode3: string;
  isPastelOpenapiRequest: number;
  openApiSubsetIdString: string;
}

const PastelData: React.FC<IPastelData> = ({
  blockHash,
  blockHeight,
  utcTimestampWhenRequestSubmitted,
  pastelIdOfSubmitter,
  pastelIdOfRegisteringSupernode1,
  pastelIdOfRegisteringSupernode2,
  pastelIdOfRegisteringSupernode3,
  isPastelOpenapiRequest,
  openApiSubsetIdString,
}) => {
  return (
    <Box>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.blockHash')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          <RouterLink
            route={`${ROUTES.BLOCK_DETAILS}/${blockHash}`}
            value={blockHash}
            title={blockHash}
            className="address-link"
          />
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.blockHeight')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          <RouterLink
            route={`${ROUTES.BLOCK_DETAILS}/${blockHeight}`}
            value={blockHeight}
            title={blockHeight.toString()}
            className="address-link"
          />
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.utcTimestampWhenRequestSubmitted')}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {utcTimestampWhenRequestSubmitted}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.pastelIdOfSubmitter')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          <RouterLink
            route={`${ROUTES.PASTEL_ID_DETAILS}/${pastelIdOfSubmitter}`}
            value={pastelIdOfSubmitter}
            title={pastelIdOfSubmitter}
            className="address-link"
          />
          &nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.pastelIdOfRegisteringSupernode1')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode1}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.pastelIdOfRegisteringSupernode2')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode2}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.pastelIdOfRegisteringSupernode3')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {pastelIdOfRegisteringSupernode3}&nbsp;
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.isPastelOpenapiRequest')}
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {isPastelOpenapiRequest === 1
            ? translate('pages.senseDetails.true')
            : translate('pages.senseDetails.false')}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>
          {translate('pages.senseDetails.openApiSubsetIdString')}:
        </TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>
          {openApiSubsetIdString || translate('common.na')}
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default PastelData;
