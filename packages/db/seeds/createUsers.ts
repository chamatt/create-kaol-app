import signUp from 'api/src/services/auth/signUp'

export const createUsers = async () => {
  const example = await signUp({
    email: 'example@kaol.com',
    password: 'example',
  })

  const admin = await signUp({
    email: 'admin@kaol.com',
    password: 'admin',
  })

  return {
    example,
    admin,
  }
}
