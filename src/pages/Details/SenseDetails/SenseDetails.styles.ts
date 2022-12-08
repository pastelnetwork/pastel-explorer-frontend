import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const Wrapper = styled('div')`
  display: block;

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
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;
`;

export const ContentItem = styled.div`
  margin-bottom: 5px;

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

  .main-image {
    max-width: 100%;
    width: 720px;
    max-height: 434px;
  }

  .summary-image {
    border-top: 1px solid ${props => props.theme.sidebar.menu.default};
    border-bottom: 1px solid ${props => props.theme.sidebar.menu.default};

    img {
      max-width: 100%;
      width: 150px;
    }
  }

  .submit-image-group {
    width: calc(40% - 20px);
    margin-right: 20px;

    .submitted-image {
      width: 100%;
    }

    .ipfs {
      width: 100%;
    }
  }

  .summary-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 60%;

    .summary {
      width: calc(100% / 3 - 15px);
      margin-right: 20px;
    }

    .open-nsfw {
      width: calc(100% / 3 - 15px);
      margin-right: 20px;
    }

    .rareness-score {
      width: calc(100% / 3 - 15px);
      max-height: 308px;
    }

    .pastel-data {
      width: 100%;
    }
  }

  .analytics-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

    .prevalence-of-similar-images,
    .category-probabilities {
      width: calc(25% - 20px);
      margin-right: 20px;
    }

    .fingerprint-vector-heatmap {
      width: 50%;
    }
  }

  .rare-on-the-internet-results-graph {
    width: calc(33% - 20px);
    margin-right: 20px;
  }

  .rare-on-the-internet-alternative-results {
    width: calc(100% / 3 - 20px);
    margin-right: 20px;
  }

  .similarity-subgraph-plot {
    width: 33.66%;
  }

  .hidden-desktop {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .hidden-tablet {
      display: none;
    }

    .hidden-desktop {
      display: block;
    }

    .analytics-group {
      .prevalence-of-similar-images {
        width: calc(50% - 10px);
        margin-right: 20px;
      }

      .category-probabilities {
        width: calc(50% - 10px);
        margin-right: 0;
      }
    }

    .rare-on-the-internet-results-graph,
    .similarity-subgraph-plot {
      width: calc(50% - 10px);
      margin-right: 20px;
    }

    .rare-on-the-internet-alternative-results,
    .fingerprint-vector-heatmap {
      width: calc(50% - 10px);
      margin-right: 0;
    }

    .summary,
    .rareness-score,
    .open-nsfw {
      width: calc(25% - 15px);
      min-height: 321px;
      margin-right: 20px;
    }

    .ipfs {
      width: calc(25% - 15px);
      min-height: 321px;
      margin-right: 0;
    }
  }

  @media screen and (max-width: 990px) {
    .submit-image-group {
      width: 100%;
      margin-right: 0;
    }

    .main-image {
      max-width: 100%;
      width: 100%;
      max-height: unset;
    }

    .summary-group {
      width: 100%;
      margin-right: 0;
      order: 5;
    }

    .rare-on-the-internet-results-graph,
    .similarity-subgraph-plot,
    .rare-on-the-internet-alternative-results,
    .fingerprint-vector-heatmap,
    .ipfs {
      width: 100%;
      margin-right: 0;
    }

    .ipfs {
      min-height: unset;
      order: 6;
    }

    .summary,
    .rareness-score,
    .open-nsfw {
      width: calc(100% / 3 - 15px);
    }

    .rareness-score {
      margin-right: 0;
    }

    .submit-image-group {
      order: 1;
    }

    .summary {
      order: 2;
    }

    .open-nsfw {
      order: 3;
    }

    .rareness-score {
      order: 4;
    }

    .analytics-group {
      order: 7;
    }

    .rare-on-the-internet-results-graph {
      order: 8;
    }

    .rare-on-the-internet-alternative-results {
      order: 9;
    }

    .similarity-subgraph-plot {
      order: 10;
    }

    .fingerprint-vector-heatmap {
      order: 11;
    }
  }

  @media screen and (max-width: 680px) {
    .summary,
    .rareness-score,
    .ipfs,
    .open-nsfw {
      width: calc(50% - 10px);
      min-height: 321px;
    }

    .rareness-score,
    .ipfs {
      margin-right: 0;
    }

    .summary {
      order: 2;
    }

    .open-nsfw {
      order: 4;
    }

    .rareness-score {
      order: 5;
    }

    .ipfs {
      order: 3;
    }

    .summary-group {
      order: 6;
    }
  }

  @media screen and (max-width: 480px) {
    .summary,
    .rareness-score,
    .ipfs,
    .open-nsfw {
      width: 100%;
      min-height: unset;
      margin-right: 0;
    }

    .open-nsfw {
      order: 3;
    }

    .rareness-score {
      order: 4;
    }

    .ipfs {
      order: 5;
    }

    .analytics-group {
      .prevalence-of-similar-images,
      .category-probabilities {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;
