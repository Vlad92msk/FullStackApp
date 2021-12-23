/**
 * Получение
 * @param key
 */
export function storageGet<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }
}

/**
 * Установка
 * @param key
 * @param data
 */

export const storageSet = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Удаление
 * @param key
 */
export const storageRemove = (key: string): void => {
  localStorage.removeItem(key);
};
