import { trpc } from 'app/utils/trpc'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Constants from 'expo-constants'
import SafeStorage from 'lib/safe-storage'

const { manifest } = Constants
const localhost = `http://${manifest?.debuggerHost?.split(':').shift()}:4000`

const createTrpcClient = () => {
  return trpc.createClient({
    url: process.env.API_URL || `${localhost}/api/trpc`,
    async headers() {
      const sessionToken = await SafeStorage.get('sessionToken')

      console.warn('try', sessionToken)
      return {
        authorization: sessionToken ? `Bearer ${sessionToken}` : undefined,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    },
  })
}

// Provider
export const APIProvider = ({ children }: React.ComponentProps<any>) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => createTrpcClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
