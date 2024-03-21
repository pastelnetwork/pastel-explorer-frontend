import { shallow } from 'enzyme';

import 'jest-styled-components';

import { MyMockType } from '@utils/types/MockType';
import i18next from '../../../utils/helpers/i18n';
import CascadeAndSenseStatistics from '../CascadeAndSenseStatistics';
import TotalOfCascadeRequests from '../TotalOfCascadeRequests';
import TotalSizeOfDataStored from '../TotalSizeOfDataStored';
import AverageSizeOfNFTStoredOnCascade from '../AverageSizeOfNFTStoredOnCascade';
import TotalOfSenseRequests from '../TotalOfSenseRequests';
import AverageRarenessScoreOfNFTsOnSense from '../AverageRarenessScoreOfNFTsOnSense';
import TotalFingerprintsOnSense from '../TotalFingerprintsOnSense';
import * as Styles from '../CascadeAndSenseStatistics.styles';

jest.mock('i18next-http-backend');
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            // noop
          }),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {
      // noop
    },
  },
}));
i18next.t = jest.fn().mockImplementation((...arg) => {
  return arg[0];
}) as MyMockType;

describe('pages/CascadeAndSenseStatistics', () => {
  const wrapper = shallow(<CascadeAndSenseStatistics />);

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <TotalOfCascadeRequests>', () => {
    expect(wrapper.find(TotalOfCascadeRequests).length).toBe(1);
  });

  test('should render <TotalSizeOfDataStored>', () => {
    expect(wrapper.find(TotalSizeOfDataStored).length).toBe(1);
  });

  test('should render <AverageSizeOfNFTStoredOnCascade>', () => {
    expect(wrapper.find(AverageSizeOfNFTStoredOnCascade).length).toBe(1);
  });

  test('should render <TotalOfSenseRequests>', () => {
    expect(wrapper.find(TotalOfSenseRequests).length).toBe(1);
  });

  test('should render <AverageRarenessScoreOfNFTsOnSense>', () => {
    expect(wrapper.find(AverageRarenessScoreOfNFTsOnSense).length).toBe(1);
  });

  test('should render <TotalFingerprintsOnSense>', () => {
    expect(wrapper.find(TotalFingerprintsOnSense).length).toBe(1);
  });

  test('should render <Styles.Wrapper>', () => {
    expect(wrapper.find(Styles.Wrapper).length).toBe(1);
  });
});
