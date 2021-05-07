import { Typography } from '@material-ui/core';

import * as Styles from './BlockVisualization.styles';

type BlockElementType = string | number | JSX.Element;

interface BlockVisualizationProps {
  height: BlockElementType;
  size: BlockElementType;
  transactionCount: BlockElementType;
  minutesAgo: BlockElementType;
  clickHandler: () => void;
}

const BlockVisualization: React.FC<BlockVisualizationProps> = ({
  height,
  size,
  transactionCount,
  minutesAgo,
  clickHandler,
}) => {
  return (
    <Styles.BlockContainer onClick={clickHandler}>
      <Typography variant="h3" gutterBottom>
        {height}
      </Typography>
      <Typography variant="h4">{size}</Typography>
      <Typography variant="caption">{transactionCount}</Typography>
      <Typography variant="caption">{minutesAgo}</Typography>
    </Styles.BlockContainer>
  );
};

export default BlockVisualization;
