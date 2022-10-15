import { authRouter } from './routers/auth'
import { postRouter } from './routers/post'
import { t } from './trpc'

export const appRouter = t.router({
  auth: authRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
