import { HomeScreen } from 'app/features/home/home-screen'
import { Stack } from 'expo-router'

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <HomeScreen />
    </>
  )
}
