import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 6px 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 100%;

  svg {
    font-size: 20px;
  }
`;

export const DatePickerPopper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.palette.background.default};
  box-shadow: 0px 5px 6px rgb(16 16 16 / 6%);
  border-radius: 10px;
  z-index: 10;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 92vw;
    max-width: 300px;
  }
`;

export const DatePicker = styled.div`
  width: 100%;
  padding-right: 30px;

  .react-datepicker {
    border: 0;
    background: transparent;

    .react-datepicker__day,
    .react-datepicker__day-name,
    .react-datepicker__current-month {
      color: ${props => props.theme.palette.text.primary};
    }

    .react-datepicker__day--outside-month {
      color: ${props => props.theme.table.hover};
    }

    .react-datepicker__day--selected,
    .react-datepicker__day:hover,
    .react-datepicker__day--in-range,
    .react-datepicker__day--keyboard-selected {
      background: ${props => props.theme.sidebar.menu.toggle.switch};
      color: #fff;
      transition: background 0.3s ease;
    }

    .react-datepicker__header {
      background: transparent;
      border: 0;
    }

    .react-datepicker__navigation-icon {
      &::before {
        border-width: 2px 2px 0 0;
      }
    }
  }

  ${props => props.theme.breakpoints.down('sm')} {
    padding-right: 0;
    order: 2;

    & > div {
      display: flex;
      justify-content: center;
      margin: auto;
    }
  }
`;

export const PredefinedWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 30px 10px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 1px;
    height: 90%;
    background: ${props => props.theme.card.titleColor};
    transform: translateY(-50%);
  }

  ul {
    margin: 5px 0;
    padding-left: 0;
    list-style: none;

    li {
      margin: 5px 0;
      padding: 5px 10px;
      font-size: 0.8rem;
      font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
      border-radius: 4px;
      transition: all 0.3s ease;

      button {
        border: 0;
        background: transparent;
        cursor: pointer;
        color: ${props => props.theme.palette.text.primary};
      }

      &:hover,
      &.active {
        background: ${props => props.theme.card.titleColor};
      }
    }
  }

  p {
    margin: 0;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    order: 1;

    &:before {
      top: unset;
      bottom: 4px;
      left: 50%;
      width: 90%;
      height: 1px;
      transform: translateX(-50%);
    }
  }
`;

export const DatePickerContent = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px 10px 10px;
  border-top: 1px solid ${props => props.theme.card.titleColor};
`;

export const CancelButton = styled.button`
  min-height: unset;
  padding: 8px 25px;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  transition: all 0.3s ease;
  color: ${props => props.theme.palette.text.primary};

  &:hover {
    background: ${props => props.theme.card.titleColor};
  }
`;

export const ContinueButton = styled.button`
  min-height: unset;
  padding: 8px 25px;
  background: ${props => props.theme.sidebar.menu.toggle.switch};
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.sidebar.menu.toggle.hover};
  }
`;

export const SelectedDay = styled.p`
  width: 100%;
  margin: 0;
  padding-right: 10px;
  text-align: right;
  font-size: 14px;
  font-weight: 600;

  span {
    font-weight: 400;
  }

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }
`;
