import { useState } from 'react';
import DatePicker from 'react-datepicker';
import DateRangeIcon from '@material-ui/icons/DateRange';
import differenceInDays from 'date-fns/differenceInDays';
import subDays from 'date-fns/subDays';

import 'react-datepicker/dist/react-datepicker.css';

import * as Styles from './DateTimePicker.styles';

const predefinedList = [
  {
    name: 'Last 7 days',
    value: 7,
  },
  {
    name: 'Last 30 days',
    value: 30,
  },
  {
    name: 'Last 90 days',
    value: 90,
  },
  {
    name: 'Last 180 days',
    value: 180,
  },
  {
    name: 'Last 365 days',
    value: 365,
  },
];

interface IDateTimePickerProps {
  onApply?: (_startDate: number, _endDate: number | null) => void;
  defaultDateRange?: {
    startDate: number;
    endDate: number | null;
  };
}

const getDifferenceInDays = (startDate: number, endDate: number) => {
  if (!startDate || !endDate) {
    return 0;
  }
  return differenceInDays(endDate, startDate) + 1;
};

const DateTimePicker: React.FC<IDateTimePickerProps> = ({ onApply, defaultDateRange }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(
    defaultDateRange?.startDate ? new Date(defaultDateRange.startDate) : new Date(),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultDateRange?.endDate ? new Date(defaultDateRange?.endDate) : null,
  );
  const [selectedPredefined, setSelectedPredefined] = useState<number>(
    getDifferenceInDays(defaultDateRange?.startDate || 0, defaultDateRange?.endDate || 0),
  );

  const onChange = (dates: [Date, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleShowDatePicker = () => {
    setOpen(!open);
  };

  const handleCloseDatePicker = () => {
    setOpen(false);
  };

  const handleContinueClick = () => {
    if (onApply) {
      onApply(startDate.valueOf(), endDate?.valueOf() || null);
    }
    setOpen(false);
  };

  const handlePredefinedClick = (day: number) => {
    const result = subDays(new Date(), day - 1);
    const currentDate = new Date();
    setStartDate(result);
    setEndDate(currentDate);
    setSelectedPredefined(day);
  };

  const options = {
    startDate,
    endDate,
    maxDate: new Date(),
    onChange: (dates: [Date, Date | null]) => onChange(dates),
    selectsRange: true,
    inline: true,
    showPopperArrow: false,
  };

  return (
    <Styles.Wrapper>
      <Styles.IconWrapper>
        <DateRangeIcon onClick={handleShowDatePicker} />
      </Styles.IconWrapper>
      {open ? (
        <Styles.DatePickerPopper>
          <Styles.DatePickerContent>
            <Styles.DatePicker>
              <DatePicker {...options} />
            </Styles.DatePicker>
            <Styles.PredefinedWrapper>
              <p>Predefined dates</p>
              <ul>
                {predefinedList.map(item => (
                  <li
                    key={item.value}
                    className={`${selectedPredefined === item.value ? 'active' : ''}`}
                  >
                    <button type="button" onClick={() => handlePredefinedClick(item.value)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Styles.PredefinedWrapper>
          </Styles.DatePickerContent>
          <Styles.Footer>
            <Styles.CancelButton onClick={handleCloseDatePicker}>Cancel</Styles.CancelButton>
            <Styles.SelectedDay>
              <span>Selected</span>:{' '}
              {endDate && startDate
                ? `${getDifferenceInDays(startDate.valueOf(), endDate.valueOf())} days`
                : '1 day'}
            </Styles.SelectedDay>
            <Styles.ContinueButton onClick={handleContinueClick}>Continue</Styles.ContinueButton>
          </Styles.Footer>
        </Styles.DatePickerPopper>
      ) : null}
    </Styles.Wrapper>
  );
};

export default DateTimePicker;
