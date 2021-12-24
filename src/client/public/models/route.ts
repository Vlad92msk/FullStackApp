import { CosmoPages } from '~client/modules/cosmo/router'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

/**
 * Содержимое Роута
 */
export type RouteParam = {
  readonly page: string
  readonly title: string
  readonly allowRoles: RoleEnum[]
  readonly subRoutes?: Record<RouteParam['page'], RouteParam>
};
/**
 * Наследование от содержимое роута, но без поля "subRoutes"
 */
export type RouteParamWithoutSubRoutes = Omit<RouteParam, "subRoutes">;
/**
 * Структура проекта ввиде объекта
 * Каждое свойтсво - отдельная папка Page
 */
export type ProjectNormalizeObject = Record<CosmoPages, RouteParamWithoutSubRoutes>
