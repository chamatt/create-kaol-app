import { useAuth } from 'app/provider/AuthProvider'
import { TextLink } from 'solito/link'
import { Button } from 'app/components/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/router'
import { Text, View } from 'universal'
import { colors, styled, tw } from 'universal/tailwind'
import { ScrollView, TextInput } from 'react-native'
import { routes } from 'app/navigation/routePaths'

const Card = styled(View, 'bg-white shadow-sm mb-4 p-6 border max-w-lg w-full')
const Input = styled(TextInput, 'bg-white shadow-sm border py-2 px-2')

export function LoginScreen() {
  const router = useRouter()
  const { isAuthenticated, signIn, signInLoading, errorMessage } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(routes.home.getPath())
    }
  }, [router, isAuthenticated])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center p-4">
        <Card>
          <Text className="text-center text-2xl font-bold mb-4">Login</Text>
          <Input
            placeholder="Email"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            style={tw`bg-white shadow-sm border py-2 px-2`}
            onChangeText={setEmail}
          ></Input>
          <View tw="mb-2" />
          <Input
            placeholder="Password"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            secureTextEntry
            style={tw`bg-white shadow-sm border py-2 px-2`}
            onChangeText={setPassword}
          ></Input>

          {errorMessage && (
            <Text className="text-red-600 my-2 text-center">
              {errorMessage}
            </Text>
          )}

          <View className="flex items-center mt-4">
            <Button
              className="w-32 text-center"
              textStyle={tw`text-center flex justify-center items-center`}
              disabled={signInLoading}
              isLoading={signInLoading}
              onPress={() => {
                signIn({ email, password })
              }}
            >
              Login
            </Button>
          </View>

          <View tw="mt-4 items-center">
            <TextLink
              href={routes.signUp.getPath()}
              textProps={{
                style: tw`text-blue-800 text-base`,
              }}
            >
              Don&apos;t have an account? Sign up here.
            </TextLink>
          </View>
        </Card>
      </View>

      {process.env.NODE_ENV === 'development' && (
        <View className="p-4 items-center">
          <Text>Use a seeded account or create one</Text>

          <View className="flex mt-2 text-center">
            <Text className="text-center">example@kaol.com / 123456789</Text>
            <Text className="text-center">admin@kaol.com / 123456789</Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
