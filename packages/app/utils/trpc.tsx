import type { AppRouter } from 'api/src/routers'
import { createReactQueryHooks } from '@trpc/react'

export const trpc = createReactQueryHooks<AppRouter>()
export * from 'api/src/inferance-helpers'
