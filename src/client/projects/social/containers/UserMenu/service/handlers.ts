import lodash from 'lodash'
import { CreateHandlers } from '@client/public/models/serviceHandler.model'
import { UseUserMenuState } from './ServiceUserMenu'


export const userMenuActions = {
  SEARCH__CHAT: (payload: { value: string }) => ({
    type: 'SEARCH__CHAT',
    payload
  }),
  DEFAULT: state => state
}
export type UserMenuActions = typeof userMenuActions
export type UserMEnuActionsKeys = keyof UserMenuActions


export type HandlersType = CreateHandlers<UserMEnuActionsKeys, UseUserMenuState, UserMenuActions>
export const handlers: HandlersType = {
  SEARCH__CHAT: (state, { value }) => ({
    ...state,
    search: value
  }),
  DEFAULT: s => s
}
