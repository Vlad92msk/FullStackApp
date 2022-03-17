import { assign } from 'lodash'
import { CosmoPages, routesObject as cosmoRoutes } from './cosmo/router'
import { PortfolioPages, routesObject as portfolioRoutes } from './portfolio/router'
import { SocialPages, routesObject as socialRoutes } from './social/router'

export enum ERROR_404_Pages {
  ERROR_404 = 'error_404',
}

export const ROUTES_ALL = assign(
  CosmoPages,
  PortfolioPages,
  ERROR_404_Pages,
  SocialPages
)
export const routesAll = assign(
  portfolioRoutes,
  cosmoRoutes,
  socialRoutes
)
