import React from 'react';
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box';
import { classnames } from '@bem-react/classnames';
import { IconName } from '~public/models/icon.model'
import { Icon } from '@shared/components/Icon'
import { ButtonContentLoader } from '@shared/components/ButtonContentLoader'

import { makeCn } from '../../utils'
import styles from './Button.module.scss';

const cn = makeCn('Button', styles);

export type ButtonStyleType = 'filled' | 'rounded';


export interface ButtonOwnProps<T extends ButtonStyleType> {
  children: string | React.ReactNode;
  className?: string;
  styleType: T;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color: (
    T extends 'filled' ?
      'blue' | 'light' | 'red' :
    T extends 'rounded' ?
      'blue' | 'grey' | 'transparent' | 'red'
    : never
    );
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  loadable?: boolean;
  loaded?: number;
}

export type ButtonProps<E extends React.ElementType,
  T extends ButtonStyleType,
  > = PolymorphicComponentProps<E, ButtonOwnProps<T>>;

const DEFAULT_ELEMENT = 'button';

export const Button = <E extends React.ElementType = typeof DEFAULT_ELEMENT, T extends ButtonStyleType = 'filled'>(props: ButtonProps<E, T>): JSX.Element => {
  const {
    children,
    className,
    styleType,
    color,
    size,
    disabled,
    icon,
    iconPosition,
    iconClassName,
    loadable,
    loaded,
    ...rest
  } = props;

  return (
    <Box
      as={DEFAULT_ELEMENT}
      className={classnames(cn({
        size, color, styleType, loading: loadable, icon: !!icon,
      }), className)}
      disabled={disabled || loadable}
      loadable={loadable.toString()}
      loaded={loaded}
      {...rest}
    >
      <span className={cn('Inner')}>
        {loadable && (
          <>
            <div className={cn('LoadingBackground')} />
            <div className={cn('LoadingProgress')} style={{ width: `${loaded}%` }} />
            <ButtonContentLoader className={cn('LoadingContainer')} />
          </>
        )}
        {icon && (<Icon className={classnames(cn('Icon', { color, styleType, iconPosition }), iconClassName)} icon={icon} />)}
        {children}
      </span>
    </Box>
  );
};


Button.defaultProps = {
  className: null,
  size: 'medium',
  type: 'button',
  disabled: false,
  iconPosition: 'right',
  loadable: false,
  loaded: 0,
} as Partial<ButtonOwnProps<undefined>>;
