import { createPosts } from './createPosts'
import { createUsers } from './createUsers'

const seed = async () => {
  const users = await createUsers()
  await createPosts([users.example, users.admin])
}

seed()
