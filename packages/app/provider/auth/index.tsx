import { inferQueryOutput } from 'api/src/inferance-helpers'
import { trpc } from 'app/utils/trpc'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'solito/router'
import sessionStorage from '../../utils/sessionStorage'

interface AuthInterface {
  logout: () => void
  authenticate: (token: string) => void
  user: inferQueryOutput<'auth.me'>
  isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({
  children,
  sessionTokenServer = '',
}: {
  children: JSX.Element
  sessionTokenServer?: string
}) => {
  const [sessionToken, setSessionToken] = useState<string>(sessionTokenServer)
  console.warn('sessionToken', sessionToken)
  const queryClient = useQueryClient()
  const {
    data: user,
    refetch,
    status,
  } = trpc.useQuery(['auth.me'], {
    enabled: !!sessionToken,
  })
  const router = useRouter()

  console.log({ status })
  //   On init check cookies and set token
  useEffect(() => {
    async function init() {
      const sessionTokenInTheCookies = await sessionStorage.get('sessionToken')

      console.log('init', sessionTokenInTheCookies)
      if (
        sessionTokenInTheCookies &&
        sessionTokenInTheCookies !== sessionToken
      ) {
        setSessionToken(sessionTokenInTheCookies)
      }
    }
    init()
  }, [])

  const logout = async () => {
    await sessionStorage.remove('sessionToken')
    setSessionToken('')
    queryClient.resetQueries(['auth/me/'])
  }

  const authenticate = async (token: string) => {
    await sessionStorage.set('sessionToken', token)
    setSessionToken(token)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        logout,
        authenticate,
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
  return isAuthenticated ? children : null
}

export const UnauthenticatedOnly = ({
  children,
}: {
  children: JSX.Element
}) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : null
}
