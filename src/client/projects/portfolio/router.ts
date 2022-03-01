import { RouteParam } from '@client_public/models/route'
import { createProjectRoutesData, currentProjectRoutesObject } from '@client_shared/utils/createProjectRoutesData'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export enum PortfolioPages {
  PORTFOLIO = 'portfolio',
}

/**
 * Роуты проекта
 */
export type ProjectStructureRoutes = Record<PortfolioPages.PORTFOLIO, RouteParam>

export const PROJECT_ROUTES: ProjectStructureRoutes = {
  [PortfolioPages.PORTFOLIO]: {
    page: 'portfolio',
    title: 'Портфолио',
    allowRoles: [RoleEnum.visitor],
  }
}

export const routesArray = createProjectRoutesData<ProjectStructureRoutes>(PROJECT_ROUTES)
export const routesObject = currentProjectRoutesObject<PortfolioPages>(routesArray)
