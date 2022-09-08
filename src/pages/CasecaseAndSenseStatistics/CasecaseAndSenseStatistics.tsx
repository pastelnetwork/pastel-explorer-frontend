import React from 'react';

import TotalOfCascadeRequests from './TotalOfCascadeRequests';
import TotalSizeOfDataStored from './TotalSizeOfDataStored';
import AverageSizeOfNFTStoredOnCascade from './AverageSizeOfNFTStoredOnCascade';
import TotalOfSenseRequests from './TotalOfSenseRequests';
import AverageRarenessScoreOfNFTsOnSense from './AverageRarenessScoreOfNFTsOnSense';
import TotalFingerprintsOnSense from './TotalFingerprintsOnSense';
import * as Styles from './CasecaseAndSenseStatistics.styles';

const CasecaseAndSenseStatistics: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Styles.ChartWrapper>
        <AverageRarenessScoreOfNFTsOnSense />
        <AverageSizeOfNFTStoredOnCascade />
        <TotalOfCascadeRequests />
        <TotalOfSenseRequests />
        <TotalFingerprintsOnSense />
        <TotalSizeOfDataStored />
      </Styles.ChartWrapper>
    </Styles.Wrapper>
  );
};

export default CasecaseAndSenseStatistics;
