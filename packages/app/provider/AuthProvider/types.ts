import { AppRouter } from 'api/src'
import { inferProcedureInput } from '@trpc/server'

export interface AuthInterface {
  isAuthenticated: boolean
  decodedToken?: {
    email: string
    exp: number
    iat: number
    userId: string
  }
  user: inferProcedureInput<AppRouter['auth']['me']>
  signIn: inferProcedureInput<AppRouter['auth']['signIn']>
  signUp: inferProcedureInput<AppRouter['auth']['signUp']>
  signInLoading: boolean
  signUpLoading: boolean
  logout: () => void
  errorMessage?: string
}
