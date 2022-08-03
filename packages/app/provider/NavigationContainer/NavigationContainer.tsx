import { NavigationContainer } from '@react-navigation/native'
import { NavigationPaths } from 'app/navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const linking = useMemo(
    () => ({
      prefixes: [Linking.createURL('/')],
      config: NavigationPaths,
    }),
    []
  )

  return <NavigationContainer linking={linking}>{children}</NavigationContainer>
}
