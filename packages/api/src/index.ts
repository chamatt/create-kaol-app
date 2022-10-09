import { createRouter } from './routers/context'
import { authRouter } from './routers/auth'
import { postRouter } from './routers/post'

const legacyRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('post.', postRouter)
  .interop()

export const appRouter = legacyRouter

export type AppRouter = typeof appRouter
