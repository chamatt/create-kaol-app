import { MapKeysToConstants, NavigationPathShape } from './types'

// Define the params of EVERY route in the app
export type NavigationTypes = {
  home: undefined
  postDetail: { id: string }
  postList: undefined
  login: undefined
  signUp: undefined
}
// Define the mapping between screen and URL
// PS: The getPath params are fully typed
export const NavigationPaths: NavigationPathShape = {
  home: {
    route: '',
    getPath: () => '/',
  },
  postDetail: {
    route: '/posts/:id',
    getPath: ({ id }) => `/posts/${id}`,
  },
  postList: {
    route: '/posts',
    getPath: () => '/posts',
  },
  login: {
    route: '/auth/login',
    getPath: () => '/auth/login',
  },
  signUp: {
    route: '/auth/signup',
    getPath: () => '/auth/signup',
  },
}

export const RouteNames = Object.keys(NavigationPaths).reduce(
  (acc, key) => ({
    ...acc,
    [key]: key,
  }),
  {} as MapKeysToConstants<typeof NavigationPaths>
)
