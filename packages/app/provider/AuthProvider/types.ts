import {
  inferMutationInput,
  inferMutationOutput,
  inferQueryOutput,
} from 'api/src/inferance-helpers'

export interface AuthInterface {
  isAuthenticated: boolean
  decodedToken?: {
    email: string
    exp: number
    iat: number
    userId: string
  }
  user: inferQueryOutput<'auth.me'>
  signIn: (input: inferMutationInput<'auth.signIn'>) => void
  signInLoading: boolean
  signUp: (input: inferMutationInput<'auth.signUp'>) => void
  signUpLoading: boolean
  logout: () => void
  errorMessage?: string
}
