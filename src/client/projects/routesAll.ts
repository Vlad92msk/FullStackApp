import { assign } from 'lodash'
import { CosmoPages, routesObject as cosmoRoutes } from './cosmo/router'
import { PortfolioPages, routesObject as portfolioRoutes } from './portfolio/router'

export const ROUTES_ALL = assign(CosmoPages, PortfolioPages)
export const routesAll = assign(portfolioRoutes, cosmoRoutes)
