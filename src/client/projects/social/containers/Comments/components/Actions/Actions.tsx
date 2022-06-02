import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import styles from './Actions.module.scss'
import { IconName } from '@client/public/models/icon.model'
import { MainInfoType } from '@client/projects/social/containers/Comments/components'

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

    return (
      <div className={cn()}>
        <div className={cn('Button')} onClick={onOpenAnswer && handleOpenAnswer}>
          <Icon
            className={cn('ButtonIcon')}
            size={'small'}
            icon={type === 'main' ? 'message-square' : 'undo'}
            fill={'bluePrimrose50'}
          />
          <Text
            className={cn('ButtonText')}
            size={'1'}
            children={answersCount || 0}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div className={cn('Button')}>
            <Icon
              className={cn('ButtonIcon')}
              size={'small'}
              icon={'heart'}
              fill={'redRose40'}
            />
            <Text className={cn('ButtonText')} size={'1'} children={likeCount || 0} />
          </div>
          <div className={cn('Button')}>
            <Icon
              className={cn('ButtonIcon')}
              size={'small'}
              icon={'dislike'}
              fill={'bluePrimrose50'}
            />
            <Text className={cn('ButtonText')} size={'1'} children={disLikeCounts || 0} />
          </div>
        </div>
      </div>
    )
  }
