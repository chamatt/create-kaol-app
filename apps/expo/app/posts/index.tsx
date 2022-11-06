import { PostListScreen } from 'app/features/post/list-screen'
import { Stack } from 'expo-router'

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Post List' }} />
      <PostListScreen />
    </>
  )
}
