import { format } from 'date-fns'
import { ru as RU_LOCALE } from 'date-fns/locale'

export const dateType1 = (date: Date) => format(date, 'dd.MM.yyyy в HH:mm')
export const dateType2 = (date: Date) => format(date, 'MMMM dd, yyyy', { locale: RU_LOCALE })
