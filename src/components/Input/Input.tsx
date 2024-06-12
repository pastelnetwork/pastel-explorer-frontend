import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TextFieldVariants } from '@mui/material/TextField';

import * as Styles from './Input.styles';

interface IInput {
  variant?: string;
  type?: string;
  name: string;
  onChange?: (_val: string) => void;
  onBlur?: (_val: string) => void;
  onEnter?: (_val: string) => void;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}

export default function Input({
  name,
  type = 'text',
  variant = 'outlined',
  onChange,
  onBlur,
  onEnter,
  defaultValue,
  className = '',
  placeholder = '',
}: IInput) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
    if (onChange) {
      onChange(event.target.value as string);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(value);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && onEnter) {
      onEnter(value);
    }
  };

  return (
    <Styles.TextField
      name={name}
      type={type}
      variant={variant as TextFieldVariants}
      value={value || defaultValue}
      onChange={handleChange}
      InputProps={{
        onKeyDown: handleKeyUp,
      }}
      onBlur={handleBlur}
      className={className}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = {
  onChange: undefined,
  onBlur: undefined,
  onEnter: undefined,
  defaultValue: '',
  variant: 'outlined',
  type: 'text',
  className: '',
  placeholder: '',
};
