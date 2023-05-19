import styled from 'styled-components';

export const Wrapper = styled('div')`
  width: 100%;

  .bold {
    font-weight: 700;
  }
`;

export const ContentWrapper = styled('div')`
  width: 100%;
  padding: 0 12px 20px;

  .txt-id {
    display: inline-block;
    margin-left: 40px;
  }
`;

export const SummaryWrapper = styled('div')`
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;

    h2 {
      padding-right: 10px;
    }
  }

  .share-icon {
    margin-right: 20px;
  }

  .banner {
    position: relative;
    max-height: 320px;
    overflow: hidden;

    .banner-box {
      position: relative;
      height: 0px;
      padding-bottom: 25%;
    }

    img {
      position: absolute;
      inset: 0px;
      box-sizing: border-box;
      padding: 0px;
      border: none;
      margin: auto;
      display: block;
      width: 0px;
      height: 0px;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  .avatar-box {
    margin-top: -156px;
    margin-bottom: 10px;

    .avatar-img {
      position: relative;
      width: 180px;
      height: 180px;
      border-radius: 10px;
      border: 6px solid ${props => props.theme.palette.background.default};
      overflow: hidden;
    }

    img {
      position: absolute;
      inset: 0px;
      box-sizing: border-box;
      padding: 0px;
      border: none;
      margin: auto;
      display: block;
      width: 0px;
      height: 0px;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
  }

  .mt-5 {
    margin-top: 5px;
  }

  .bold {
    font-weight: 700;
  }

  .collection-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .creator-info {
    display: flex;

    ${props => props.theme.breakpoints.down(425)} {
      flex-direction: column;

      .txt-id {
        margin-left: 0;
      }
    }
  }

  .info-list {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
    padding: 0;
    list-style: none;

    li {
      margin-right: 40px;
    }

    .label {
      margin-right: 8px;
      font-weight: 700;
    }

    ${props => props.theme.breakpoints.down(900)} {
      flex-wrap: wrap;

      li {
        width: calc(100% / 3);
        margin-right: 0;
      }
    }

    ${props => props.theme.breakpoints.down(570)} {
      li {
        width: 50%;
      }
    }

    ${props => props.theme.breakpoints.down(425)} {
      li {
        width: 100%;
      }
    }
  }

  ${props => props.theme.breakpoints.down(768)} {
    .summary-list {
      ul {
        flex-wrap: wrap;

        li {
          width: 31%;
          margin-right: 15px;
          margin-bottom: 15px;

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }

    .avatar-box {
      margin-top: -65px;

      .avatar-img {
        width: 90px;
        height: 90px;
      }
    }
  }

  ${props => props.theme.breakpoints.down(453)} {
    .summary-list {
      ul {
        li {
          width: 48%;

          &,
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
`;

export const NFTsWrapper = styled('div')`
  width: 100%;
  margin-top: 20px;

  .MuiAppBar-colorPrimary {
    background: transparent;
    color: ${props => props.theme.palette.text.primary};
    border-bottom: 1px solid ${props => props.theme.card.titleColor};

    .MuiTab-textColorInherit {
      &.Mui-selected {
        min-width: unset;

        .MuiTab-wrapper {
          font-weight: bold;
        }
      }
    }

    .MuiTabs-indicator {
      height: 1px;
      background-color: ${props => props.theme.sidebar.text.primary};
    }
  }
`;

export const NFTsMainContent = styled('div')`
  .nft-content {
    display: flex;
    align-items: flex-start;
    padding-top: 30px;
  }

  .nft-link {
    overflow: unset;
    transition: transform 420ms cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
      transform: scale(1.05);
    }
  }

  .nft-list {
    display: grid;
    grid-auto-rows: minmax(0px, 1fr);
    gap: 16px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    width: 100%;

    .card-item {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      position: relative;
      z-index: 2;
      overflow: hidden;
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
      transition: box-shadow 0.25s ease-in-out 0s;

      .bold {
        font-weight: 700;
      }
    }

    .image-box {
      position: relative;
      height: 100%;
      width: 380px;
      justify-content: center;
      max-height: 100%;
      max-width: 100%;
      padding-bottom: 100%;
      overflow: hidden;

      img {
        position: absolute;
        inset: 0px;
        box-sizing: border-box;
        padding: 0px;
        border: none;
        margin: auto;
        display: block;
        width: 0px;
        height: 0px;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }

    .card-content {
      padding: 10px;
    }

    .card-title {
      font-weight: bold;
      color: ${props => props.theme.palette.text.primary};
    }

    .label-box {
      display: inline-block;
      padding: 4px 12px;
      font-size: 14px;
      color: #fff;
      background-color: #e85dd2;
      border-radius: 15px;

      &.nft {
        background-color: #9f34e1;
      }
    }

    .card-price {
      margin-top: 5px;
      color: ${props => props.theme.palette.text.primary};
    }

    .card-last-sale {
      color: ${props => props.theme.sidebar.menu.default};
      font-weight: 500;
    }
  }

  ${props => props.theme.breakpoints.down(1440)} {
    .nft-list {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .nft-list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(768)} {
    .nft-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(480)} {
    .nft-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(375)} {
    .nft-list {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`;

export const FilterWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0;

  .filter-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
  }

  .filter {
    .MuiButton-label {
      font-size: 16px;
      font-weight: 700;

      svg {
        margin-right: 5px;
      }
    }
  }

  .results {
    padding: 0 30px;
    font-size: 16px;
    white-space: nowrap;
  }

  .search {
    width: 90%;
    margin-right: 30px;

    .MuiOutlinedInput-input {
      padding: 10px 15px;
    }

    svg {
      color: ${props => props.theme.sidebar.menu.default};
    }

    .MuiInputBase-root.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${props => props.theme.palette.text.primary};
      }
    }
  }

  .sort {
    .MuiSelect-select {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  ${props => props.theme.breakpoints.down(1024)} {
    .results {
      display: none;
    }

    .search {
      margin-right: 15px;
    }

    .filter {
      margin-right: 15px;

      .MuiButton-label > span {
        display: none;
      }

      .MuiButton-root {
        min-width: unset;
        padding: 5px 10px;
      }
    }

    .filter-control {
      width: 92%;
    }
  }
`;

export const AdvancedSearchWrapper = styled('div')`
  display: block;
  width: 19%;
  margin-right: 30px;

  .group {
    margin-top: 6px;
    padding: 16px 0 0;
    font-size: 16px;
    font-weight: 700;
    border-top: 1px solid ${props => props.theme.table.hover};
  }

  .MuiAccordionSummary-content {
    .MuiTypography-root {
      font-size: 16px;
      font-weight: 700;

      &.small {
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.theme.sidebar.menu.default};
      }
    }
  }

  .MuiAccordion-root:before {
    display: none;
  }

  .MuiAccordionSummary-root.Mui-expanded {
    min-height: 48px;
  }

  .MuiAccordion-root.Mui-expanded {
    margin: 0;
  }

  .MuiAccordionSummary-content.Mui-expanded {
    margin: 12px 0;
  }

  .list {
    margin: 0 0 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .MuiIconButton-label {
      .MuiSvgIcon-root {
        width: 24px;
        height: 24px;
      }
    }

    .Mui-checked {
      .MuiIconButton-label {
        .MuiSvgIcon-root {
          color: ${props => props.theme.sidebar.menu.active};
        }
      }
    }
  }

  .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .MuiButtonBase-root {
    padding: 0 5px 0 0;
  }

  .price {
    display: flex;
    align-items: center;

    .MuiTypography-root {
      margin: 0 10px;
      font-size: 16px;
      font-weight: 700;
    }

    .MuiOutlinedInput-input {
      padding: 10px 14px;
    }
  }

  .MuiAccordionDetails-root {
    padding: 0;
  }

  .w-full {
    width: 100%;
  }

  .search-item {
    margin-bottom: 15px;

    .MuiInputBase-root {
      padding-left: 10px;
    }

    svg {
      color: ${props => props.theme.sidebar.menu.default};
    }
  }

  .mt-20 {
    margin-bottom: 20px;
  }

  .MuiInputBase-root.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.palette.text.primary};
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
  }

  .group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 99%;

    .small {
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.theme.sidebar.menu.default};
    }
  }

  .advanced-search-header {
    display: none;
  }

  ${props => props.theme.breakpoints.down(1024)} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    margin-right: 0;
    padding: 20px;
    background: ${props => props.theme.palette.background.paper};
    z-index: 100;

    .advanced-search-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

      .MuiTypography-root {
        width: 93%;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
      }

      .MuiButtonBase-root {
        min-width: unset;
        padding: 0;
      }
    }
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  margin-top: 15px;
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

  @media screen and (max-width: 375px) {
    padding: 8px 16px;
    font-size: 15px;
  }
`;

export const PaginationWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0 10px;
`;
