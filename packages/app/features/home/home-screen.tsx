import { TextLink } from 'solito/link'
import {
  AuthenticatedOnly,
  UnauthenticatedOnly,
  useAuth,
} from 'app/provider/AuthProvider'
import { Button } from 'app/components/Button'
import { Text, View } from 'universal'
import { NavigationPaths } from 'app/navigation/native'
import { tw } from 'universal/tailwind'

export function HomeScreen() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="font-extrabold text-3xl">
        Welcome to Kaol. {user?.email}
      </Text>

      <View className="max-w-base my-8">
        <Text>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </Text>
        <Text className="text-center">
          Kaol is made by{' '}
          <TextLink href="https://github.com/chamatt">@chamatt</TextLink>.
        </Text>
      </View>
      <TextLink
        href={NavigationPaths.screens['post-list']}
        textProps={{
          style: tw`text-md font-bold text-blue-700 mb-2`,
        }}
      >
        Posts
      </TextLink>

      <View className="h-8" />

      <UnauthenticatedOnly>
        <TextLink
          href={NavigationPaths.screens.login}
          textProps={{
            style: tw`text-md font-bold text-blue-700 mb-2`,
          }}
        >
          Login
        </TextLink>
      </UnauthenticatedOnly>
      <AuthenticatedOnly>
        <Button
          onPress={async () => {
            try {
              logout()
            } catch (err) {}
          }}
        >
          Logout
        </Button>
      </AuthenticatedOnly>
    </View>
  )
}
