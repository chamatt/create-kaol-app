import Cookies from 'js-cookie'
import { Storage } from './types'
console.log('LOADED WEB APP')

const WebStorage: Storage = {
  get: async (key: string) => {
    return Cookies.get(key)
  },

  set: async (key: string, value: string) => {
    Cookies.set(key, value)
  },

  remove: async (key: string) => {
    Cookies.remove(key)
  },
}

export default WebStorage
