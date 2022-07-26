import { prisma } from './client'

export const createUsers = async () => {
  const example = await prisma.user.create({
    data: {
      name: 'Example User',
    },
  })

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
    },
  })

  return {
    example,
    admin,
  }
}
