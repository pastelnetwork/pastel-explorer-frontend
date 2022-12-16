import { CSSProperties } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';

import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number;
  textSize?: 'normal' | 'large';
  styles?: Partial<CSSProperties>;
  title?: string;
  className?: string;
  isUseTooltip?: boolean;
}

interface IExternalLinkProps {
  href: string;
  value: string;
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
}) => {
  if (isUseTooltip) {
    return (
      <Tooltip title={title}>
        <Styles.ExternalLink href={href} className={className} target={target} rel={rel}>
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
}) => {
  if (isUseTooltip && title) {
    return (
      <Tooltip title={title} arrow>
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
    >
      {value}
    </Styles.RouterLink>
  );
};

export default RouterLink;
