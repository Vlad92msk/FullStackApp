import { createContext } from 'react';

export interface MenuContext {
  onCloseMenu: () => void;
}

export const Context = createContext<MenuContext>({
  onCloseMenu: null,
});
