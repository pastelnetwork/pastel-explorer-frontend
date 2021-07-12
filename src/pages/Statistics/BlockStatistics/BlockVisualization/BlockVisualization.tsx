import { Typography } from '@material-ui/core';

import * as Styles from './BlockVisualization.styles';

type BlockElementType = string | number | JSX.Element;

interface BlockVisualizationProps {
  height: BlockElementType;
  size: BlockElementType;
  transactionCount: BlockElementType;
  minutesAgo: BlockElementType;
  clickHandler?: () => void;
  className?: string;
}

const BlockVisualization: React.FC<BlockVisualizationProps> = ({
  height,
  size,
  transactionCount,
  minutesAgo,
  className = '',
  clickHandler,
}) => {
  return (
    <Styles.BlockContainer className={className} onClick={clickHandler}>
      <Typography variant="caption">Block #:</Typography>
      <Typography variant="h3">{height}</Typography>
      <Typography variant="h4">{size}</Typography>
      <Typography variant="caption">{transactionCount}</Typography>
      <Typography variant="caption">{minutesAgo}</Typography>
    </Styles.BlockContainer>
  );
};

export default BlockVisualization;
