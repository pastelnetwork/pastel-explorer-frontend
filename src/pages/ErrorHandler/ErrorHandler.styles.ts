import styled from 'styled-components/macro';
import { spacing } from '@material-ui/system';
import { Button as MuiButton } from '@material-ui/core';

import { MuiButtonSpacingType } from '@utils/types/styles';

export const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

export const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${props => props.theme.breakpoints.up('md')} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

export const Logo = styled.img`
  width: 170px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  min-height: 85vh;

  .content {
    display: inline-block;
    margin: auto;
  }
`;
