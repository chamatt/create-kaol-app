import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { trpc } from 'app/utils/trpc'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export default function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:4000/api/trpc',
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <NativeNavigation />
        </Provider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
