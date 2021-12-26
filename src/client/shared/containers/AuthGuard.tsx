import React from 'react'
import { storageGet } from '@shared/utils'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { LocalStorageEnum } from '~public/models/localStorage'
import { RoleEnum, PROJECT_ROUTES } from '~client/projects/portfolio/router'

export type AuthGuardType = {
  roles?: RoleEnum[]
  page?: keyof typeof PROJECT_ROUTES
  defaultErrorComponent?: boolean
}
export const AuthGuard: React.FC<AuthGuardType> = ({ roles, page, defaultErrorComponent, children }) => {
  const user: User = storageGet(LocalStorageEnum.USER)

  /**
   * Если ни роли, ни страница не указаны - пропустить [или]
   * Если указана страница, но в ее ролях пустой массив - пропустить [или]
   * Если в ролях пользователя указана роль для страницы - пропустить [или]
   * Если Роли указаны и есть в профиле - пропустить
   */
  if ((!roles && !page) ||
    (page && !PROJECT_ROUTES[page].allowRoles.length) ||
    (page && user && user.uRoles.some((role: RoleEnum) => PROJECT_ROUTES[page].allowRoles.includes(role))) ||
    (roles && user && user.uRoles.some((role: RoleEnum) => roles.includes(role)))
  ) return <>{children}</>


  return defaultErrorComponent ? <div>Недостаточно прав</div> : null
}
