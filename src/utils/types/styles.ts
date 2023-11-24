/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { SpacingProps } from '@material-ui/system';
import { Theme } from '@material-ui/core';

export type GlobalStyleProps = {
  theme: Theme & { palette: any };
};

export interface MuiButtonSpacingType extends SpacingProps {
  component?: React.PropsWithoutRef<{}>;
  to?: string;
}
