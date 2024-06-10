import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import { translate } from '@utils/helpers/i18n';

import { formatAddress } from '@utils/helpers/format';
import {
  IStorageChallenges,
  IHealthCheckChallenges,
  ISelfHealingTriggers,
} from '@utils/types/INetworkChallengesAndSelfHealing';

export const TYPE_OPTIONS = [
  {
    value: 'sc',
    name: 'pages.networkChallengesAndSelfHealing.storageChallenges',
  },
  {
    value: 'hcc',
    name: 'pages.networkChallengesAndSelfHealing.healthCheckChallenges',
  },
  {
    value: 'sht',
    name: 'pages.networkChallengesAndSelfHealing.selfHealingTriggers',
  },
];

export const PASTEL_KEY = 'pastelID';

export const selfHealingTriggersColumns = [
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.networkChallengesAndSelfHealing.pastelID',
    dataKey: PASTEL_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.networkChallengesAndSelfHealing.pastelID',
  },
];

export const storageChallengesColumns = [
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.networkChallengesAndSelfHealing.pastelID',
    dataKey: PASTEL_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.networkChallengesAndSelfHealing.pastelID',
  },
];

export const healthCheckChallengesColumns = [
  {
    width: 100,
    flexGrow: 1,
    label: 'pages.networkChallengesAndSelfHealing.pastelID',
    dataKey: PASTEL_KEY,
    disableSort: true,
    className: 'txID',
    dataTitle: 'pages.networkChallengesAndSelfHealing.pastelID',
  },
];

export const transformStorageChallengesData = (data: IStorageChallenges[]) =>
  data.map(
    ({
      challenge_id,
      message_type,
      sender_id,
      challenger_id,
      challenge,
      observers,
      recipient_id,
    }) => {
      return {
        id: challenge_id,
        [PASTEL_KEY]: (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.challengeId'))}
              </Box>
              <Box className="bold">{formatAddress(challenge_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.messageType'))}
              </Box>
              <Box className="bold">{message_type}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.senderId'))}
              </Box>
              <Box className="bold">{formatAddress(sender_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.challengerId'))}
              </Box>
              <Box className="bold">{formatAddress(challenger_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.block'))}
              </Box>
              <Box className="bold">{challenge?.block || 'N/A'}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.merkelroot'))}
              </Box>
              <Box className="bold">
                {challenge?.merkelroot ? formatAddress(challenge?.merkelroot) : 'N/A'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.fileHash'))}
              </Box>
              <Box className="bold">
                {challenge?.file_hash ? formatAddress(challenge.file_hash) : 'N/A'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.startIndex'))}
              </Box>
              <Box className="bold">{challenge?.start_index || 'N/A'}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.endIndex'))}
              </Box>
              <Box className="bold">{challenge?.end_index || 'N/A'}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.observers'))}
              </Box>
              <Box className="bold">{observers.map(value => formatAddress(value)).join(', ')}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.recipientId'))}
              </Box>
              <Box className="bold">{formatAddress(recipient_id)}</Box>
            </Grid>
          </Grid>
        ),
      };
    },
  );

export const transformSelfHealingTriggersData = (data: ISelfHealingTriggers[]) =>
  data.map(({ event_id, report }) => {
    return {
      id: event_id,
      [PASTEL_KEY]: (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.eventId'))}
              </Box>
              <Box className="bold">{event_id}</Box>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', maxHeight: '500px', overflowY: 'auto' }}>
            {report.messages.map((message, index) => (
              <Box
                key={`${event_id}-${message.message_type}`}
                sx={{ width: '100%', backgroundColor: index % 2 === 0 ? '#eee' : '#fff' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box className="title">Message Type:</Box>
                    <Box className="bold">{message.message_type}</Box>
                  </Grid>
                </Grid>
                {message.messages.map(item => (
                  <Grid
                    container
                    spacing={3}
                    key={item.trigger_id}
                    sx={{ width: '100%', border: '1px dashed #ccc' }}
                  >
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="title">Trigger ID:</Box>
                      <Box className="bold">{formatAddress(item.trigger_id)}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="title">Message Type:</Box>
                      <Box className="bold">{item.message_type}</Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="title">Sender ID:</Box>
                      <Box className="bold">{formatAddress(item.sender_id)}</Box>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      ),
    };
  });

export const transformHealthCheckChallengesData = (data: IHealthCheckChallenges[]) =>
  data.map(
    ({
      challenge_id,
      message_type,
      sender_id,
      challenger_id,
      challenge,
      observers,
      recipient_id,
    }) => {
      return {
        id: challenge_id,
        [PASTEL_KEY]: (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.challengeId'))}
              </Box>
              <Box className="bold">{formatAddress(challenge_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.messageType'))}
              </Box>
              <Box className="bold">{message_type}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.senderId'))}
              </Box>
              <Box className="bold">{formatAddress(sender_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.challengerId'))}
              </Box>
              <Box className="bold">{formatAddress(challenger_id)}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.block'))}
              </Box>
              <Box className="bold">{challenge?.block || 'N/A'}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.merkelroot'))}
              </Box>
              <Box className="bold">
                {challenge?.merkelroot ? formatAddress(challenge?.merkelroot) : 'N/A'}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.observers'))}
              </Box>
              <Box className="bold">{observers.map(value => formatAddress(value)).join(', ')}</Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="title">
                {parse(translate('pages.networkChallengesAndSelfHealing.recipientId'))}
              </Box>
              <Box className="bold">{formatAddress(recipient_id)}</Box>
            </Grid>
          </Grid>
        ),
      };
    },
  );
