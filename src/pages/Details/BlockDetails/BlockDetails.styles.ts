import styled from 'styled-components';

import { Typography as MuiTypography, Accordion as MuiAccordion, Grid } from '@material-ui/core';

export const Typography = styled(MuiTypography)`
  flex-grow: 1;
  margin: 0 5px;
`;

export const Accordion = styled(MuiAccordion)`
  margin-top: -40px !important;
  padding-top: 20px;
`;

export const DetailsDescription = styled(Grid)`
  width: 200px;
`;

export const DetailsContainer = styled(Grid)`
  margin: 5px 0;
`;

export const DetailsValueText = styled(MuiTypography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
