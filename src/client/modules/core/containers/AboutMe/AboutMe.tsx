import React from 'react'
import { makeCn } from '@shared/utils'
import styles from './AboutMe.module.scss'
import { Title } from '@shared/components/Title'
import { FieldRow } from '@shared/components/FieldRow'
import { Text } from '@shared/components/Text'
import { Line } from '@shared/components/Line'


const cn = makeCn('AboutMe', styles)


export const AboutMe = () => {
  return (
    <FieldRow className={cn()} width={'100'} direction={'column'}>
      <Title className={cn('Title')} size={'1'}>
        Фирсов Влад
      </Title>
      <Text color={'title'}>тел: 4646-465-54</Text>
      <Line />
      <FieldRow className={cn('InfoBlock')} wrap={'wrap'} width={'100'}>
        <FieldRow className={cn('InfoRow')} width={'100'}>
          <FieldRow width={'50'}>
            <Text color={'body'}>Возраст</Text>
          </FieldRow>
          <FieldRow width={'50'}>
            <Text color={'body'}>28 лет</Text>
          </FieldRow>
        </FieldRow>
        <FieldRow className={cn('InfoRow')} width={'100'}>
          <FieldRow width={'50'}>
            <Text color={'body'}>Специальность</Text>
          </FieldRow>
          <FieldRow width={'50'}>
            <Text color={'body'}>Frontend-разработчик</Text>
          </FieldRow>
        </FieldRow>
        <FieldRow className={cn('InfoRow')} width={'100'}>
          <FieldRow width={'50'}>
            <Text color={'body'}>Стаж</Text>
          </FieldRow>
          <FieldRow width={'50'}>
            <Text color={'body'}>1 год</Text>
          </FieldRow>
        </FieldRow>
      </FieldRow>
    </FieldRow>
  )
}
