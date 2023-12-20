import parse from 'html-react-parser';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';

import { Link } from '@components/Link/Link.styles';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './Tickets.styles';

interface ISectionTitleProps {
  total: number;
  toggleContent: () => void;
  showMore: boolean;
  title: string;
  viewAllLink: string;
}

const SectionTitle: React.FC<ISectionTitleProps> = ({
  title,
  total,
  toggleContent,
  showMore,
  viewAllLink,
}) => {
  return (
    <Styles.BlockTitle className="ticket-block-title">
      <span>
        {parse(title)}{' '}
        <span className="nowrap">
          (
          {total > 1
            ? parse(translate('pages.tickets.totalTickets', { total: formatNumber(total) }))
            : parse(translate('pages.tickets.totalTicket', { total: formatNumber(total) }))}
          )
        </span>
      </span>
      <Styles.LinkWrapper>
        <Link to={viewAllLink} className="view-all">
          <Typography align="center" className="p-16">
            {parse(translate('pages.tickets.viewAll'))} <ArrowForwardIos />
          </Typography>
        </Link>
        <IconButton onClick={toggleContent} className={`btn-toggle ${showMore ? 'show-less' : ''}`}>
          <ExpandMoreIcon className="toggle-icon" />
        </IconButton>
      </Styles.LinkWrapper>
    </Styles.BlockTitle>
  );
};

export default SectionTitle;
