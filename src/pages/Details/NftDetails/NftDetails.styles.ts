import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

export const Wrapper = styled.div`
  display: block;
  width: 100%;

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    padding: 15px;

    .no-data-content {
      font-size: 22px;
      font-weight: 700;
    }
  }

  .expand-more {
    display: flex;
    align-items: center;
    color: ${props => props.theme.sidebar.menu.toggle.switch};
    cursor: pointer;

    svg {
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    &.opened {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .mt-10 {
    margin-top: 10px;
  }

  .view-more {
    text-decoration: none;
    color: ${props => props.theme.link.main};
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    padding: 15px;

    .no-data-content {
      font-size: 22px;
      font-weight: 700;
    }
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

  .summary-image {
    border-top: 1px solid ${props => props.theme.sidebar.menu.default};
    border-bottom: 1px solid ${props => props.theme.sidebar.menu.default};
    text-align: center;

    img {
      max-width: 100%;
      width: 150px;
    }
  }

  .summary-section {
    display: flex;
    justify-content: space-between;

    .summary,
    .open-nsfw,
    .rareness-score {
      width: 32%;
    }
  }

  .offers-content {
    .no-data {
      min-height: 354px;
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

  .similar-registered-images,
  .pastel-data {
    width: 100%;
  }

  .open-nsfw-content,
  .rareness-score-content {
    min-height: 262px;
  }

  .item-activity-content {
    min-height: 269px;
  }

  .offers-content {
    min-height: 173px;
  }

  .creator-content {
    min-height: 353px;
  }

  ${props => props.theme.breakpoints.down(425)} {
    .MuiSelect-select {
      width: 110px;
    }
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;

  .no-spacing {
    padding: 0;
  }

  .read-more {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .submitted-image-creator-section {
    width: calc(28% - 20px);
    min-width: 380px;
    margin-right: 20px;
  }

  .nft-data {
    width: 72%;
    max-width: calc(100% - 400px);
  }

  .submitted-image {
    width: 100%;
    max-height: 400px;
    margin-bottom: 20px;
  }

  .submitted-image-content {
    height: 92%;
  }

  .nft-summary,
  .nft-info {
    width: 100%;
  }

  .nft-creator-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nft-info {
    margin-bottom: 26px;
    display: flex;
    justify-content: space-between;

    .title {
      margin: 0;
      font-size: 30px;
      font-weight: 700;
    }

    .txt-id {
      display: inline-block;
      margin-left: 40px;
    }

    .share-icon {
      margin-top: 10px;
      margin-right: 20px;
    }
  }

  .item-activity,
  .more-items {
    width: 100%;
    margin-bottom: 20px;
  }

  .hidden-desktop {
    display: none;
  }

  .summary-title-block {
    padding: 12px 16px;
  }

  .action-ticket-status {
    padding: 4px;

    svg {
      font-size: 14px;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .hidden-desktop {
      display: block;
    }

    .hidden-mobile {
      display: none;
    }

    .submitted-image-creator-section,
    .nft-data {
      width: 100%;
      max-width: 100%;
    }

    .submitted-image-creator-section {
      margin-right: 0;
    }

    .nft-info {
      .title {
        font-size: 22px;
      }
    }
  }

  ${props => props.theme.breakpoints.down(680)} {
    .submitted-image-creator-section {
      min-width: unset;
    }

    .submitted-image {
      max-height: 350px;
    }

    .nft-info {
      .txt-id {
        display: block;
        margin-left: 0;
        margin-top: 5px;
      }

      .share-icon {
        margin-right: 10px;
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;

  &.relative {
    position: relative;
  }

  .no-spacing {
    padding: 0;
  }
`;

export const ContentItem = styled.div`
  margin-bottom: 5px;
`;

export const MoreItemsWrapper = styled.div`
  .nft-content {
    padding: 8px 0 !important;
  }

  .footer {
    padding: 15px 0;
    text-align: center;
  }
`;

export const LinkButton = styled(Link)`
  display: inline-block;
  padding: 14px 35px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Gill Sans';
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  transition: all 0.5s ease;
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }
`;

export const SubmittedImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 400px;
  }

  &.image-placeholder {
    background-color: #ebeaea;
    border-radius: 10px;

    img {
      max-width: 300px;
      max-height: 300px;
      margin-top: 90px;
    }
  }

  ${props => props.theme.breakpoints.down(680)} {
    &.image-placeholder {
      img {
        margin-top: 62px;
      }
    }
  }
`;

export const ItemActivityWrapper = styled.div`
  &.has-pagination {
    .MuiPaper-root {
      max-height: 210px;
      overflow: auto;
    }
  }

  &.has-scroll {
    .MuiPaper-root {
      max-height: 269px;
      overflow: auto;
    }
  }

  &.offers {
    height: 354px;

    &.has-pagination {
      .MuiPaper-root {
        max-height: unset;
      }
    }

    &.has-scroll {
      .MuiPaper-root {
        max-height: unset;
      }
    }
  }

  .nowrap {
    white-space: nowrap;
  }

  .scroll {
    overflow: auto;
  }

  .activities-table {
    padding: 0;

    &.offers {
      width: 100%;
    }

    .event {
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
      }

      .offer {
        font-size: 22px;
      }

      .accept {
        font-size: 20px;
      }
    }
  }

  .address-link {
    &.read-more {
      display: inline-block;
      max-width: 80%;
      white-space: nowrap;
      vertical-align: bottom;
    }

    &.full {
      max-width: 100%;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .activities-table {
      .table__row-header {
        display: none;
      }

      .table__row {
        display: flex;
        flex-direction: column;
        width: 100%;

        td {
          display: flex;
          align-items: center;
          width: 100%;

          &:before {
            content: attr(data-title);
            position: relative;
            min-width: 90px;
            margin-right: 10px;
            padding-right: 0;
            font-weight: 600;
            font-size: 16px;
            color: ${props => props.theme.table.label};
          }

          &.event-details {
            .event-details-title {
              display: inline-block;
              min-width: 90px;
            }

            &:before {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export const PaginationWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0 10px;
`;

export const DownloadButton = styled.button`
  padding: 8px 25px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Gill Sans';
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  transition: all 0.5s ease;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.8;
    background: ${props => props.theme.sidebar.menu.default};
  }
`;

export const SummaryTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(1, 1, 1, 0.2);
`;

export const LoadingSection = styled.div`
  min-height: 160px;
`;

export const ItemWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
