import { CSSProperties } from '@material-ui/styles';
import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number;
  textSize?: 'normal' | 'large';
  styles?: Partial<CSSProperties>;
  title?: string;
  className?: string;
}

interface IExternalLinkProps {
  href: string;
  value: string;
  styles?: Partial<CSSProperties>;
  className?: string;
  target?: string;
  rel?: string;
}

export const ExternalLink: React.FC<IExternalLinkProps> = ({
  href,
  value,
  className,
  target = '_self',
  rel,
}) => {
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
}) => {
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
