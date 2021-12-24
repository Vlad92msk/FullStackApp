import { RouteParam } from '~public/models/route'
import { createProjectRoutesData, currentProjectRoutesObject } from '@shared/utils/createProjectRoutesData'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export enum CosmoPages {
  COSMO = 'cosmo',
  ARTICLES = 'articles',
  PAGE_NAME_1 = 'pageName1',
  PAGE_NAME_2 = 'pageName2',
  PAGE_NAME_3 = 'pageName3',
  PAGE_NAME_3_1 = 'pageName31',
  PAGE_NAME_3_2 = 'pageName32',
  PAGE_NAME_3_3 = 'pageName33',
}

/**
 * Роуты проекта
 */
export type ProjectStructureRoutes = Record<CosmoPages.COSMO, RouteParam>

export const PROJECT_ROUTES: ProjectStructureRoutes = {
  [CosmoPages.COSMO]: {
    page: 'cosmo',
    title: 'Космо',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {
      /**
       * Статьи
       */
      [CosmoPages.ARTICLES]: {
        page: 'articles',
        title: 'Статьи',
        allowRoles: [RoleEnum.visitor]
      },
      /**
       * Раздел cosmo/2
       */
      [CosmoPages.PAGE_NAME_2]: {
        page: 'pageName2',
        title: 'Космо',
        allowRoles: [RoleEnum.visitor]
      },
      /**
       * Раздел cosmo/3
       */
      [CosmoPages.PAGE_NAME_3]: {
        page: 'pageName3',
        title: 'Космо',
        allowRoles: [RoleEnum.visitor],
        subRoutes: {
          /**
           * Раздел cosmo/3/1
           */
          [CosmoPages.PAGE_NAME_3_1]: {
            page: 'pageName3/1',
            title: 'Космо31',
            allowRoles: [RoleEnum.visitor]
          },
          /**
           * Раздел cosmo/3/2
           */
          [CosmoPages.PAGE_NAME_3_2]: {
            page: 'pageName3/2',
            title: 'Космо32',
            allowRoles: [RoleEnum.visitor]
          },
          /**
           * Раздел cosmo/3/3
           */
          [CosmoPages.PAGE_NAME_3_3]: {
            page: 'pageName3/3',
            title: 'Космо33',
            allowRoles: [RoleEnum.visitor],
          }
        }
      }
    }
  }
}

export const routesArray = createProjectRoutesData<ProjectStructureRoutes>(PROJECT_ROUTES)
export const routesObject = currentProjectRoutesObject(routesArray)
