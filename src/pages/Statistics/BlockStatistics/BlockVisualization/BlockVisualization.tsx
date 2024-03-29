import { Typography } from '@mui/material';

import { translateDropdown } from '@utils/helpers/i18n';

import * as Styles from './BlockVisualization.styles';

type BlockElementType = string | number | JSX.Element;

interface BlockVisualizationProps {
  height: BlockElementType;
  size: BlockElementType;
  transactionCount: BlockElementType;
  minutesAgo: BlockElementType;
  clickHandler?: () => void;
  className?: string;
  title?: string;
  ticketsCount: BlockElementType;
}

const BlockVisualization: React.FC<BlockVisualizationProps> = ({
  height,
  size,
  transactionCount,
  ticketsCount,
  minutesAgo,
  className = '',
  title = translateDropdown('pages.statistics.block'),
  clickHandler,
}) => {
  return (
    <Styles.BlockContainer className={className} onClick={clickHandler}>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h3">{height}</Typography>
      <Typography variant="h4">{size}</Typography>
      <Typography variant="caption">{transactionCount}</Typography>
      <Typography variant="caption">{ticketsCount}</Typography>
      <Typography variant="caption">{minutesAgo}</Typography>
    </Styles.BlockContainer>
  );
};

export default BlockVisualization;
