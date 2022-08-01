import { APIProvider } from './api/api'
import { AuthProvider } from './auth/AuthProvider'
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
    <APIProvider>
      <AuthProvider sessionTokenServer={sessionTokenServer}>
        <NavigationProvider>
          <Dripsy>{children}</Dripsy>
        </NavigationProvider>
      </AuthProvider>
    </APIProvider>
  )
}
