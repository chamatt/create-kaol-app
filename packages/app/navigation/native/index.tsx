import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PostDetailScreen } from 'app/features/post/detail-screen'

import { HomeScreen } from '../../features/home/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'post-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="post-detail"
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
    </Stack.Navigator>
  )
}
