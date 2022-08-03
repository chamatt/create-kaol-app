import { H1, P, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { useAuth } from 'app/provider/AuthProvider'
import { Button } from 'app/components/Button'
import { View } from 'universal'
import { NavigationPaths } from 'app/navigation/native'
import { tw } from 'universal/tailwind'

export function HomeScreen() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <View tw="flex-1 justify-center items-center p-4">
      {!isAuthenticated && (
        <TextLink
          href={NavigationPaths.screens.login}
          textProps={{
            style: tw`text-md font-bold text-blue-700 mb-2`,
          }}
        >
          Login
        </TextLink>
      )}
      <H1 style={tw`font-extrabold text-3xl`}>
        Welcome to Kaol. {user?.email}
      </H1>

      <View sx={{ maxWidth: 600 }}>
        <P>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P sx={{ textAlign: 'center' }}>
          Kaol is made by{' '}
          <A
            href="https://github.com/chamatt"
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            @chamatt
          </A>
          .
        </P>
      </View>
      <TextLink
        href={NavigationPaths.screens['post-list']}
        textProps={{
          style: tw`text-md font-bold text-blue-700 mb-2`,
        }}
      >
        Posts
      </TextLink>

      <View sx={{ height: 32 }} />
      {!isAuthenticated && (
        <TextLink
          href={NavigationPaths.screens.login}
          textProps={{
            style: tw`text-md font-bold text-blue-700 mb-2`,
          }}
        >
          Login
        </TextLink>
      )}
      {isAuthenticated && (
        <Button
          onPress={async () => {
            try {
              logout()
            } catch (err) {}
          }}
        >
          Logout
        </Button>
      )}
    </View>
  )
}
