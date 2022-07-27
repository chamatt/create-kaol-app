import { trpc } from 'app/utils/trpc'
import tw, { styled } from '../../utils/tw'
import { Text, View, H1, P, A, useSx } from 'dripsy'
import { useAuth } from 'app/provider/auth'
import { Button } from 'react-native'

const Card = styled(View, 'bg-white shadow-sm mb-4 rounded-lg p-6 border')

export function LoginScreen() {
  const loginMutation = trpc.useMutation('auth.login')
  const signupMutation = trpc.useMutation('auth.signup')
  //   const { user } = useAuth()
  //   console.log(user)
  const { authenticate } = useAuth()

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Button
        title="Login"
        onPress={async () => {
          try {
            const { token } = await loginMutation.mutateAsync({
              email: 'example@gmail.com',
              password: 'password',
            })
            console.log(token)
            authenticate(token)
          } catch (err) {}
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
