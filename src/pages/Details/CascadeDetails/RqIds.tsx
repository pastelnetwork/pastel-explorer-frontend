import * as Styles from './CascadeDetails.styles';

interface IRqIds {
  data?: string[];
}

const RqIds: React.FC<IRqIds> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Styles.RqIdsWrapper>
      <ul className="list">
        {data.map(value => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </Styles.RqIdsWrapper>
  );
};

export default RqIds;
