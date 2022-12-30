import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const ProgressBarWrapper = styled(Box)`
  width: 100%;
  height: 12px;
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.nft.grey[100]};
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressBarValue = styled(Box)`
  height: 12px;
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.nft.secondary};
  border-radius: 6px;
`;
