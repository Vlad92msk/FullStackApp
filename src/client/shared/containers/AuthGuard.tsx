import React from 'react'
import { storageGet } from '@shared/utils'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { LocalStorageEnum } from '~public/models/localStorage'
import { RoleEnum } from '~client/projects/portfolio/router'
import { ROUTES_ALL, routesAll } from '~client/projects/routesAll'

export type AuthGuardType = {
  roles?: RoleEnum[]
  page?: keyof typeof ROUTES_ALL
  defaultErrorComponent?: boolean
}
export const AuthGuard: React.FC<AuthGuardType> = ({ roles, page, defaultErrorComponent, children }) => {
  const user: User = storageGet(LocalStorageEnum.USER)
  const pageName = ROUTES_ALL[page]

  /**
   * Если ни роли, ни страница не указаны - пропустить [или]
   * Если пользователь попал на страницу 404 [или]
   * Если указана страница, и в списке доступных ролей есть "Посетитель" - пропустить [или]
   * Если в ролях пользователя указана роль для страницы - пропустить [или]
   * Если Роли указаны и есть в профиле - пропустить
   */
  if ((!roles && !page) ||
    (page === 'ERROR_404') ||
    (page && routesAll[pageName].allowRoles.includes(RoleEnum.visitor)) ||
    (page && user && user.uRoles.some((role: RoleEnum) => routesAll[pageName].allowRoles.includes(role))) ||
    (roles && user && user.uRoles.some((role: RoleEnum) => roles.includes(role)))
  ) return <>{children}</>


  return defaultErrorComponent ? <div>Недостаточно прав</div> : null
}

AuthGuard.defaultProps = {
  defaultErrorComponent: true
}
