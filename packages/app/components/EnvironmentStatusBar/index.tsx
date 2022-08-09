import { getCurrentChannel } from 'app/config'
import { Text, View } from 'universal'

export const EnvironmentStatusBar = () => {
  return (
    <View tw="bg-orange-200">
      <Text tw="text-gray-600 text-center">
        Channel: {getCurrentChannel?.()}
      </Text>
    </View>
  )
}
