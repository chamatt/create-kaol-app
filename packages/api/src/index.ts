import { createRouter } from './context'
import { authRouter } from './routers/auth'
import { postRouter } from './routers/post'

export const appRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('post.', postRouter)

export type AppRouter = typeof appRouter
