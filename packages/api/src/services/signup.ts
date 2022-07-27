import * as trpc from '@trpc/server'
import bcrypt from 'bcrypt'
import { TRPCError } from '@trpc/server'
import { prisma, prismaClient } from 'db'
import { z } from 'zod'

export const SignupSchema = z.object({
  email: z.string().email({
    message: 'Email is not valid',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})

type SignupSchemaType = z.infer<typeof SignupSchema>

const signup = async ({ email, password }: SignupSchemaType) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingEmail = await prismaClient.user.findUnique({
    where: {
      email,
    },
  })
  if (existingEmail) {
    throw new TRPCError({
      message: 'The email is already in use',
      code: 'BAD_REQUEST',
    })
  }

  const user = await prismaClient.user.create({
    data: {
      email,
      hashedPassword,
    },
  })

  return user
}

export default signup
