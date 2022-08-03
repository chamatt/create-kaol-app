import signup from 'api/src/services/signup'
import { prisma } from './client'

export const createUsers = async () => {
  const example = await signup({
    email: 'example@kaol.com',
    password: 'example',
  })

  const admin = await signup({
    email: 'admin@kaol.com',
    password: 'admin',
  })

  return {
    example,
    admin,
  }
}
