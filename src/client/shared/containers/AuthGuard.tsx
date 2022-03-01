import React from 'react'

import { storageGet } from '@client_shared/utils'
import { LocalStorageEnum } from '@client_public/models/localStorage'
import { RoleEnum } from '@client_projects/portfolio/router'
import { ROUTES_ALL, routesAll } from '@client_projects/routesAll'
import { User } from '@client/projects/gql-generated-hooks'


export type AuthGuardType = {
  roles?: RoleEnum[]
  page?: keyof typeof ROUTES_ALL
}
export const AuthGuard: React.FC<AuthGuardType> = ({ roles, page, children }) => {
  /**
   * Если пользователь попал на 404 страницу - пропустить
   * Если не указано имя страницы и роли доступа к ней - пропустить
   */
  if (page === 'ERROR_404' || !Boolean(roles && page)) return <>{children}</>


  const pageName = ROUTES_ALL[page]
  const allowPageRoles = routesAll[pageName].allowRoles

  /**
   * Если имя страницы указано (значит она есть в списке Роутов)
   * и в списке роутов для данной страницы указано "Посетитель" - пропустить
   */
  if (page && allowPageRoles.includes(RoleEnum.visitor)) return <>{children}</>



  const user: User = storageGet(LocalStorageEnum.USER)
  /**
   * Если нет пользователя (не авторизован) - дальше проверять бессмысленно
   */
  if (!Boolean(user)) return <div>Недостаточно прав</div>
  /**
   * Если имя страницы указано/не указано - не важно,
   * Но указаны роли
   * То берется инф о пользователе из Куков
   * Если у пользователя есть права указанные в ролях - пропустить
   */
  if (roles && user.uRoles.some((role: RoleEnum) => roles.includes(role))) return <>{children}</>
  /**
   * Если Указано имя страницы
   * Но не указаны роли
   * То берется инф о пользователе из Куков
   * Берется список доступных ролей из списка Роутов
   * Если у пользователя есть права указанные в ролях - пропустить
   */
  if ((page && !roles) && user.uRoles.some((role: RoleEnum) => allowPageRoles.includes(role))) return <>{children}</>

  /**
   * TODO: Потом как нибудь стилизовать
   */
  return <div>Недостаточно прав</div>
}
