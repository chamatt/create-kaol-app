import { User } from 'db'
import { prisma } from './client'
import { faker } from '@faker-js/faker'

export const createPosts = (users: User[]) => {
  return Promise.all(
    users.map(async (user) => {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.lines(),
          authorId: user.id,
        },
      })
      return post
    })
  )
}
