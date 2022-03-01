import React from 'react'

import { useFindInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { makeCn } from '@client_shared/utils'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { FieldRow } from '@client_shared/components/FieldRow'
import { Text } from '@client_shared/components/Text'
import { Line } from '@client_shared/components/Line'

import styles from './AboutMe.module.scss'
const cn = makeCn('AboutMe', styles)


export const AboutMe: React.FC = () => {
  const {
    data: {
      userInterfacePortfolioFindAll: userInterface
    } = {},
    loading,
    error
  } = useFindInterfaceQuery()

  return (
    <ResponseApi status={[loading]} errors={[error]}>
      {() => <FieldRow className={cn()} width={'100'} direction={'column'}>
        <Text size={'8'} color={'title'} children={'Фирсов Влад'} />
        <Text color={'title'} size={'5'} children={`${userInterface.telephone}: 3214-234-234`} />
        <Line />
        <FieldRow className={cn('InfoBlock')} wrap={'wrap'} width={'100'}>
          <FieldRow width={'100'}>
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={userInterface.age} />
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'28 лет'} />
          </FieldRow>
          <FieldRow width={'100'}>
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={userInterface.speciality} />
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'Frontend-разработчик'} />
          </FieldRow>
          <FieldRow width={'100'}>
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={userInterface.experience} />
            <Text className={cn('InfoItem')} color={'body'} size={'4'} children={'1 год'} />
          </FieldRow>
        </FieldRow>
      </FieldRow>}
    </ResponseApi>
  )
}
