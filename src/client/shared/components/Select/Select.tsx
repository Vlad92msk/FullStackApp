import React, { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { classnames } from '@bem-react/classnames'

import { Text, TextSize } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { TextInput } from '@client_shared/components/TextInput'
import { BlockContentLoader } from '@client_shared/components/BlockContentLoader'
import { Popup } from '@client_shared/components/Popup'
import { OptionValue, SelectValue, Tokenfield } from './model'
import { OptionProps } from './Option'
import { Context } from './Context'
import { cn } from './cn'

export interface SelectProps {
  className?: string
  style?: React.CSSProperties
  size?: TextSize

  value: SelectValue
  name?: string
  onChange: (value: SelectValue, name?: string) => void

  placeholder?: string
  disabled?: boolean
  error?: any
  nullValue?: any

  searchInput?: boolean
  combobox?: boolean
  tokenfield?: Tokenfield
  tokenfieldIsRubber?: boolean

  children: React.ReactNode | React.ReactNode[]
  listChildren?: React.ReactNode | React.ReactNode[]

  isLoading?: boolean

  icon?: React.ReactNode
  onSearchValueSet?: (value: string) => void
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    style,
    size,

    placeholder,
    disabled,
    error,
    nullValue,

    value,
    name,
    onChange,

    searchInput,
    combobox,
    tokenfield,
    tokenfieldIsRubber,

    isLoading,
    children,
    listChildren,

    icon: iconProps,
    onSearchValueSet,
  } = props

  const selectInput = useRef<HTMLDivElement>(null)
  const selectList = useRef<HTMLUListElement>(null)
  const selectListWrap = useRef<HTMLDivElement>(null)

  const [isOpen, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [startScroll, setStartScroll] = useState<null | { prevPosY: number; prevScroll: number }>(null)

  const parsedOptions = useMemo<OptionProps[]>(
    () =>
      Children.toArray(children).reduce<OptionProps[]>(
        (prev, child) => (isValidElement<OptionProps>(child) ? [...prev, { ...child.props, key: child.key }] : prev),
        []
      ),
    [children]
  )

  const handleSearchChange = useCallback((nextValue: string) => {
    setSearchValue(nextValue)
  }, [])

  const handleComboboxChange = useCallback(
    ({ target: { value: nextValue } }) => {
      setSearchValue(nextValue)
      setOpen(true)
      if (onSearchValueSet) onSearchValueSet(nextValue)
    },
    [onSearchValueSet]
  )

  const handleClear = useCallback(() => {
    setSearchValue('')
    onChange(nullValue, name)
  }, [name, onChange, nullValue])

  const handleRemoveToken = useCallback(
    (optionValue: OptionValue) => {
      onChange(Array.isArray(value) ? value.filter((item) => item !== optionValue) : [], name)
      setOpen(true)
    },
    [value, name, onChange]
  )

  const handleChange = useCallback(
    (optionValue: OptionValue) => {
      let selectedValue: SelectValue = null

      if (tokenfield && !Array.isArray(value)) {
        selectedValue = [optionValue]
      } else if (tokenfield && Array.isArray(value)) {
        if (value.includes(optionValue)) {
          handleRemoveToken(optionValue)
        } else {
          selectedValue = [...value, optionValue]
        }
      } else {
        selectedValue = optionValue
      }

      if (selectedValue) {
        onChange(selectedValue, name)
      }

      setSearchValue('')

      if (!tokenfield) {
        setOpen(false)
      }
    },
    [value, handleRemoveToken, tokenfield, name, onChange]
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    if (!disabled) setOpen(true)
  }, [disabled])

  const dragList = useCallback(
    ({ clientY }) => {
      // От точки нажатия отнимается пройденное расстояние мыши и находится процент полученного результат от области скролла
      const mouseMovePercent = ((startScroll.prevPosY - clientY) * 100) / selectListWrap.current.clientHeight
      // Находится число скролла = процент перемещения мыши из общей высоты листа с Options
      const scrollTop = (selectList.current.clientHeight / 100) * mouseMovePercent
      selectListWrap.current.scrollTop = scrollTop + startScroll.prevScroll
    },
    [startScroll]
  )

  useEffect(() => {
    const { current } = selectList

    if (startScroll) {
      current?.addEventListener('mousemove', dragList)
    } else {
      current?.removeEventListener('mousemove', dragList)
    }
    return () => current?.removeEventListener('mousemove', dragList)
  }, [dragList, startScroll])

  const handleListMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (e.button === 0) {
      setStartScroll({ prevPosY: e.clientY, prevScroll: selectListWrap.current.scrollTop })
    }
  }, [])

  const breakScroll = useCallback(() => {
    setStartScroll(null)
  }, [])

  return (
    <>
      <div
        ref={selectInput}
        className={classnames(
          cn('SelectInput', {
            size,
            error: !!error,
            disabled,
            focus: isOpen,
            tokenfield: Array.isArray(value) && !!value.length && (tokenfieldIsRubber ? 'rubber' : 'fixed'),
          }),
          className
        )}
        style={style}
        onClick={handleOpen}
      >
        <div className={cn('ControlBlock', { combobox })}>
          {tokenfield &&
            Array.isArray(value) &&
            value.map((val, id) =>
              id < 2 || tokenfieldIsRubber
                ? parsedOptions
                    .filter(({ value: optionValue }) => optionValue === val)
                    .map((el) => (
                      <Text key={el.value} className={cn('Token')} size={size}>
                        <span className={cn('TokenText')}>{el.children}</span>
                        <ButtonBox className={cn('TokenIconCloseBlock')} onClick={() => handleRemoveToken(val)} data-select="token-close">
                          <Icon className={cn('TokenIconClose')} icon="close" />
                        </ButtonBox>
                      </Text>
                    ))
                : id === 2 && (
                    <Text key={val} color="body">
                      ...
                    </Text>
                  )
            )}

          {combobox && <Text as="input" value={searchValue} onChange={handleComboboxChange} disabled={disabled} className={cn('Combobox')} />}

          {tokenfield && !tokenfieldIsRubber && Array.isArray(value) && value.length >= 2 && (
            <div className={cn('CountSumTokenBlock')}>
              <Text className={cn('CountSumToken')}>{value.length}</Text>
            </div>
          )}

          {(combobox && searchValue) || (tokenfield && JSON.stringify(value) !== JSON.stringify(nullValue)) ? null : (
            <Text
              className={cn('SelectedValue', { combobox })}
              size={size}
              color={JSON.stringify(value) === JSON.stringify(nullValue) ? 'disabled' : 'body'}
            >
              {JSON.stringify(value) === JSON.stringify(nullValue) ? (
                <>
                  {iconProps}
                  {placeholder}
                </>
              ) : (
                parsedOptions
                  .filter(({ value: optionValue }) => optionValue && optionValue === value)
                  .map(({ value: optionValue, icon, children: child }) => (
                    <React.Fragment key={optionValue}>
                      {iconProps}
                      {!iconProps && icon && !combobox && <Icon className={cn('SelectedValueIcon')} icon={icon} />}
                      {child}
                    </React.Fragment>
                  ))
              )}
            </Text>
          )}
        </div>

        <div className={cn('SelectIconBlock')}>
          {((combobox && searchValue) || (tokenfield && !tokenfieldIsRubber && Array.isArray(value) && value.length >= 2)) && (
            <ButtonBox className={cn('SelectIconClear', { tokenfield: Array.isArray(value) && value.length >= 2 })} onClick={handleClear} data-select="clear">
              <Icon className={cn('SelectIcon')} icon="close" />
            </ButtonBox>
          )}
          {isOpen ? <Icon className={cn('SelectIcon')} icon="chevron-up" /> : <Icon className={cn('SelectIcon')} icon="chevron-down" />}
        </div>
      </div>

      <Popup
        open={isOpen}
        onClose={handleClose}
        anchorEl={selectInput.current}
        className={cn('SelectListContainer')}
        style={{ width: selectInput.current && selectInput.current.clientWidth }}
        modifiers={{
          preventOverflow: { priority: ['top', 'bottom'] },
          offset: { offset: '0, 8px' },
        }}
      >
        {listChildren}
        {!combobox && searchInput && (
          <TextInput
            className={cn('SearchInput')}
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Поиск..."
            icon="search"
            iconPosition="right"
          />
        )}
        <div ref={selectListWrap} className={cn('SelectListWrapper', { loading: isLoading })}>
          {isLoading ? (
            <BlockContentLoader isLoading size="small" />
          ) : (
            <ul ref={selectList} className={cn('SelectList')} onMouseDown={handleListMouseDown} onMouseUp={breakScroll} onMouseLeave={breakScroll}>
              <Context.Provider
                value={{
                  selectValue: value,
                  handleChange,
                  searchValue,
                  tokenfield,
                }}
              >
                {children}
              </Context.Provider>
            </ul>
          )}
        </div>
      </Popup>
    </>
  )
}

Select.defaultProps = {
  className: null,
  placeholder: 'Выберите значение...',
  nullValue: null,
  value: null,
}
