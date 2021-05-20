/**
 * @description Статус пользователя
 * @property pending - только созданный аккаунт
 * @property active - подтвержденный аккаунт
 * @property blocked - заблокированный аккаунт
 */
export enum StatusEnum {
  pending = 'pending',
  active = 'active',
  blocked = 'blocked',
}
