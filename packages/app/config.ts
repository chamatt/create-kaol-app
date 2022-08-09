import Constants from 'expo-constants'
import { channel, releaseChannel } from 'expo-updates'

export const allowedChannels = <const>[
  'development',
  'preview',
  'staging',
  'production',
]
export type UpdateChannel = typeof allowedChannels[number]

interface IConfig {
  apiUrl: string
}

const localhost = Constants.manifest?.debuggerHost?.split(':').shift()

const enviromentConfigs: { [key in UpdateChannel]: IConfig } = {
  development: {
    apiUrl: `http://${localhost}:4000/api/trpc`,
  },
  preview: {
    apiUrl: `http://${localhost}:4000/api/trpc`,
  },
  staging: {
    apiUrl: 'https://staging-kaol.vercel.app/api/trpc',
  },
  production: {
    apiUrl: 'https://kaol.vercel.app/api/trpc',
  },
}

export const getCurrentChannel = (): UpdateChannel => {
  console.info('CURRENT CHANNEL: ', channel)

  const inAllowedChannels = (selectedChannel: string) =>
    (allowedChannels as ReadonlyArray<string>).includes(selectedChannel)

  if (releaseChannel !== 'default') {
    if (inAllowedChannels(releaseChannel)) {
      return releaseChannel as UpdateChannel
    } else return 'development'
  }

  if (channel) {
    if (inAllowedChannels(channel)) {
      return channel as UpdateChannel
    } else return 'development'
  }

  return 'development' as UpdateChannel
}

const Config = enviromentConfigs[getCurrentChannel()]

export default Config
