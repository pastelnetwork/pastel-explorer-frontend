import { CSSProperties } from '@material-ui/styles';
import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number;
  textSize?: 'normal' | 'large';
  styles?: Partial<CSSProperties>;
  title?: string;
}

const RouterLink: React.FC<RouterLinkProps> = ({
  route,
  value,
  textSize = 'normal',
  styles,
  title,
}) => {
  return (
    <Styles.RouterLink style={styles} title={title} to={`${route}`} textsize={textSize}>
      {value}
    </Styles.RouterLink>
  );
};

export default RouterLink;
