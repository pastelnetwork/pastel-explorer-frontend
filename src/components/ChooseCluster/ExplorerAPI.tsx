import parse from 'html-react-parser';

import { getCurrencyName } from '@utils/appInfo';
import { translate } from '@utils/helpers/i18n';
import { getBaseURL } from '@utils/helpers/useFetch/useFetch';

import { getApiList } from './ExplorerAPI.helpers';
import * as Styles from './ChooseCluster.styles';

const ExplorerAPI: React.FC = () => {
  const apis = getApiList(document.location.pathname);

  return (
    <Styles.ExplorerApiWrapper>
      {apis?.api?.map(item => {
        const domain = item?.url ? getBaseURL() : process.env.REACT_APP_EXPLORER_OPENNODE_API_URL;
        return (
          <Styles.ExplorerApiItem key={item.urlDisplay}>
            <span className="item-title">
              {parse(translate(item.name, { currency: getCurrencyName() }))}:
            </span>
            <Styles.ExplorerApiLink
              href={`${domain}/#/${item.url}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="item-value">{item.urlDisplay}</span>
            </Styles.ExplorerApiLink>
          </Styles.ExplorerApiItem>
        );
      })}
    </Styles.ExplorerApiWrapper>
  );
};

export default ExplorerAPI;
