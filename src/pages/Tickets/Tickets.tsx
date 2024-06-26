import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { useUsdPrice } from '@hooks/useTransactionDetails';
import useTickets from '@hooks/useTickets';

import Sense from './Sense';
import Cascade from './Cascade';
import PastelIDAndUsernameTickets from './PastelIDAndUsernameTickets';
import PastelNftTickets from './PastelNftTickets';
import OfferAndTransferTickets from './OfferAndTransferTickets';
import MiscOtherTicketTypes from './MiscOtherTicketTypes';
import InferenceAPICreditPackTickets from './InferenceAPICreditPackTickets';
import {
  ticketsSummary,
  DATA_LIMIT,
  getTotalTickets,
  TTicketResponse,
  isLoading,
} from './Tickets.helpers';
import * as Styles from './Tickets.styles';

const Tickets: React.FC = () => {
  const { usdPrice } = useUsdPrice();
  const otherTicketData = useTickets('other', DATA_LIMIT);
  const contractTicketData = useTickets('contract', DATA_LIMIT);
  const cascadeTicketData = useTickets('cascade', DATA_LIMIT);
  const offerTransferTicketData = useTickets('offer-transfer', DATA_LIMIT);
  const pastelidUsenameTicketData = useTickets('pastelid-usename', DATA_LIMIT);
  const pastelNftTicketData = useTickets('pastel-nft', DATA_LIMIT);
  const senseTicketData = useTickets('sense', DATA_LIMIT);
  const [isMobile, setMobileView] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);

  const handleResize = () => {
    setMobileView(false);
    setInnerWidth(window.innerWidth);
    if (window.innerWidth < 960) {
      setMobileView(true);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ticketData = {
    senseTickets: senseTicketData.total,
    cascadeTickets: cascadeTicketData.total,
    pastelIDAndUsernameTickets: pastelidUsenameTicketData.total,
    pastelNFTTickets: pastelNftTicketData.total,
    offerTicketsAndTransferTickets: offerTransferTicketData.total,
    miscOtherTicketTypes: otherTicketData.total,
    inferenceAPICreditPackTypes: contractTicketData.total,
  };
  const ticketLoading = {
    senseTickets: senseTicketData.isLoading,
    cascadeTickets: cascadeTicketData.isLoading,
    pastelIDAndUsernameTickets: pastelidUsenameTicketData.isLoading,
    pastelNFTTickets: pastelNftTicketData.isLoading,
    offerTicketsAndTransferTickets: offerTransferTicketData.isLoading,
    miscOtherTicketTypes: otherTicketData.isLoading,
    inferenceAPICreditPackTypes: contractTicketData.isLoading,
  };

  return (
    <Styles.TicketsContainer>
      <Grid container spacing={6}>
        <Styles.GirdStyle item className="full pb-12">
          <Styles.TicketSummaryContainer>
            {ticketsSummary.map(item => (
              <Styles.TicketSummaryBox key={item.id} to={item.link} className={item.id}>
                <span className="ticket-summary-title">{item.name}</span>
                <span className="ticket-summary-value">
                  {isLoading(item.id, ticketLoading) ? (
                    <Skeleton animation="wave" variant="text" />
                  ) : (
                    getTotalTickets(item.id, ticketData)
                  )}
                </span>
              </Styles.TicketSummaryBox>
            ))}
          </Styles.TicketSummaryContainer>
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} lg={6} className="left pb-12">
          <Sense
            ticketsData={senseTicketData as TTicketResponse}
            innerWidth={innerWidth}
            usdPrice={usdPrice}
          />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} lg={6} className="right pb-12">
          <Cascade
            ticketsData={cascadeTicketData as TTicketResponse}
            innerWidth={innerWidth}
            usdPrice={usdPrice}
          />
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} lg={6} className="left pb-12">
          <PastelIDAndUsernameTickets
            isMobile={isMobile}
            ticketsData={pastelidUsenameTicketData as TTicketResponse}
          />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} lg={6} className="right pb-12">
          <PastelNftTickets
            ticketsData={pastelNftTicketData as TTicketResponse}
            innerWidth={innerWidth}
            usdPrice={usdPrice}
          />
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12} lg={6} className="left pb-12">
          <OfferAndTransferTickets
            innerWidth={innerWidth}
            ticketsData={offerTransferTicketData as TTicketResponse}
          />
        </Styles.GirdStyle>
        <Styles.GirdStyle item xs={12} lg={6} className="right pb-12">
          <MiscOtherTicketTypes
            ticketsData={otherTicketData as TTicketResponse}
            innerWidth={innerWidth}
            usdPrice={usdPrice}
          />
        </Styles.GirdStyle>
      </Grid>
      <Grid container spacing={6}>
        <Styles.GirdStyle item xs={12}>
          <InferenceAPICreditPackTickets
            innerWidth={innerWidth}
            ticketsData={contractTicketData as TTicketResponse}
          />
        </Styles.GirdStyle>
      </Grid>
    </Styles.TicketsContainer>
  );
};

export default Tickets;
