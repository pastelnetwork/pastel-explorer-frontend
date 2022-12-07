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

export const OpenNSFWChartOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 212px;
  height: 212px;
  border-radius: 100%;
  border: 1px solid #000;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 210px;
    height: 210px;
    border: 10px solid #ccc;
    border-radius: 100%;
  }
`;

export const ImagesWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;

  .main-image {
    max-width: 100%;
    width: 720px;
  }

  .summary-image {
    border-top: 1px solid ${props => props.theme.sidebar.menu.default};
    border-bottom: 1px solid ${props => props.theme.sidebar.menu.default};

    img {
      max-width: 100%;
      width: 190px;
    }
  }

  .submitted-image {
    width: calc(55% - 20px);
    margin-right: 20px;
    order: 1;
  }

  .summary-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 45%;
    order: 2;

    .summary {
      width: calc(40% - 20px);
      margin-right: 20px;
    }

    .open-nsfw {
      width: 50%;
    }

    .rareness-score {
      width: 100%;
    }
  }

  .pastel-data {
    width: calc(40% - 20px);
    margin-right: 20px;
    order: 5;
  }

  .analytics-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 60%;
    order: 6;

    .prevalence-of-similar-images {
      width: calc(50% - 20px);
      margin-right: 20px;
    }

    .category-probabilities {
      width: 50%;
    }

    .ipfs {
      width: 100%;
    }
  }

  .rare-on-the-internet-results-graph {
    width: calc(52% - 20px);
    margin-right: 20px;
    order: 7;
  }

  .rare-on-the-internet-alternative-results {
    width: 48%;
    order: 8;
  }

  .similarity-subgraph-plot {
    width: calc(52% - 20px);
    margin-right: 20px;
    order: 9;
  }

  .fingerprint-vector-heatmap {
    width: 48%;
    order: 10;
  }

  @media screen and (max-width: 1300px) {
    .submitted-image {
      width: 100%;
      margin-right: 0;
    }

    .summary-group {
      width: 100%;
    }

    .main-image {
      width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    .pastel-data,
    .rare-on-the-internet-results-graph,
    .similarity-subgraph-plot,
    .rare-on-the-internet-alternative-results,
    .fingerprint-vector-heatmap {
      width: 100%;
      margin-right: 0;
    }

    .analytics-group {
      width: 100%;
    }

    .summary-group {
      .open-nsfw {
        width: 60%;
      }
    }

    .analytics-group {
      .prevalence-of-similar-images,
      .category-probabilities {
        width: 100%;
        margin-right: 0;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .summary-group {
      .summary {
        width: 100%;
        margin-right: 0;
      }

      .open-nsfw {
        width: 100%;
      }
    }
  }
`;
