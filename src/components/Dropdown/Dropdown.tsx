import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
