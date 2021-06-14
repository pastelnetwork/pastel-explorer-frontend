import { FC, memo } from 'react';

interface IProps {
  title: string;
}

const LineChart: FC<IProps> = ({ title }) => {
  return (
    <div className="container">
      <div className="content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default memo<IProps>(LineChart);
