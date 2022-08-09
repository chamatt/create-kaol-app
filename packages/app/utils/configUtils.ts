import * as Updates from 'expo-updates'
import { allowedChannels, UpdateChannel } from '../config'

export const getCurrentChannel = (): UpdateChannel => {
  console.info('CURRENT CHANNEL: ', Updates.channel)
  const { channel, releaseChannel } = Updates

  const currentChannel = channel || releaseChannel

  const inAllowedChannels = (selectedChannel: string) =>
    (allowedChannels as ReadonlyArray<string>).includes(selectedChannel)

  if (channel || releaseChannel !== 'default') {
    if (inAllowedChannels(currentChannel)) return channel as UpdateChannel
    throw new Error(
      `Channel '${channel}' is not in the list of allowed channels, please check 'packages/app/config.ts' and defined your channels properly`
    )
  }
  console.warn("No channel specified. Defaulting to 'development'")
  return 'development' as UpdateChannel
}
