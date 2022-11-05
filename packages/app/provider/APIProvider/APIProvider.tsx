import { trpc } from 'app/utils/trpc'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SafeStorage from 'lib/safe-storage'
import Config from 'app/config'
import { httpBatchLink } from '@trpc/client'

const createTrpcClient = () => {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: Config.apiUrl,
        async headers() {
          const sessionToken = SafeStorage.get('sessionToken')
          return {
            authorization: sessionToken ? `Bearer ${sessionToken}` : undefined,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        },
      }),
    ],
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
