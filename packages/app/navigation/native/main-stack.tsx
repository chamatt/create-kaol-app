import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from 'app/features/auth/login-screen'
import { RegisterScreen } from 'app/features/auth/register-screen'
import { PostDetailScreen } from 'app/features/post/details-screen'
import { PostListScreen } from 'app/features/post/list-screen'

import { HomeScreen } from '../../features/home/home-screen'
import { NavigationTypes, RouteNames } from '../routePaths'

const Stack =
  createNativeStackNavigator<
    Pick<
      NavigationTypes,
      'home' | 'login' | 'postDetail' | 'postList' | 'signUp'
    >
  >()

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.home}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={RouteNames.postList}
        component={PostListScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name={RouteNames.postDetail}
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
      <Stack.Screen
        name={RouteNames.login}
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name={RouteNames.signUp}
        component={RegisterScreen}
        options={{
          title: 'Signup',
        }}
      />
    </Stack.Navigator>
  )
}
