import { AppRouter } from 'api/src'
import { createTRPCReact } from '@trpc/react'

export const trpc = createTRPCReact<AppRouter>()
// TODO: delete this?
// export * from 'api/src/inferance-helpers'
