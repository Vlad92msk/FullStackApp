import React, { useCallback } from 'react';
import { classnames } from '@bem-react/classnames';

import styles from './AreaInput.module.scss';
import { makeCn } from '@client/shared/utils'
import { Text } from '@client/shared/components/Text'


const cn = makeCn('AreaInput', styles);


export interface AreaInputProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'regular' | 'small';
  maxWidth?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  error?: any;
  disabled?: boolean;
  onChange?: (value: string, name?: string) => void;
}


export const AreaInput: React.FunctionComponent<AreaInputProps> = (props) => {
  const {
    className,
    style,
    size,
    name,
    value,
    placeholder,
    error,
    disabled,
    onChange,
    maxWidth
  } = props;


  const handleChange = useCallback(({ target: { value: newValue } }) => {
    onChange(newValue, name);
  }, [name, onChange]);


  return (
    <div className={classnames(cn(), className)} style={style}>
      <Text
        as="textarea"
        color={disabled ? 'disabled' : 'body'}
        className={cn('Input', { error: !!error, size })}
        style={{
          maxWidth
        }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};


AreaInput.defaultProps = {
  className: null,
  size: 'regular',
  placeholder: 'Введите значение...',
};
