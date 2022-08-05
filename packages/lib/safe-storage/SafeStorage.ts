import { Storage } from './types'
import * as SecureStore from 'expo-secure-store'

const MobileStore: Storage = {
  get: async (key: string) => {
    return await SecureStore.getItemAsync(key)
  },
  set: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value)
  },
  remove: async (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

export default MobileStore
