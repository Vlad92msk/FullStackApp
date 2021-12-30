import React from 'react'
import { makeCn } from '@shared/utils'
import { FieldRow } from '@shared/components/FieldRow'
import { Text } from '@shared/components/Text'
import { Line } from '@shared/components/Line'
import styles from './AboutMe.module.scss'


const cn = makeCn('AboutMe', styles)


export const AboutMe: React.FC = () => {
  return (
    <FieldRow className={cn()} width={'100'} direction={'column'}>
      <Text size={'8'} color={'title'} children={'Фирсов Влад'} />
      <Text color={'title'} size={'5'} children={'тел: 4646-465-54'} />
      <Line />
      <FieldRow className={cn('InfoBlock')} wrap={'wrap'} width={'100'}>
        <FieldRow width={'100'}>
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'Возраст'} />
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'28 лет'} />
        </FieldRow>
        <FieldRow width={'100'}>
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'Специальность'}/>
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'Frontend-разработчик'} />
        </FieldRow>
        <FieldRow width={'100'}>
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'Стаж'}/>
          <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'1 год'}/>
        </FieldRow>
      </FieldRow>
    </FieldRow>
  )
}
