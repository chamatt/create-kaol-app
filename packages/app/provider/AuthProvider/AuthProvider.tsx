import React, { createContext, useContext, useEffect } from 'react'
import { AuthInterface } from './types'
import {
  useDecodedToken,
  useGetMe,
  useLogout,
  useSessionToken,
  useSignIn,
  useSignUp,
} from './hooks'

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({
  children,
  initialToken: initialToken = '',
}: {
  children: JSX.Element
  initialToken?: string
}) => {
  const [sessionToken, setSessionToken] = useSessionToken(initialToken)
  const decodedToken = useDecodedToken(sessionToken)

  const { data: user } = useGetMe(sessionToken)
  const {
    mutate: signIn,
    isLoading: signInLoading,
    error: signInError,
  } = useSignIn(setSessionToken)
  const {
    mutate: signUp,
    isLoading: signUpLoading,
    error: signUpError,
  } = useSignUp(setSessionToken)
  const logout = useLogout(setSessionToken)

  const errorMessage = signUpError?.message || signInError?.message

  return (
    <AuthContext.Provider
      value={{
        decodedToken,
        user: (decodedToken && user) ?? null,
        isAuthenticated: !!decodedToken,
        logout,
        signIn,
        signInLoading,
        signUp,
        signUpLoading,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('Remember to wrap useAuth inside an AuthProvider')
  }
  return authContext
}

export const AuthenticatedOnly = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : null
}

export const UnauthenticatedOnly = ({
  children,
}: {
  children: JSX.Element
}) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : null
}
