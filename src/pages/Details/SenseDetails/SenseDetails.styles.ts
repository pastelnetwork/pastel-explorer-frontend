import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const Wrapper = styled('div')`
  display: block;

  .copy-icon {
    svg {
      color: #2d3748 !important;
    }
  }

  .break-all {
    word-break: break-all;
  }

  .text-center {
    text-align: center;
  }

  .read-more {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .py-10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .py-11 {
    padding-top: 11px;
    padding-bottom: 11px;
  }

  .py-50 {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .flex {
    display: flex;
  }

  .ml-5 {
    margin-left: 5px;
  }

  .mt-25 {
    margin-top: 25px;
  }

  .pt-8 {
    padding-top: 8px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .alert-title {
    margin-top: 0;
    margin-bottom: 0;
    word-break: 'break-word';
  }
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;

  &.no-spacing {
    padding: 0;
  }
`;

export const ContentItem = styled.div`
  margin-bottom: 5px;

  &.min-height-315 {
    min-height: 315px;
  }

  &.min-height-400 {
    min-height: 400px;
  }

  .tooltip-wrapper {
    font-size: 14px;

    &.max-w-280 {
      max-width: 280px;
    }

    .tooltip-content-wrapper {
      margin-top: 20px;
    }

    .tooltip-name {
      font-weight: bold;
      font-size: 16px;
      word-break: break-all;
      white-space: break-spaces;
    }

    .tooltip-url {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tooltip-item {
      margin-top: 5px;

      .label {
        font-weight: bold;
      }

      .value {
        max-width: 100%;
        font-weight: normal;
      }

      .description {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: break-spaces;
      }
    }
  }
`;

export const OpenNSFWChartWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

export const OpenNSFWContent = styled.div`
  margin: 15px 0;
`;

export const OpenNSFWChartOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 174px;
  height: 174px;
  border-radius: 100%;
  border: 1px solid #000;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 172px;
    height: 172px;
    border: 10px solid #ccc;
    border-radius: 100%;
  }
`;

export const RarenessScoreContent = styled.div`
  margin: 23px 0;
`;

export const ImagesWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;

  .summary-image {
    border-top: 1px solid ${props => props.theme.sidebar.menu.default};
    border-bottom: 1px solid ${props => props.theme.sidebar.menu.default};

    img {
      max-width: 100%;
      width: 150px;
    }
  }

  .pastel-data {
    width: calc(40% - 20px);
    margin-right: 20px;

    &.min-height-725 {
      min-height: 725px;
    }
  }

  .summary-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 60%;

    .summary,
    .open-nsfw {
      width: calc(100% / 3 - 15px);
      margin-right: 20px;
    }

    .rareness-score {
      width: calc(100% / 3 - 15px);
      max-height: 308px;
    }
  }

  .analytics-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

    .prevalence-of-similar-images,
    .category-probabilities {
      width: calc(50% - 10px);
    }

    .prevalence-of-similar-images {
      margin-right: 20px;
    }
  }

  .rare-on-the-internet-results-graph,
  .rare-on-the-internet-alternative-results,
  .fingerprint-vector-heatmap {
    width: calc(100% / 3 - 15px);
  }

  .rare-on-the-internet-results-graph,
  .rare-on-the-internet-alternative-results {
    margin-right: 20px;
  }

  .similar-registered-images {
    width: 100%;
  }

  @media screen and (max-width: 1100px) {
    .pastel-data,
    .summary-group {
      width: 100%;
    }

    .summary-group {
      order: 1;
    }

    .pastel-data {
      margin-right: 0;
      order: 2;

      &.min-height-725 {
        min-height: unset;
      }
    }

    .rare-on-the-internet-results-graph {
      order: 3;
    }

    .rare-on-the-internet-alternative-results {
      order: 4;
    }

    .fingerprint-vector-heatmap {
      order: 5;
    }

    .similar-registered-images {
      order: 6;
    }
  }

  @media screen and (max-width: 990px) {
    .rare-on-the-internet-results-graph,
    .rare-on-the-internet-alternative-results,
    .fingerprint-vector-heatmap {
      width: 100%;
    }

    .rare-on-the-internet-results-graph,
    .rare-on-the-internet-alternative-results {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 678px) {
    .prevalence-of-similar-images,
    .category-probabilities,
    .summary,
    .open-nsfw,
    .rareness-score {
      width: 100%;
    }

    .prevalence-of-similar-images,
    .summary,
    .open-nsfw {
      margin-right: 0;
    }
  }
`;

export const RawDataWrapper = styled.span`
  font-size: 16px;

  .MuiButtonBase-root {
    margin: 0 5px 0 0;
    padding: 0;

    .MuiSvgIcon-root {
      width: 14px;
      height: 14px;
    }
  }
`;

export const ViewTransactionRaw = styled('button')`
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.link.main};

  &:hover {
    color: ${props => props.theme.link.hover};
  }

  &:active {
    color: ${props => props.theme.link.pressed};
  }
`;

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;

  .table__row-header {
    th {
      white-space: nowrap;
    }
  }

  .table__row {
    img {
      width: 64px;
      height: 64px;
    }
  }

  .white-space-nowrap {
    white-space: nowrap;
  }
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 14px;
`;

export const ProgressBarItem = styled.div`
  height: 14px;
  background: linear-gradient(to right, #4286f4, #373b44);
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.card.titleColor};
  padding-right: 16px;
`;