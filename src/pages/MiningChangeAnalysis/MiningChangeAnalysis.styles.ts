import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  .cascade-sense-statistics {
    .MuiSelect-select {
      width: 90px;
      border: 0;
      padding: 0 20px 0;
    }

    .MuiSelect-icon {
      right: -6px;
    }
  }

  .echarts-for-react {
    height: 320px !important;
  }

  ${props => props.theme.breakpoints.down('md')} {
    .statistics-card {
      width: 100%;
      margin-bottom: 16px;
    }
  }

  ${props => props.theme.breakpoints.down(590)} {
    .header-wrapper {
      flex-direction: column;
    }

    .download-wrapper {
      width: 100%;
      margin-top: 10px;
    }
  }
`;

export const ViewTransactionRaw = styled('a')`
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.link.main};
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;
