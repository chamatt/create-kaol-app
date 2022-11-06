import { LoginScreen } from 'app/features/auth/login-screen'
import { Stack } from 'expo-router'

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <LoginScreen />
    </>
  )
}
