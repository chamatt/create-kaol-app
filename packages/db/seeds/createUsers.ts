import signUp from 'api/src/services/auth/signUp'

export const createUsers = async () => {
  const example = await signUp({
    email: 'example@kaol.com',
    password: '123456789',
  })

  const admin = await signUp({
    email: 'admin@kaol.com',
    password: '123456789',
  })

  return {
    example,
    admin,
  }
}
