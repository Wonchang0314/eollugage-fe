'use client'

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'

function makeQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
}

function getQueryClient() {
  let browserQueryClient: QueryClient | undefined
  if (isServer) return makeQueryClient()

  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
      <DevTools />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
