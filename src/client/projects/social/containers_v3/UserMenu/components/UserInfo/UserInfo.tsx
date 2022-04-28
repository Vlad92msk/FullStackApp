import React from 'react'

import { makeCn } from '@client/shared/utils'
import { BaseInformation, ProfessionalInformation } from '../../../App/data/user'
import { Text } from '@client/shared/components/Text'
import styles from './UserInfo.module.scss'

const cn = makeCn('UserInfo', styles)


const baseInformationEN = {
  city: 'city',
  country: 'country',
  dateOfBirth: 'date of birth',
  gender: 'gender',
  placeOfStudy: 'place of study',
  placeOfWork: 'place of work',
  languageProficiency: 'language proficiency'
}
const baseInformationRU = {
  city: 'Город',
  country: 'Страна',
  dateOfBirth: 'Дата рождения',
  gender: 'Пол',
  placeOfStudy: 'Место учебы',
  placeOfWork: 'Место работы',
  languageProficiency: 'Языки'
}

type UserInfoType = {
  baseInformation?: BaseInformation
  professionalInformation?: ProfessionalInformation
}
export const UserInfo: React.FC<UserInfoType> = (props) => {
  const { baseInformation, professionalInformation } = props
  const base = Object.entries(baseInformation)
  const prof = Object.entries(professionalInformation)

  return (
    <div className={cn()}>
      <div className={cn('BaseInfo')}>
        <Text className={cn('TitleMain')} textTransform={'uppercase'} size={'1'} children={'Общая инф.'} />
        {base.map((item) => (
          <div key={item[0]} className={cn('Row')}>
            <Text className={cn('Title')} size={'3'} children={baseInformationRU[item[0]]} />
            <Text className={cn('Volume')} size={'3'} children={item[1]} />
          </div>
        ))}
      </div>
      <div className={cn('ProfessionalInfo')}>
        <Text className={cn('TitleMain')} textTransform={'uppercase'} size={'1'} children={'Профессиональная инф.'} />
        {prof.map((item) => (
          <div key={item[0]} className={cn('Row')}>
            <Text className={cn('Title')} size={'3'} children={item[0]} />
            <Text className={cn('Volume')} size={'3'} children={item[1]} />
          </div>
        ))}
      </div>
    </div>
  )
}
