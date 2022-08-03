import { trpc } from 'app/utils/trpc'
import tw, { styled } from '../../design-system/tailwind'
// import { Text, View, H1, P, A, useSx } from 'dripsy'
import { useAuth } from 'app/provider/AuthProvider'
import { TextLink } from 'solito/link'
import { Button } from 'app/components/Button'
import { View } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'
import { Text } from 'app/design-system'

const Card = styled(
  View,
  'bg-white shadow-sm mb-4 rounded-lg p-6 border max-w-lg w-full'
)

export function LoginScreen() {
  const router = useRouter()
  const {
    isAuthenticated,
    signIn,
    signInLoading,
    signUp,
    signUpLoading,
    errorMessage,
  } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [router, isAuthenticated])

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Card>
        <Button
          disabled={signInLoading}
          onPress={() => {
            signIn({ email: 'example@gmail.com', password: 'password' })
          }}
        >
          Login
        </Button>
        <Button
          disabled={signUpLoading}
          onPress={() => {
            signUp({ email: 'example@gmail.com', password: 'password' })
          }}
        >
          Signup
        </Button>

        <Text tw="text-red-600">{errorMessage}</Text>

        <TextLink href="/">👈 Go Home</TextLink>
      </Card>
    </View>
  )
}
