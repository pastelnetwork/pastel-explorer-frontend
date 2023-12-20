/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { SpacingProps } from '@mui/system';
import { Theme } from '@mui/material';

export type GlobalStyleProps = {
  theme: Theme & { palette: any };
};

export interface MuiButtonSpacingType extends SpacingProps {
  component?: React.PropsWithoutRef<{}>;
  to?: string;
}
