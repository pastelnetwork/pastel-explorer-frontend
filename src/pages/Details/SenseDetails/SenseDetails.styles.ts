import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import MuiDialog from '@material-ui/core/Dialog';

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

  &.content-center-wrapper {
    display: flex;
    width: 100%;
    height: 60vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      font-size: 18px;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 829px) {
    .image-file-hash {
      display: inline-block;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: bottom;
    }

    .alert-wrapper {
      width: 100%;
      overflow: hidden;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;

  &.no-spacing {
    padding: 0;
  }

  &.submitted-image-content {
    padding: 5px;
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

  &.prevalence-of-similar-images-chart,
  &.chart-section {
    position: relative;

    .empty {
      opacity: 0.2;
    }
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

    .tooltip-image {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

export const OpenNSFWChartWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

export const OpenNSFWContent = styled.div`
  margin: 15px 0;

  &.empty {
    opacity: 0.2;
  }
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

  .submitted-image {
    width: calc(40% - 20px);
    min-height: 650px;
    margin-right: 20px;

    &.min-height-650 {
      min-height: 650px;
    }

    .submitted-image-wrapper {
      width: 100%;
      height: 580px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 10px;

      button {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: zoom-in;
      }

      img {
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;

        &.no_submitted_image {
          height: 200px;

          ${props => props.theme.breakpoints.down(425)} {
            height: 150px;
          }
        }
      }

      .image-placeholder-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }

      .content {
        margin-top: -10px;
        color: ${props => props.theme.sidebar.menu.default};
        font-size: 30px;
        font-size: 600;
        text-align: center;
        line-height: 1.1;

        ${props => props.theme.breakpoints.down('sm')} {
          font-size: 30px;
        }
      }

      .image-placeholder {
        font-size: 200px;
        color: ${props => props.theme.table.hover};

        ${props => props.theme.breakpoints.down('sm')} {
          font-size: 200px;
        }
      }
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
    overflow: unset;

    h4 {
      border-radius: 10px 10px 0 0;
    }
  }

  .similar-registered-images,
  .pastel-data {
    width: 100%;
  }

  @media screen and (max-width: 1100px) {
    .submitted-image,
    .summary-group {
      width: 100%;
    }

    .summary-group {
      order: 2;
    }

    .submitted-image {
      min-height: unset;
      margin-right: 0;
      order: 1;

      &.min-height-650 {
        min-height: unset;
      }

      .submitted-image-wrapper {
        height: 350px;
      }
    }

    .similar-registered-images {
      order: 3;
    }

    .rare-on-the-internet-results-graph {
      order: 4;
    }

    .rare-on-the-internet-alternative-results {
      order: 5;
    }

    .fingerprint-vector-heatmap {
      order: 6;
    }

    .pastel-data {
      order: 7;
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
    .summary-group,
    .analytics-group {
      display: block;
    }

    .analytics-group .prevalence-of-similar-images,
    .analytics-group .category-probabilities,
    .summary-group .summary,
    .summary-group .open-nsfw,
    .summary-group .rareness-score {
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

  .custom-table {
    .table__row {
      height: 95px;

      img {
        width: 64px;
        height: 64px;
      }

      &,
      div,
      img,
      .progress-bar-item {
        transition: all 0.3s ease;
        transform-origin: center;
        transition-duration: 0.4s;
      }

      &.active {
        height: 126px;

        img {
          transform: scale(1.5, 1.5);
        }

        div {
          font-size: 20px;
        }

        .progress-bar-item {
          height: 28px;
        }
      }

      &.prev_row_active,
      &.next_row_active {
        height: 110px;

        img {
          transform: scale(1.2, 1.2);
        }

        div {
          font-size: 18px;
        }

        .progress-bar-item {
          height: 20px;
        }
      }
    }
  }

  .white-space-nowrap {
    white-space: nowrap;
  }

  .seed-images-info {
    color: ${props => props.theme.palette.text.primary};
    margin-left: 5px;
    font-size: 20px;
  }

  .inline-flex {
    display: inline-flex;
    align-items: center;
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

export const FullImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Dialog = styled(MuiDialog)`
  .MuiDialog-paperScrollPaper {
    max-width: 90vw;
    max-height: 90vh;

    img {
      max-height: 89vh;
    }
  }
`;

export const EmptyOverlay = styled.div`
  position: absolute;
  top: -9px;
  left: -16px;
  right: -16px;
  bottom: -14px;
  display: block;
  background: ${props => props.theme.sense.overlay};
`;

export const EmptyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 22px;
  font-weight: 700;
`;
