import { Tooltip } from '@material-ui/core';

import * as Styles from './Hourglass.styles';

interface HourglassProps {
  className?: string;
}

const Hourglass: React.FC<HourglassProps> = ({ className }) => (
  <Tooltip title="Transaction is not yet included in any block">
    <Styles.Image className={className}>
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path d="M 3 0 L 3 3 L 4.03125 3 C 4.363281 7.910156 7.0625 10.863281 8.53125 12.125 C 7.414063 13.128906 4.402344 16.074219 4.03125 21 L 3 21 L 3 24 L 21 24 L 21 21 L 19.96875 21 C 19.597656 16.074219 16.585938 13.128906 15.46875 12.125 C 16.941406 10.878906 19.648438 7.976563 19.96875 3 L 21 3 L 21 0 Z M 6.0625 3 L 17.9375 3 C 17.511719 8.871094 13.5 11.125 13.5 11.125 L 12.21875 11.875 L 13.375 12.78125 C 13.375 12.78125 17.429688 16.097656 17.9375 21 L 17.78125 21 C 16.953125 18.816406 13.890625 16 12 16 C 10.109375 16 7.046875 18.816406 6.21875 21 L 6.0625 21 C 6.570313 16.097656 10.625 12.78125 10.625 12.78125 L 11.75 11.875 L 10.5 11.15625 C 10.5 11.15625 6.488281 8.796875 6.0625 3 Z M 10 8 C 10 8.898438 11.101563 11 12 11 C 12.898438 11 14 8.898438 14 8 Z" />
      </svg>
    </Styles.Image>
  </Tooltip>
);

export default Hourglass;
