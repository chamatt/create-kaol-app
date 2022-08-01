import { trpc } from 'app/utils/trpc'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'solito/router'
import sessionStorage from '../../utils/sessionStorage'
import { AuthInterface } from './types'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Platform } from 'react-native'

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({
  children,
  sessionTokenServer = '',
}: {
  children: JSX.Element
  sessionTokenServer?: string
}) => {
  const [sessionToken, setSessionToken] = useState<string>(sessionTokenServer)
  const queryClient = useQueryClient()
  const decodedToken = useMemo(() => {
    if (sessionToken) {
      return jwtDecode(sessionToken) as AuthInterface['decodedToken']
    }
  }, [sessionToken])

  const { data: user } = trpc.useQuery(['auth.me'], {
    enabled: !!sessionToken,
    retry: false,
  })
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const sessionTokenInTheCookies = await sessionStorage.get('sessionToken')
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
    queryClient.resetQueries(['auth.me'])
    router.push('/')
  }

  const authenticate = async (token: string) => {
    await sessionStorage.set('sessionToken', token)
    setSessionToken(token)
    router.push('/')
  }

  const loginMutation = trpc.useMutation('auth.login')
  const signIn = async (email: string, password: string) => {
    const { token } = await loginMutation.mutateAsync({
      email,
      password,
    })
    authenticate(token)
  }

  return (
    <AuthContext.Provider
      value={{
        decodedToken,
        user: (decodedToken && user) ?? null,
        isAuthenticated: !!decodedToken,
        logout,
        signIn,
        signInLoading: loginMutation.isLoading,
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
