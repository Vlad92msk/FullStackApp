import React, { useCallback } from 'react'
import { Text } from '@client/shared/components/Text'
import { cn } from './cn'

export type SwitcherElement = {
  value: any
  name: string
  label: string
}

export type SwitchType = {
  switcher: SwitcherElement
  currentValue: any
  onChange: (id: any) => void
}

export const SwitcherOption: React.FC<SwitchType> = React.memo((props) => {
  const { switcher: { value, name, label }, currentValue, onChange } = props

  const handleSwitch = useCallback(() => {
    onChange(value)
  }, [])

  return (
    <>
      <input
        className={cn('RadioInput')}
        onChange={handleSwitch}
        type={'radio'}
        value={value}
        name={name + 'switcher'}
        id={name + value}
        checked={currentValue === value}
      />
      <label htmlFor={name + value}>
        <Text className={cn('RadioLabel')} size={'1'} children={label} />
      </label>
    </>
  )
})
