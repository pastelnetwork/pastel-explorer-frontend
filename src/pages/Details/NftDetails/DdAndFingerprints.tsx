import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as TicketStyles from '@components/Ticket/Ticket.styles';
import * as CascadeStyles from '@pages/Details/CascadeDetails/CascadeDetails.styles';

interface IDdAndFingerprintsIdsData {
  data?: string[];
  opened: boolean;
}

interface IDdAndFingerprints {
  ddAndFingerprintsIc: number;
  ddAndFingerprintsMax: number;
  ddAndFingerprintsIds: string[];
}

const DdAndFingerprintsIdsData: React.FC<IDdAndFingerprintsIdsData> = ({ data, opened }) => {
  if (!data?.length || !opened) {
    return null;
  }
  return (
    <CascadeStyles.RqIdsWrapper>
      <Box className="mt-10">
        <TicketStyles.TicketTitle>
          {parse(translate('pages.nftDetails.allDdAndFingerprints'))}
        </TicketStyles.TicketTitle>
      </Box>
      {opened ? (
        <ul className="list">
          {data.map(value => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : null}
    </CascadeStyles.RqIdsWrapper>
  );
};

const DdAndFingerprints: React.FC<IDdAndFingerprints> = ({
  ddAndFingerprintsIc,
  ddAndFingerprintsMax,
  ddAndFingerprintsIds,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <TicketStyles.TicketTitle>
                {parse(translate('pages.nftDetails.ddAndFingerprintsIc'))}:
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent>
                {ddAndFingerprintsIc || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TicketStyles.TicketTitle>
                {parse(translate('pages.nftDetails.ddAndFingerprintsMax'))}:
              </TicketStyles.TicketTitle>
              <TicketStyles.TicketContent>
                {ddAndFingerprintsMax || parse(translate('common.na'))}
              </TicketStyles.TicketContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TicketStyles.TicketTitle>
                {parse(translate('pages.nftDetails.ddAndFingerprintsIds'))}:
              </TicketStyles.TicketTitle>
              {ddAndFingerprintsIds.length ? (
                <TicketStyles.TicketContent
                  className={`expand-more ${opened ? 'opened' : ''}`}
                  onClick={() => setOpened(!opened)}
                >
                  {opened
                    ? parse(translate('pages.nftDetails.hideAllDdAndFingerprints'))
                    : parse(translate('pages.nftDetails.displayAllDdAndFingerprints'))}
                  <ExpandMoreIcon />
                </TicketStyles.TicketContent>
              ) : (
                <TicketStyles.TicketContent>
                  {parse(translate('common.na'))}
                </TicketStyles.TicketContent>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="rq-ids">
        <DdAndFingerprintsIdsData data={ddAndFingerprintsIds} opened={opened} />
      </Box>
    </Box>
  );
};

export default DdAndFingerprints;
