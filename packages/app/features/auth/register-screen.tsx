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

export function RegisterScreen() {
  const router = useRouter()
  const { isAuthenticated, signUp, signUpLoading, errorMessage } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.home.getPath())
    }
  }, [router, isAuthenticated])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center p-4">
        <Card>
          <Text className="text-center text-2xl font-bold mb-4">Signup</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            style={tw`bg-white shadow-sm border py-2 px-2`}
            onChangeText={setEmail}
          ></TextInput>
          <View tw="mb-2" />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            secureTextEntry
            style={tw`bg-white shadow-sm border py-2 px-2`}
            onChangeText={setPassword}
          ></TextInput>

          {errorMessage && (
            <Text className="text-red-600 my-2 text-center">
              {errorMessage}
            </Text>
          )}

          <View className="flex items-center mt-4">
            <Button
              className="w-32 text-center"
              textStyle={tw`text-center flex justify-center items-center`}
              disabled={signUpLoading}
              isLoading={signUpLoading}
              onPress={() => {
                signUp({ email, password })
              }}
            >
              Signup
            </Button>
          </View>

          <View tw="mt-4 items-center">
            <TextLink
              href={routes.login.getPath()}
              textProps={{
                style: tw`text-blue-800 text-base`,
              }}
            >
              Already have an account? Log in here.
            </TextLink>
          </View>

          <View tw="mb-4" />
        </Card>
      </View>
    </ScrollView>
  )
}
