import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from 'app/features/auth/login-screen'
import { RegisterScreen } from 'app/features/auth/register-screen'
import { PostDetailScreen } from 'app/features/post/details-screen'
import { PostListScreen } from 'app/features/post/list-screen'

import { HomeScreen } from '../../features/home/home-screen'
import { routes, RouteTypes } from '../routePaths'

const Stack =
  createNativeStackNavigator<
    Pick<RouteTypes, 'home' | 'login' | 'postDetail' | 'postList' | 'signUp'>
  >()

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.home.name}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={routes.postList.name}
        component={PostListScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name={routes.postDetail.name}
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name={routes.login.name}
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name={routes.signUp.name}
        component={RegisterScreen}
        options={{
          title: 'Signup',
        }}
      />
    </Stack.Navigator>
  )
}
