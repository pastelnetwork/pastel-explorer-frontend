import { CSSProperties } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import parse from 'html-react-parser';

import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number | React.ReactNode;
  textSize?: 'normal' | 'large';
  styles?: Partial<CSSProperties>;
  title?: string;
  className?: string;
  isUseTooltip?: boolean;
  onClick?: () => void;
}

interface IExternalLinkProps {
  href: string;
  value: React.ReactNode;
  styles?: Partial<CSSProperties>;
  className?: string;
  target?: string;
  rel?: string;
  title?: string;
  isUseTooltip?: boolean;
}

export const ExternalLink: React.FC<IExternalLinkProps> = ({
  href,
  value,
  className,
  target = '_self',
  rel,
  title = '',
  isUseTooltip = false,
  styles,
}) => {
  if (isUseTooltip) {
    return (
      <Tooltip title={parse(title)}>
        <Styles.ExternalLink
          href={href}
          className={className}
          target={target}
          rel={rel}
          style={styles}
        >
          {value}
        </Styles.ExternalLink>
      </Tooltip>
    );
  }

  return (
    <Styles.ExternalLink href={href} className={className} target={target} rel={rel}>
      {value}
    </Styles.ExternalLink>
  );
};

const RouterLink: React.FC<RouterLinkProps> = ({
  route,
  value,
  textSize = 'normal',
  styles,
  title,
  className,
  isUseTooltip = false,
  onClick = undefined,
}) => {
  if (isUseTooltip && title) {
    return (
      <Tooltip title={parse(title)} arrow>
        <Styles.RouterLink to={`${route}`} className={className} textsize={textSize} style={styles}>
          {value}
        </Styles.RouterLink>
      </Tooltip>
    );
  }

  return (
    <Styles.RouterLink
      className={className}
      style={styles}
      title={title}
      to={`${route}`}
      textsize={textSize}
      onClick={onClick}
    >
      {value}
    </Styles.RouterLink>
  );
};

export default RouterLink;
