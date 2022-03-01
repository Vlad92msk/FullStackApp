import { DefaultObject } from '@client_public/models/defaultObject.model'

/**
 * @description - Массив объектов переводит в объект с клюем по элементу
 */
export const toObjectData = <T extends DefaultObject<any> = DefaultObject>(arr: T[], key = 'id'): DefaultObject<T> => (
  (arr || []).reduce((acc: DefaultObject<T>, item: T) => {
    acc[item[key] as string] = item;
    return acc;
  }, {})
);

/**
 * @description - Переводит массив в объект группируя по ключу
 */
export const groupBy = <T extends DefaultObject<any> = DefaultObject>(arr: T[], key: keyof T): DefaultObject<T[]> => (
  (arr || []).reduce((acc: DefaultObject<T[]>, item: T) => {
    const currentKey = item[key] as string;
    if (acc[currentKey]) {
      acc[currentKey] = [...acc[currentKey], item];
    } else {
      acc[currentKey] = [item];
    }
    return acc;
  }, {})
);
