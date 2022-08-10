import { getCurrentChannel } from 'app/config'
import { Platform } from 'react-native'
import { Text, View } from 'universal'

export const EnvironmentStatusBar = () => {
  if (Platform.OS !== 'web') {
    return (
      <View tw="bg-orange-200 text-center">
        <Text tw="text-gray-600 text-center">
          Channel: {getCurrentChannel?.()}
        </Text>
      </View>
    )
  }
  return null
}
