import { UserStatus } from '@client/projects/social/containers_v2/UserMenu/components/Friend/Friend'

export const USER: UserType = {
  id: 1,
  description: 'dwedwed dwedwed dwedwed dwedwed dwedwed dwedwe ddwedwed dwedwe ddwedweddw edwed dwed dwedwedwe dewedewdf jved jdgewiougd kehodigwef lewihofidwe weihfiwe weihfiwe fwelihfwe fweoifoiwehf wedwed',
  img: 'ava',
  hashName: 'firsovv',
  name: 'Vlad',
  family: 'Firsov',
  status: UserStatus.ONLINE,
  friends: [3, 4, 7],
  baseInformation: {
    city: 'Москва',
    country: 'Россия',
    dateOfBirth: '02.07.1992',
    gender: 'm',
    placeOfStudy: 'МГПУ',
    placeOfWork: 'ООО "42"',
    languageProficiency: 'ru'
  },
  professionalInformation: {
    profession: 'frontend-developer',
    experience: '2 года'
  }
}


export type BaseInformation = {
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: string
  placeOfStudy?: string
  placeOfWork?: string
  languageProficiency?: string
}

export type ProfessionalInformation = {
  profession?: string
  experience?: string
}

export type UserType = {
  id?: number
  description?: string
  img?: string
  hashName?: string
  name?: string
  family?: string
  status?: UserStatus
  friends?: number[]
  baseInformation?: BaseInformation
  professionalInformation?: ProfessionalInformation
}
