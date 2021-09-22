// import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}


export interface DefaultObject<T = string, K = string> {
  [key: string]: T;
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

