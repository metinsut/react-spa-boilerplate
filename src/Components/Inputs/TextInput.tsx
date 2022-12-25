import React from 'react';
import { Control, useController, UseFormRegister } from 'react-hook-form';

type Props = {
  control: Control<any, any>;
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
};

export default function TextInput(props: Props) {
  const { register, control, name, label, placeholder, className, ...rest } = props;
  const { field, fieldState } = useController({ control, name });

  const { value } = field;
  const { error } = fieldState;

  return (
    <div className={className + ' relative mt-6 h-14'}>
      <input
        {...register(name)}
        {...rest}
        id={name}
        className={'form-element-input ' + (value ? 'hasValue' : '')}
        placeholder={placeholder}
      />
      <div className="form-element-bar"></div>
      <label className="form-element-label" htmlFor={name}>
        {label}
      </label>
      <small className="form-element-hint">{error?.message}</small>
    </div>
  );
}
