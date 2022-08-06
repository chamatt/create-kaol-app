import { NavigationContainer } from '@react-navigation/native'
import { INITIAL_ROUTE } from 'app/navigation/native'
import { NavigationPaths } from 'app/navigation/routePaths'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

const screens = Object.entries(NavigationPaths).reduce(
  (acc, [name, { route }]) => {
    acc[name] = route
    return acc
  },
  {} as {
    [K in keyof typeof NavigationPaths]: typeof NavigationPaths[keyof typeof NavigationPaths]['route']
  }
)

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const linking = useMemo(
    () => ({
      prefixes: [Linking.createURL('/')],
      config: {
        screens,
        initialRouteName: INITIAL_ROUTE,
      },
    }),
    []
  )

  return <NavigationContainer linking={linking}>{children}</NavigationContainer>
}
