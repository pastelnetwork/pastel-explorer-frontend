import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

export const Wrapper = styled.div`
  display: inline-flex;
`;

export const PopoverWrapper = styled(Popover)`
  .MuiPopover-paper {
    max-width: unset;
    max-height: unset;
    overflow: unset;
    background: transparent;
  }
`;

export const IconWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48px;
  height: 48px;
  padding: 12px;
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px;

  svg {
    font-size: 24px;
  }

  &:hover {
    background-color: ${props => props.theme.sidebar.menu.toggle.background};
  }
`;

export const ShareList = styled.ul`
  position: relative;
  padding: 8px;
  max-height: 350px;
  background-color: ${props => props.theme.palette.background.default};
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 15px;
  min-width: 220px;
  overflow-y: auto;
`;

export const ShareItem = styled.li`
  width: 100%;
  list-style-type: none;

  .share-button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px !important;
    font-weight: 600 !important;
    text-align: left;
    border: none !important;
    overflow: hidden;
    border-radius: 12px;
    background: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgb(242, 244, 245) !important;
    }

    .share-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    .share-icon {
      svg {
        font-size: 24px;
        width: 24px;
        height: 24px;
        border-radius: 50%;

        rect {
          fill: #34a1ff;
        }
      }
    }

    &.copy-button {
      .share-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #34a1ff;
        border-radius: 50%;

        svg {
          width: 14px;
          height: 14px;
          color: #fff;
        }
      }
    }
  }
`;
