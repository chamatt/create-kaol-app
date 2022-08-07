import { AddKeyNameAsValueInObjectKeys, RouteShape } from './types'

export const createRoutes = (routes: RouteShape) => {
  return Object.entries(routes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...value,
        name: key,
      },
    }),
    {} as AddKeyNameAsValueInObjectKeys<RouteShape>
  )
}
