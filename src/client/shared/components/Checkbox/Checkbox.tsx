import React, { useCallback, useRef } from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'

import styles from './Checkbox.module.scss'
const cn = makeCn('Checkbox', styles)


export interface CheckboxProps {
  className?: string
  error?: any
  disabled?: boolean
  name?: string | number
  value?: boolean
  onChange?: (value: boolean, name?: string | number) => void
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
  const { className, error, disabled, name, value, onChange } = props

  const input = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    ({ target: { checked } }) => {
      if (onChange) {
        onChange(checked, name)
      }
    },
    [name, onChange]
  )

  const handleClick = useCallback(() => {
    input.current.click()
  }, [])

  return (
    <ButtonBox className={classnames(cn(), className)} onClick={handleClick}>
      <input className={cn('Input', { error: !!error })} ref={input} type="checkbox" disabled={disabled} checked={value} onChange={handleChange} />
      <Icon icon="checkmark" className={cn('Check')} />
    </ButtonBox>
  )
}

Checkbox.defaultProps = {
  className: null,
}
