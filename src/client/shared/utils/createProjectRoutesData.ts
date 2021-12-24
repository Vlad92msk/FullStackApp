import { values } from 'lodash'
import { ProjectNormalizeObject, RouteParam, RouteParamWithoutSubRoutes } from '~public/models/route'
import { toObjectData } from '@shared/utils/toObjectData'

/**
 * Рекурсивно достает инф. из суб-роутов если они есть
 */
const takeSubRoutes = (obj: RouteParam[]): RouteParamWithoutSubRoutes[] => (obj || []).reduce((acc, route) => {
  const nextRoute = Boolean(route?.subRoutes) ? takeSubRoutes(values(route.subRoutes)) : []
  const { page, title, allowRoles } = route
  const newRoute: RouteParamWithoutSubRoutes = { page, title, allowRoles }

  return nextRoute ? [...acc, newRoute, ...nextRoute] : [...acc, newRoute]
}, [])

/**
 * Плоский массив из страниц (роутов) текущего проекта
 */
export const createProjectRoutesData = <T>(obj: T) => takeSubRoutes(values(obj))
/**
 * Плоский Объект из страниц (роутов) текущего проекта
 */
export const currentProjectRoutesObject = (arr: RouteParamWithoutSubRoutes[]) => toObjectData(arr, 'page') as ProjectNormalizeObject
