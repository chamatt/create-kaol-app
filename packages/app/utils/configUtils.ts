import * as Updates from 'expo-updates'
import { allowedChannels, UpdateChannel } from '../config'

export const getCurrentChannel = (): UpdateChannel => {
  console.info('CURRENT CHANNEL: ', Updates.channel)
  const { channel } = Updates
  const inAllowedChannels =
    channel && (allowedChannels as ReadonlyArray<string>).includes(channel)

  if (inAllowedChannels) return channel as UpdateChannel
  return 'development' as UpdateChannel
}
