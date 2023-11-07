import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

import { translateDropdown } from '@utils/helpers/i18n';

import * as Styles from './Dropdown.styles';

export type OptionsProps = {
  value: string | number;
  name: string;
};

type DropdownProps = {
  value: string;
  onChange: (
    _value: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => void;
  options: OptionsProps[];
  label?: React.ReactNode;
  classNameWrapper?: string;
};

export const Dropdown = ({
  value,
  onChange,
  options,
  label,
  classNameWrapper,
}: DropdownProps): JSX.Element => {
  return (
    <Styles.Wrapper className={classNameWrapper}>
      {label ? <Styles.Label>{label}</Styles.Label> : null}
      <Select
        value={value}
        onChange={onChange}
        MenuProps={{
          style: {
            maxHeight: '50vh',
          },
        }}
      >
        {options.map((option: OptionsProps) => (
          <MenuItem value={option.value} key={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Styles.Wrapper>
  );
};

Dropdown.defaultProps = {
  label: undefined,
  classNameWrapper: '',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ITagDropdown {
  defaultValues?: string[];
  onChange?: (_values: string[]) => void;
  placeholder?: string;
  options: OptionsProps[];
}

export const TagDropdown: React.FC<ITagDropdown> = ({
  defaultValues = [],
  onChange,
  placeholder,
  options,
}) => {
  const [values, setValues] = React.useState<string[]>(defaultValues);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValues(event.target.value as string[]);
  };

  const handleClose = () => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Styles.Wrapper>
      <Select
        multiple
        displayEmpty
        value={values}
        onChange={handleChange}
        onClose={handleClose}
        input={<Input />}
        renderValue={selected => {
          if (!(selected as string[]).length) {
            return placeholder;
          }
          const items = options
            .filter(o => o.value && (selected as string[]).indexOf(o.value.toString()) !== -1)
            .map(o => translateDropdown(o.name));
          return items.join(', ');
        }}
        MenuProps={MenuProps}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={values.indexOf(option.value.toString()) > -1} />
            <ListItemText primary={translateDropdown(option.name)} />
          </MenuItem>
        ))}
      </Select>
    </Styles.Wrapper>
  );
};
