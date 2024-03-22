import Skeleton from '@mui/material/Skeleton';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';
import * as StatisticsStyles from '@pages/Statistics/Statistics.styles';

interface ILoading {
  isLoading: boolean;
}

export default function Loading({ isLoading }: ILoading) {
  if (!isLoading) {
    return null;
  }

  return (
    <>
      <Skeleton animation="wave" variant="rectangular" height={300} />
      <StatisticsStyles.LoadingText>
        {parse(translate('common.loadingData'))}
      </StatisticsStyles.LoadingText>
    </>
  );
}
