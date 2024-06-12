import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  .filter-wrapper {
    display: flex;
    gap: 15px;
  }

  .data-table.tickets-table {
    padding: 0;

    .ReactVirtualized__Table__headerRow {
      display: none;
    }
  }
`;

export const SelfHealingTriggersWrapper = styled.div`
  width: 100%;
`;

export const HealthCheckChallengesWrapper = styled.div`
  width: 100%;
`;

export const StorageChallengesWrapper = styled.div`
  width: 100%;
`;
