import { MainStack } from './main-stack'
import { RouteNames } from '../routePaths'

export const INITIAL_ROUTE = RouteNames.home

export const NativeNavigation = () => {
  return <MainStack />
}
