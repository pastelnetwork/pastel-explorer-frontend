import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: block;
  width: 100%;

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
    padding: 15px;
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
    height: 400px;
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

    .share-icon {
      width: 40px;
      height: 40px;
      padding: 8px;

      svg {
        font-size: 20px;
      }
    }
  }

  .nft-info {
    margin-bottom: 6px;

    .title {
      margin: 0;
      font-size: 30px;
      font-weight: 700;
    }

    .txt-id {
      display: inline-block;
      margin-left: 40px;
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
  }

  ${props => props.theme.breakpoints.down(680)} {
    .submitted-image-creator-section {
      min-width: unset;
    }

    .submitted-image {
      height: 350px;
    }

    .nft-info {
      .txt-id {
        display: block;
        margin-left: 0;
        margin-top: 5px;
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 9px 16px;
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
    max-height: 100%;
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
  .activities-table {
    padding: 0;

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
