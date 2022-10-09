import { AppRouter } from 'api/src'
import { createTRPCReact } from '@trpc/react'

export const trpc = createTRPCReact<AppRouter>()
export * from 'api/src/inferance-helpers'
