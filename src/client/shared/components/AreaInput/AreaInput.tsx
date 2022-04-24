import React, { useCallback, useEffect, useRef, useState } from 'react'
import { classnames } from '@bem-react/classnames'
import { Picker } from 'emoji-mart'

import { makeCn } from '@client_shared/utils'
import { Text, TextSize } from '@client_shared/components/Text'
import { IconButton } from '@client_shared/components/IconButton'
import { Popup } from '@client_shared/components/Popup'
import styles from './AreaInput.module.scss'


const cn = makeCn('AreaInput', styles)


export interface AreaInputProps {
  className?: string
  style?: React.CSSProperties
  size?: TextSize
  maxWidth?: string
  name?: string
  value?: string
  placeholder?: string
  error?: any
  disabled?: boolean
  onChange?: (value: string, name?: string) => void
  withSmiles?: boolean
  isCompleted: boolean
}


export const AreaInput: React.FunctionComponent<AreaInputProps> = React.memo((props) => {
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
    maxWidth,
    withSmiles,
    isCompleted
  } = props

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const smilesRef = useRef<HTMLDivElement>(null)

  const [isOpenSmiles, setOpenSmiles] = useState(false)
  const [newRecord, setNewRecord] = useState<string>(value)


  const handleChange = useCallback(({ target: { value: newValue } }) => {
    setNewRecord(newValue)
  }, [])

  useEffect(() => {
    onChange(newRecord, name)
  }, [name, onChange, newRecord])

  /**
   * Добавить смайлик в текст
   */
  const handleAddEmoji = useCallback((emoji) => {
    setNewRecord(prev => {
      /**
       * Позиция курсора в инпуте
       */
      const cursorPosition = textAreaRef?.current?.selectionStart

      const start = prev.substring(0, cursorPosition)
      const end = prev.substring(cursorPosition, prev.length)
      return start + emoji.native + end
    })
  }, [textAreaRef])

  useEffect(() => {
    if (isCompleted) setNewRecord('')
  }, [isCompleted])

  return (
    <>
      <div className={classnames(cn(), className)} style={style}>
        <Text
          as='textarea'
          anchorEl={textAreaRef}
          size={size}
          className={cn('Input')}
          style={{
            maxWidth
          }}
          value={newRecord}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {withSmiles && (
        <div className={cn('Smile')} ref={smilesRef}>
          <IconButton
            icon={'smile'}
            size={'small'}
            fill={'oldAsphalt50'}
            onClick={() => setOpenSmiles(prev => !prev)}
          />
        </div>
      )}
      <Popup
        anchorEl={smilesRef.current}
        open={isOpenSmiles}
        onClose={() => setOpenSmiles(false)}
      >
        <Picker
          set='apple'
          showPreview={false}
          showSkinTones={false}
          onClick={handleAddEmoji}
        />
      </Popup>
    </>
  )
}, (a, b) => a.isCompleted === b.isCompleted)


AreaInput.defaultProps = {
  className: null,
  placeholder: 'Введите значение...'
}
