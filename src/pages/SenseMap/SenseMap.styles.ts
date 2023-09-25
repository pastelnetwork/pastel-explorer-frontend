import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  .block-wrapper {
    box-shadow: none;
    border-radius: 10px 10px 0 0;
    overflow: unset;

    .ticket-title-wrapper {
      border-radius: 10px 10px 0 0;
    }
  }

  .content-wrapper {
    background-color: ${props => props.theme.palette.background.default};
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  }

  .main-content {
    padding: 2px 10px 10px;
  }

  .MuiSlider-root {
    &.slider {
      .MuiSlider-valueLabel {
        color: ${props => props.theme.sidebar.menu.toggle.hover};
        z-index: 100;
      }
    }
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;

  .filter-dropdown {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &.clustering {
      .MuiSelect-select {
        width: 40px;
      }
    }

    &.node-importance {
      .MuiSelect-select {
        width: 120px;
      }
    }

    &.scale-exponent {
      .MuiSelect-select {
        width: 40px;
      }
    }
  }

  .filter-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .slider-filter {
    display: flex;
    align-items: center;
    margin-right: 25px;
  }

  .slider-wrapper {
    display: inline-flex;
    width: 80px;

    .MuiSlider-root {
      padding: 0;
    }
  }

  .slider-value {
    margin-left: 8px;
    color: ${props => props.theme.sidebar.menu.active};
  }

  .slider-value-wrapper {
    margin-right: 20px;
  }

  .link-strength {
    .MuiCheckbox-root {
      padding: 0;
    }
  }
`;
