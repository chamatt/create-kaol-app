import { trpc } from 'app/utils/trpc'
import tw, { styled } from '../../utils/tw'
import { Text, View, H1, P, A, useSx } from 'dripsy'
import { useAuth } from 'app/provider/auth/AuthProvider'
import { Button } from 'react-native'
import { TextLink } from 'solito/link'

const Card = styled(View, 'bg-white shadow-sm mb-4 rounded-lg p-6 border')

export function LoginScreen() {
  const signupMutation = trpc.useMutation('auth.signup')
  const { logout, signIn } = useAuth()

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Button
        title="Login"
        onPress={async () => {
          signIn('example@gmail.com', 'password')
        }}
      ></Button>
      <Button
        title="Signup"
        onPress={async () => {
          try {
            const { token } = await signupMutation.mutateAsync({
              email: 'example@gmail.com',
              password: 'password',
            })
            authenticate(token)
          } catch (err) {}
        }}
      ></Button>
      <Button
        title="Logout"
        onPress={async () => {
          try {
            logout()
          } catch (err) {}
        }}
      ></Button>

      <TextLink href="/">👈 Go Home</TextLink>
      {/* <Card>
        <Text>{JSON.stringify(user)}</Text>
      </Card>
      <Card>
        <Text>{JSON.stringify(loginMutation.data)}</Text>
      </Card>
      <Card>
        <Text>{JSON.stringify(signupMutation)}</Text>
      </Card> */}
    </View>
  )
}
