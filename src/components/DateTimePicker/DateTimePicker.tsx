import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import DateRangeIcon from '@material-ui/icons/DateRange';
import differenceInDays from 'date-fns/differenceInDays';
import subDays from 'date-fns/subDays';

import { translate } from '@utils/helpers/i18n';
import UseOnClickOutside from '@hooks/useOnClickOutside';
import 'react-datepicker/dist/react-datepicker.css';

import * as Styles from './DateTimePicker.styles';

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
  const predefinedList = [
    {
      name: translate('components.dateTimePicker.predefinedList.7days'),
      value: 7,
    },
    {
      name: translate('components.dateTimePicker.predefinedList.30days'),
      value: 30,
    },
    {
      name: translate('components.dateTimePicker.predefinedList.90days'),
      value: 90,
    },
    {
      name: translate('components.dateTimePicker.predefinedList.180days'),
      value: 180,
    },
    {
      name: translate('components.dateTimePicker.predefinedList.365days'),
      value: 365,
    },
  ];
  const dateTimePickerRef = useRef<HTMLDivElement>(null);
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

  UseOnClickOutside(dateTimePickerRef, () => setOpen(false));

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
      const newEndDate =
        endDate?.valueOf() && startDate.valueOf() !== endDate.valueOf() ? endDate.valueOf() : null;
      onApply(startDate.valueOf(), newEndDate);
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
    locale: 'en',
  };

  return (
    <Styles.Wrapper>
      <Styles.IconWrapper>
        <DateRangeIcon onClick={handleShowDatePicker} />
      </Styles.IconWrapper>
      {open ? (
        <Styles.DatePickerPopper ref={dateTimePickerRef}>
          <Styles.DatePickerContent>
            <Styles.DatePicker>
              <DatePicker {...options} />
            </Styles.DatePicker>
            <Styles.PredefinedWrapper>
              <p>{translate('components.dateTimePicker.predefinedDates')}</p>
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
            <Styles.CancelButton onClick={handleCloseDatePicker}>
              {translate('components.dateTimePicker.cancel')}
            </Styles.CancelButton>
            <Styles.SelectedDay>
              <span>{translate('components.dateTimePicker.selected')}</span>:{' '}
              {endDate && startDate
                ? `${getDifferenceInDays(startDate.valueOf(), endDate.valueOf())} ${translate(
                    'components.dateTimePicker.days',
                  )}`
                : `1 ${translate('components.dateTimePicker.day')}`}
            </Styles.SelectedDay>
            <Styles.ContinueButton onClick={handleContinueClick}>
              {translate('components.dateTimePicker.continue')}
            </Styles.ContinueButton>
          </Styles.Footer>
        </Styles.DatePickerPopper>
      ) : null}
    </Styles.Wrapper>
  );
};

export default DateTimePicker;
