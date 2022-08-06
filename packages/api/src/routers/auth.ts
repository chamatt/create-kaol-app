import { createSession } from '../utils/auth'
import { createRouter, protectedRoute } from './context'
import signIn, { SignInSchema } from '../services/auth/signIn'
import signUp, { SignUpSchema } from '../services/auth/signUp'

export const authRouter = createRouter()
  .mutation('signIn', {
    input: SignInSchema,
    resolve: async ({ input: { email, password } }) => {
      return signIn({ email, password })
    },
  })
  .mutation('signUp', {
    input: SignUpSchema,
    resolve: async ({ input: { email, password } }) => {
      const user = await signUp({ email, password })
      const token = await createSession(user)
      return { token }
    },
  })
  .merge(
    'me',
    protectedRoute.query('', {
      resolve: async ({ ctx }) => {
        return ctx.user
      },
    })
  )
