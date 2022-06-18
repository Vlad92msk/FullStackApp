import { RouteParam } from '@client_public/models/route'
import { createProjectRoutesData, currentProjectRoutesObject } from '@client_shared/utils/createProjectRoutesData'

export enum RoleEnum {
  admin = 'admin',
  visitor = 'visitor',
  participant = 'participant',
}

export enum SocialPages {
  SOCIAL = 'social',
  LOGIN = 'login',
  SOCIAL_PHOTO = 'photo',
  SOCIAL_VIDEO = 'video',
  SOCIAL_PROFILE = 'profile',
  SOCIAL_GROUPS = 'groups',
  SOCIAL_MUSIC = 'music',
}

/**
 * Роуты проекта
 */
export type ProjectStructureRoutes = Record<SocialPages, RouteParam>

export const PROJECT_ROUTES: ProjectStructureRoutes = {
  [SocialPages.SOCIAL]: {
    page: 'social',
    title: 'Соц.сеть',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.SOCIAL_PHOTO]: {
    page: 'photo',
    title: 'Фото',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.SOCIAL_VIDEO]: {
    page: 'video',
    title: 'Видео',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.SOCIAL_PROFILE]: {
    page: 'profile',
    title: 'Профиль',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.SOCIAL_GROUPS]: {
    page: 'groups',
    title: 'Группы',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.SOCIAL_MUSIC]: {
    page: 'music',
    title: 'Музыка',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
  [SocialPages.LOGIN]: {
    page: 'login',
    title: 'Войти/Зарегистрироваться',
    allowRoles: [RoleEnum.visitor],
    subRoutes: {

    }
  },
}

export const routesArray = createProjectRoutesData<ProjectStructureRoutes>(PROJECT_ROUTES)
export const routesObject = currentProjectRoutesObject<SocialPages>(routesArray)
