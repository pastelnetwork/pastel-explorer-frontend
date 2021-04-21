import { CSSProperties } from '@material-ui/styles';
import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number;
  styles?: Partial<CSSProperties>;
}

const RouterLink: React.FC<RouterLinkProps> = ({ route, value, styles }) => {
  return (
    <Styles.RouterLink style={styles} to={`${route}`}>
      {value}
    </Styles.RouterLink>
  );
};

export default RouterLink;
