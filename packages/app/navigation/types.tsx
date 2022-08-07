import { RouteTypes } from './routePaths'

export type RouteShape = {
  [K in keyof RouteTypes]: {
    route: string
    getPath: RouteTypes[K] extends undefined
      ? () => string
      : (args: RouteTypes[K]) => string
  }
}

export type MapKeysToConstants<T> = {
  [K in keyof T]: K
}

export type AddKeyNameAsValueInObjectKeys<T> = {
  [K in keyof T]: T[K] & { name: K }
}
