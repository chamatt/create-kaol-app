import { TextLink } from 'solito/link'
import {
  AuthenticatedOnly,
  UnauthenticatedOnly,
  useAuth,
} from 'app/provider/AuthProvider'
import { Button } from 'app/components/Button'
import { Text, View } from 'universal'
import { routes } from 'app/navigation/routePaths'
import { tw } from 'universal/tailwind'
import { EnvironmentStatusBar } from 'app/components/EnvironmentStatusBar'

export function HomeScreen() {
  const { user, logout } = useAuth()

  return (
    <View className="flex-1">
      <EnvironmentStatusBar />

      <View className="flex-1 justify-center items-center p-4">
        <Text className="font-extrabold text-3xl text-center items-center">
          Welcome to Kaol. {user?.email}
        </Text>

        <View className="max-w-base my-8">
          <Text className="text-center mb-4">
            Here is a basic starter to show you how you can navigate from one
            screen to another. This screen uses the same code on Next.js and
            React Native.
          </Text>
          <Text className="text-center " tw="">
            Kaol is made by{' '}
            <TextLink href="https://github.com/chamatt">@chamatt</TextLink>.
          </Text>
        </View>

        <View className="h-8" />

        <UnauthenticatedOnly>
          <TextLink
            href={routes.login.getPath()}
            textProps={{
              style: tw`text-base font-bold text-blue-700 mb-2`,
            }}
          >
            Login
          </TextLink>
        </UnauthenticatedOnly>
        <AuthenticatedOnly>
          <>
            <TextLink
              href={routes.postList.getPath()}
              textProps={{
                style: tw`text-base font-bold text-blue-700 mb-6`,
              }}
            >
              Go to blog posts
            </TextLink>
            <Button
              onPress={async () => {
                try {
                  logout()
                } catch (err) {}
              }}
            >
              Logout
            </Button>
          </>
        </AuthenticatedOnly>
      </View>
    </View>
  )
}
