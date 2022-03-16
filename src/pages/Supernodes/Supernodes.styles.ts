import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridWrapper = styled(Grid)`
  .pl-4px {
    padding-left: 4px;
  }

  .pl-8px {
    padding-left: 8px;
  }

  .pl-12px {
    padding-left: 12px;
  }

  .pl-14px {
    padding-left: 14px;
  }

  .col-address {
    & > .MuiTableCell-root {
      padding-left: 0;
    }
  }

  .supernode-table {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const BlockWrapper = styled.div`
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  background: ${props => props.theme.sidebar.menu.background};
  border-radius: 10px;
  overflow: hidden;
`;

export const BlockTitle = styled.h3`
  margin: 0;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 16px;
  background: ${props => props.theme.card.titleColor};
`;
