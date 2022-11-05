import { createSession } from '../utils/auth'
import { protectedProcedure } from './context'
import signIn, { SignInSchema } from '../services/auth/signIn'
import signUp, { SignUpSchema } from '../services/auth/signUp'

import { t } from '.././trpc'

export const authRouter = t.router({
  signIn: t.procedure.input(SignInSchema).mutation((req) => {
    const { input } = req

    return signIn({ email: input.email, password: input.password })
  }),
  signUp: t.procedure.input(SignUpSchema).mutation(async (req) => {
    const input = req.input

    const user = await signUp({ email: input.email, password: input.password })
    const token = await createSession(user)
    return { token }
  }),
  me: protectedProcedure.query(async (req) => {
    const { ctx } = req
    return ctx.user
  }),
})
