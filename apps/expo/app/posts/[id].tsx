import { PostDetailScreen } from 'app/features/post/details-screen'
import { Stack } from 'expo-router'

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Post Details' }} />
      <PostDetailScreen />
    </>
  )
}
