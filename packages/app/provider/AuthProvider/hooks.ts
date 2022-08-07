import SafeStorage from 'lib/safe-storage'
import { trpc } from 'app/utils/trpc'
import jwtDecode from 'jwt-decode'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'solito/router'
import { AuthInterface } from './types'
import { routes } from 'app/navigation/routePaths'

export const useDecodedToken = (sessionToken?: string) => {
  const decodedToken = useMemo(() => {
    if (sessionToken) {
      return jwtDecode(sessionToken) as AuthInterface['decodedToken']
    }
  }, [sessionToken])
  return decodedToken
}

export const useSessionToken = (initialToken = '') => {
  const [sessionToken, setSessionToken] = useState<string>(initialToken)
  useEffect(() => {
    ;(async () => {
      const storedToken = await SafeStorage.get('sessionToken')
      if (storedToken && storedToken !== sessionToken) {
        setSessionToken(storedToken)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [sessionToken, setSessionToken] as [string, (token: string) => void]
}

const useAuthenticate = (setSessionToken: (token: string) => void) => {
  const router = useRouter()
  const authenticate = useCallback(
    async (token: string) => {
      await SafeStorage.set('sessionToken', token)
      setSessionToken(token)
      router.push(routes.home.getPath())
    },
    [setSessionToken, router]
  )
  return authenticate
}

export const useSignIn = (setSessionToken: (token: string) => void) => {
  const authenticate = useAuthenticate(setSessionToken)
  const loginMutation = trpc.useMutation('auth.signIn', {
    onSuccess: (data) => {
      authenticate(data.token)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  return loginMutation
}

export const useSignUp = (setSessionToken: (token: string) => void) => {
  const authenticate = useAuthenticate(setSessionToken)
  const signupMutation = trpc.useMutation('auth.signUp', {
    onSuccess: (data) => {
      authenticate(data.token)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  return signupMutation
}

export const useGetMe = (sessionToken: string) => {
  return trpc.useQuery(['auth.me'], {
    enabled: !!sessionToken,
    retry: false,
  })
}

export const useLogout = (setSessionToken: (token: string) => void) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = useCallback(async () => {
    await SafeStorage.remove('sessionToken')
    setSessionToken('')
    queryClient.resetQueries(['auth.me'])
    router.push(routes.home.getPath())
  }, [setSessionToken, queryClient, router])
  return logout
}
