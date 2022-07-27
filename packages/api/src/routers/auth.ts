import * as trpc from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'

import { createSession } from '../utils/auth'
import { Context, createRouter, protectedRoute } from '../Context'
import signup, { SignupSchema } from '../services/signup'

export const authRouter = createRouter()
  .merge(
    'me',
    protectedRoute.query('', {
      resolve: async ({ ctx }) => {
        return ctx.user
      },
    })
  )
  .mutation('login', {
    input: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email is not valid' }),
      password: z.string({ required_error: 'Password is required' }),
    }),
    resolve: async ({ input: { email, password }, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })

      if (!user) throw new Error('Invalid credentials')

      const doPasswordsMatch = await bcrypt.compare(
        password,
        user.hashedPassword
      )
      if (!doPasswordsMatch) throw new Error('Invalid credentials')

      const token = await createSession(user)

      return { token }
    },
  })
  .mutation('signup', {
    input: SignupSchema,
    resolve: async ({ input: { email, password } }) => {
      const user = await signup({ email, password })
      const token = await createSession(user)
      return { token }
    },
  })
