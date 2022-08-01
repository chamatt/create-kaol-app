import { inferQueryOutput } from 'api/src/inferance-helpers'

export interface AuthInterface {
  logout: () => void
  user: inferQueryOutput<'auth.me'>
  isAuthenticated: boolean
  decodedToken?: {
    email: string
    exp: number
    iat: number
    userId: string
  }
  signIn: (email: string, password: string) => Promise<void>
  signInLoading: boolean
}
