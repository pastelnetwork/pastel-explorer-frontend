import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';

export const Wrapper = styled.div`
  display: block;

  .action-ticket-status {
    padding: 4px;

    svg {
      font-size: 14px;
    }
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

  .registration_txid {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  ${props => props.theme.breakpoints.down(1200)} {
    .view-more {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ${props => props.theme.breakpoints.down(768)} {
    .MuiAlert-message {
      .MuiTypography-root {
        display: flex;
        align-items: center;
      }
    }

    .address-link {
      display: inline-block;
      max-width: 68%;
      margin-left: 5px;
    }

    .alert-wrapper,
    .MuiAlert-message {
      width: 100%;
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
`;

export const BlockWrapper = styled.div`
  padding: 9px 16px;

  &.no-spacing {
    padding: 0;
  }

  &.submitted-image-content {
    padding: 5px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;

  .file-info {
    width: 100%;
    margin-bottom: 20px;
  }

  .rq-ids {
    width: 100%;
  }

  .file-info-title-block {
    padding: 12px 16px;
  }
`;

export const FileInfoWrapper = styled.div`
  display: block;

  .file-content-info {
    width: calc(100% - 125px);
  }

  .mt-4 {
    margin-top: 4px;
  }

  .w-full {
    width: 100%;
  }

  .file-container {
    display: flex;
    align-items: flex-start;

    .icon {
      width: 56px;
      margin-right: 25px;

      img {
        max-width: 100%;
      }
    }

    .file_name {
      max-width: 100%;
      padding-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 18px;
      font-weight: 700;
      white-space: nowrap;
    }

    .file_file {
      font-size: 12px;
      color: ${props => props.theme.sidebar.menu.default};
    }
  }

  .mt-10 {
    margin-top: 10px;
  }

  .raptor-q-parameters {
    margin-top: 20px;
    padding-top: 10px;
    border-top: solid 1px ${props => props.theme.table.hover};

    .title {
      font-weight: 700;
    }
  }

  .rq-ids {
    margin-top: 10px;
  }

  ${props => props.theme.breakpoints.down(600)} {
    .file-container {
      .icon {
        width: 80px;
        margin-right: 15px;
      }
    }

    .file-content-info {
      width: calc(100% - 95px);
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
`;

export const RqIdsWrapper = styled.div`
  display: block;

  .list {
    display: grid;
    grid-auto-rows: minmax(0px, 1fr);
    gap: 10px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
    padding-left: 0;
    list-style: none;
  }

  ${props => props.theme.breakpoints.up(1950)} {
    .list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(1440)} {
    .list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  ${props => props.theme.breakpoints.down(900)} {
    .list {
      grid-template-columns: repeat(1, minmax(0, 1fr));

      li {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const SnackbarContent = styled.div`
  max-width: 300px;
`;

export const AlterDownload = styled(Alert)`
  .MuiAlert-icon,
  .MuiAlert-message {
    padding: 0;
  }
`;

export const Img = styled.img`
  width: 56px;

  ${props => props.theme.breakpoints.down(600)} {
    width: 80px;
  }
`;
