/**
 * @property arr - Измененный массив
 * @property item - Удаленный первый элементы
 * @property items - Все удаленные эдементы
 */
export interface spliceReturn<T> {
  arr: T[];
  item?: T;
  items?: T[];
}

/**
 * @param {Array} arr - Изменяемый массив
 * @param {number} index - Индекс, по которому начинает изменять массив
 * @param {number} deleteCount - Количество удаляемых элементов начиная с индекса
 * @param {any} item - Элемент который будет добавлен в массив по индексу
 * @return {spliceReturn} - Объект, измененный массив и удаленные элементы
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 */
export const splice = <T = any> (arr: T[], index: number, deleteCount = 0, item?: T): spliceReturn<T> => {
  const newArr = Array.from(arr);
  const deleteItems = newArr.splice(index, deleteCount, item);
  return { arr: newArr.filter(Boolean), item: deleteItems[0], items: deleteItems };
};
