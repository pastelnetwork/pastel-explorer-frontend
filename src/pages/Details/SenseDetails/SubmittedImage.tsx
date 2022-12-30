import Box from '@material-ui/core/Box';

import * as TicketStyles from '@components/Ticket/Ticket.styles';

import * as Styles from './SenseDetails.styles';

interface ISubmittedImage {
  imageFileHash: string;
  imageFileCdnUrl: string;
  imageTitle: string;
  imageDescription: string;
  isPublic: number;
}

const urlDefault =
  'http://res.cloudinary.com/pastelnetwork/image/upload/v1/sense_demo/83590536bb4b84d155810cca40e9bc741a33a47866d7791c6014ea914617c859.jpg';

const SubmittedImage: React.FC<ISubmittedImage> = ({
  imageFileHash,
  imageFileCdnUrl,
  imageTitle,
  imageDescription,
  isPublic,
}) => {
  return (
    <Box className="pt-8">
      <Styles.ContentItem>
        <img src={urlDefault || imageFileCdnUrl} alt={imageFileHash} className="main-image" />
        [***]
      </Styles.ContentItem>
      <Styles.ContentItem className="mt-25">
        <TicketStyles.TicketTitle>Title:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {imageTitle}[***]
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>Description:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="break-all">
          {imageDescription}[***]
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
      <Styles.ContentItem>
        <TicketStyles.TicketTitle>File Is Public:</TicketStyles.TicketTitle>
        <TicketStyles.TicketContent className="capitalize">
          {isPublic === 1 ? 'True' : 'False'}[***]
        </TicketStyles.TicketContent>
      </Styles.ContentItem>
    </Box>
  );
};

export default SubmittedImage;
