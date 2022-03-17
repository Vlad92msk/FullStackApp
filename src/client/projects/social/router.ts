import { RouteParam } from '@client_public/models/route'
import { createProjectRoutesData, currentProjectRoutesObject } from '@client_shared/utils/createProjectRoutesData'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export enum SocialPages {
  SOCIAL = 'social',
}

/**
 * Роуты проекта
 */
export type ProjectStructureRoutes = Record<SocialPages.SOCIAL, RouteParam>

export const PROJECT_ROUTES: ProjectStructureRoutes = {
  [SocialPages.SOCIAL]: {
    page: 'social',
    title: 'Соц.сеть',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  }
}

export const routesArray = createProjectRoutesData<ProjectStructureRoutes>(PROJECT_ROUTES)
export const routesObject = currentProjectRoutesObject<SocialPages>(routesArray)
