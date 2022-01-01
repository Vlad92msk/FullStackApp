import { DefaultObject } from '~public/models/defaultObject.model'

/**
 * Создает строку для вывода сообщения
 * @param myEnum
 * @param text
 */
export const enumMessage = (myEnum: DefaultObject, text = 'Значение может быть'): string => (
  `${text}: ${Object.values(myEnum).join(', ')}.`
)
