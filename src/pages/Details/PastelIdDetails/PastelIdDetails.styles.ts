import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Wrapper = styled('div')`
  .block-wrapper {
    margin-bottom: 12px;

    & > .MuiPaper-root {
      margin-bottom: 0 !important;
    }
  }
`;

export const GridStyle = styled(Grid)`
  width: 100%;

  &.mb-20 {
    margin-bottom: 20px;
  }

  .tickets-table {
    .table__row {
      padding: 12px 16px;
      background-color: ${props => props.theme.table.odd} !important;

      &:nth-of-type(odd) {
        background-color: ${props => props.theme.table.even} !important;
      }

      &:hover {
        background-color: ${props => props.theme.table.hover} !important;
      }
    }
  }
`;

export const BlockTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

export const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

export const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 12px 16px;
  background: ${props => props.theme.card.titleColor};
`;

export const FilterBlock = styled.div`
  display: block;
`;
