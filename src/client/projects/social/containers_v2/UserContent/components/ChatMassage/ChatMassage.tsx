import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import styles from './ChatMassage.module.scss'

const cn = makeCn('ChatMassage', styles)

export enum MASSAGE_FROM {
  ME = 'me',
  OTHER = 'other'
}

export type ChatMassageType = {
  from: MASSAGE_FROM
  massage: string
}

export const ChatMassage: React.FC<ChatMassageType> = React.memo((props) => {
  const { from, massage } = props

  return (
    <div className={cn({ from })}>
      <Text className={cn('Text')} size={'2'} children={massage}/>
      <div className={cn('SystemInfo')}>
        <Text size={'1'} children={'01.02.2022'}/>
        <Text size={'1'} children={'Прочитано'}/>
        <Text size={'1'} children={'лайк'}/>
      </div>
    </div>
  )
})
