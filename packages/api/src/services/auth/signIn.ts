import bcrypt from 'bcrypt'
import { prismaClient } from 'db'
import { z } from 'zod'
import { createSession } from '../../utils/auth'

export const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z.string({ required_error: 'Password is required' }),
})

type SignInSchemaType = z.infer<typeof SignInSchema>

const signIn = async ({ email, password }: SignInSchemaType) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) throw new Error('Invalid credentials')

  const doPasswordsMatch = await bcrypt.compare(password, user.hashedPassword)
  if (!doPasswordsMatch) throw new Error('Invalid credentials')

  const token = await createSession(user)

  return { token }
}

export default signIn
