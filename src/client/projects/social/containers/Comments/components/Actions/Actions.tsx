import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import styles from './Actions.module.scss'
import { IconName } from '@client/public/models/icon.model'
import { MainInfoType } from '@client/projects/social/containers/Comments/components'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { IconButton } from '@client/shared/components/IconButton'

const cn = makeCn('Actions', styles)


export type ActionsType = {
  type: MainInfoType
  onOpenAnswer?: React.Dispatch<React.SetStateAction<string>>
  likeCount: number
  disLikeCounts: number
  answersCount: number
  id: string
}

export const Actions: React.FC<ActionsType> = (props) => {
  const { onOpenAnswer, id, disLikeCounts, likeCount, answersCount, type } = props
  const [toggle, setToggle] = useState(true)

  const handleOpenAnswer = useCallback(() => {
    if (toggle) {
      onOpenAnswer?.(id)
      setToggle(false)
    } else {
      onOpenAnswer?.(null)
      setToggle(true)
    }
  }, [id, toggle])

  const handleAddAnswer = useCallback(() => {
    console.log('Ответить')
  }, [])

  const handleOpenAnswers = useCallback(() => {
    console.log('Открыть модалку с ответами')
  }, [])

  return (
    <div className={cn()}>
      {type === 'sub' ? (
        <IconButton
          className={cn('Button')}
          size={'small'}
          icon={'message-square'}
          fill={'bluePrimrose50'}
          onClick={handleAddAnswer}
        />
      ) : (<div />)}
      <div style={{ display: 'flex' }}>
        <ButtonBox className={cn('Button')} onClick={type === 'main' ? handleOpenAnswer : handleOpenAnswers}>
          <Icon
            className={cn('ButtonIcon')}
            size={'small'}
            icon={'undo'}
            fill={'bluePrimrose50'}
          />
          <Text
            className={cn('ButtonText')}
            size={'1'}
            children={answersCount || 0}
          />
        </ButtonBox>
        <ButtonBox className={cn('Button')}>
          <Icon
            className={cn('ButtonIcon')}
            size={'small'}
            icon={'heart'}
            fill={'redRose40'}
          />
          <Text className={cn('ButtonText')} size={'1'} children={likeCount || 0} />
        </ButtonBox>
        <ButtonBox className={cn('Button')}>
          <Icon
            className={cn('ButtonIcon')}
            size={'small'}
            icon={'dislike'}
            fill={'bluePrimrose50'}
          />
          <Text className={cn('ButtonText')} size={'1'} children={disLikeCounts || 0} />
        </ButtonBox>
      </div>
    </div>
  )
}
