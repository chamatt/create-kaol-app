import { AuthProvider } from './auth'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({
  children,
  sessionTokenServer,
}: {
  children: React.ReactNode
  sessionTokenServer?: string
}) {
  return (
    <AuthProvider sessionTokenServer={sessionTokenServer}>
      <NavigationProvider>
        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </AuthProvider>
  )
}
