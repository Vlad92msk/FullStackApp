import { DefaultObject } from '~public/models/defaultObject.model'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

type RouteType = {
  page: string
  title: string
  allowRoles?: RoleEnum[]
  subRoutes?: DefaultObject<RouteType>
}


export const ROUTES_PORTFOLIO = {
  core: {
    page: '',
    title: 'Портфолио',
    allowRoles: [],
  },
  cosmo: {
    page: 'cosmo',
    title: 'Космо',
    allowRoles: [RoleEnum.visitor],
  }
}

