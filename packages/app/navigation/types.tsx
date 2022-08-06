import { NavigationTypes } from './routePaths'

export type NavigationPathShape = {
  [K in keyof NavigationTypes]: {
    route: string
    getPath: NavigationTypes[K] extends undefined
      ? () => string
      : (args: NavigationTypes[K]) => string
  }
}

export type MapKeysToConstants<T> = {
  [K in keyof T]: K
}
