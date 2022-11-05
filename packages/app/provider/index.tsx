import { EnvironmentStatusBar } from 'app/components/EnvironmentStatusBar'
import { Text, View } from 'universal'
import { APIProvider } from './APIProvider'
import { AuthProvider } from './AuthProvider'
// This is the root provider for the app.
// Next.js location: apps/next/pages/_app.tsx
// Expo location: apps/expo/App.tsx

export function Provider({
  children,
  sessionTokenServer,
}: {
  children: JSX.Element
  sessionTokenServer?: string
}) {
  return (
    <>
      <APIProvider>
        <AuthProvider initialToken={sessionTokenServer}>
          {children}
        </AuthProvider>
      </APIProvider>
    </>
  )
}
