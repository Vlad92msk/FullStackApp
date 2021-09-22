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


export const ROUTES_COSMO = {
  core: {
    page: '',
    title: 'Портфолио',
    allowRoles: [],
  },
  cosmo: {
    page: 'cosmo',
    title: 'Космо',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {
      pageName1: {
        page: 'pageName1',
        title: 'Космо',
        allowRoles: [RoleEnum.visitor]
      },
      pageName2: {
        page: 'pageName2',
        title: 'Космо',
        allowRoles: [RoleEnum.visitor]
      },
      pageName3: {
        page: 'pageName3',
        title: 'Космо',
        allowRoles: [RoleEnum.visitor],
        subRoutes: {
          pageName1: {
            page: 'pageName1',
            title: 'Космо',
            allowRoles: [RoleEnum.visitor]
          },
          pageName2: {
            page: 'pageName2',
            title: 'Космо',
            allowRoles: [RoleEnum.visitor]
          },
          pageName3: {
            page: 'pageName3',
            title: 'Космо',
            allowRoles: [RoleEnum.visitor]
          }
        }
      }
    }
  }
}

