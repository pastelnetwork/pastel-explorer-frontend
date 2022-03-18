import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import * as Styles from './Dropdown.styles';

type OptionsProps = {
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
};

export const Dropdown = ({ value, onChange, options }: DropdownProps): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Select value={value} onChange={onChange} label="Status">
        {options.map((option: OptionsProps) => (
          <MenuItem value={option.value} key={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Styles.Wrapper>
  );
};
