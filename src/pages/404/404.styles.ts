import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import { Button as MuiButton } from '@material-ui/core';

import { MuiButtonSpacingType } from '@utils/types/styles';

export const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

export const Wrapper = styled.div`
  padding: 0;
  text-align: center;
  background: transparent;
`;

export const Logo = styled.img`
  width: 170px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  min-height: 98vh;

  .content {
    display: inline-block;
    margin: auto;
  }
`;
