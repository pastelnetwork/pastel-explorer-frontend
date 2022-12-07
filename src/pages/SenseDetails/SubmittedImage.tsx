import Box from '@material-ui/core/Box';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

const SubmittedImage: React.FC = () => {
  return (
    <Box>
      <Styles.ContentItem>
        <img
          src="http://res.cloudinary.com/pastelnetwork/image/upload/v1/sense_demo/b56b34c6b8b3d87331632ec2ddc5168d54f5ce4f060a617d95d2260f8b0f7099.jpg"
          alt="rare_badge"
          className="main-image"
        />
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Title:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">b56b34c6b8</TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Description:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          Fine Art and NFT Stuff
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>File Is Public:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent>True</TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default SubmittedImage;
