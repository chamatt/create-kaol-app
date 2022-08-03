import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from 'app/features/auth/login-screen'
import { PostDetailScreen } from 'app/features/post/details-screen'
import PostListScreen from '../../../../apps/next/pages/posts'

import { HomeScreen } from '../../features/home/home-screen'

export const NavigationPaths = {
  initialRouteName: 'home' as const,
  screens: {
    home: '',
    'post-detail': '/posts/:id',
    'post-list': '/posts',
    login: '/auth/login',
  },
}

const Stack = createNativeStackNavigator<{
  home: undefined
  'post-detail': {
    id: string
  }
  'post-list': undefined
  login: undefined
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
        name="post-list"
        component={PostListScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name="post-detail"
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  )
}
