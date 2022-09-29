import React from 'react';

import TotalOfCascadeRequests from './TotalOfCascadeRequests';
import TotalSizeOfDataStored from './TotalSizeOfDataStored';
import AverageSizeOfNFTStoredOnCascade from './AverageSizeOfNFTStoredOnCascade';
import TotalOfSenseRequests from './TotalOfSenseRequests';
import AverageRarenessScoreOfNFTsOnSense from './AverageRarenessScoreOfNFTsOnSense';
import TotalFingerprintsOnSense from './TotalFingerprintsOnSense';
import * as Styles from './CascadeAndSenseStatistics.styles';

const CascadeAndSenseStatistics: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Styles.ChartWrapper>
        <AverageRarenessScoreOfNFTsOnSense />
        <TotalOfSenseRequests />
        <TotalFingerprintsOnSense />
        <AverageSizeOfNFTStoredOnCascade />
        <TotalOfCascadeRequests />
        <TotalSizeOfDataStored />
      </Styles.ChartWrapper>
    </Styles.Wrapper>
  );
};

export default CascadeAndSenseStatistics;
