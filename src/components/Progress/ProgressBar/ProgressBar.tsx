import * as Styles from './ProgressBar.styles';

interface IProgressBarProps {
  value: number;
  total: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ value, total }) => {
  const percent = `${((value * 100) / total).toFixed(0)}%`;

  return (
    <Styles.ProgressBarWrapper>
      <Styles.ProgressBarValue style={{ width: percent }} />
    </Styles.ProgressBarWrapper>
  );
};

export default ProgressBar;
