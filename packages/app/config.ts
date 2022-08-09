import Constants from 'expo-constants'
import { getCurrentChannel } from './utils/configUtils'

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
    apiUrl: 'https://kaol.vercel.app/api/trpc/',
  },
}

const Config = enviromentConfigs[getCurrentChannel()]

export default Config
