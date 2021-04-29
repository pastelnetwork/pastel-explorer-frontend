import styled from 'styled-components/macro';

import { spacing } from '@material-ui/system';
import { Grid as MuiGrid } from '@material-ui/core';

export const Grid = styled(MuiGrid)`
  position: relative;
`;

export const Spacer = styled.div(spacing);
