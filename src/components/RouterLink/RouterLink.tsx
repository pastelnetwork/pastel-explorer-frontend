import * as Styles from './RouterLink.styles';

interface RouterLinkProps {
  route: string;
  value: string | number;
}

const RouterLink: React.FC<RouterLinkProps> = ({ route, value }) => {
  return <Styles.RouterLink to={`${route}`}>{value}</Styles.RouterLink>;
};

export default RouterLink;
