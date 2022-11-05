import 'raf/polyfill'

const fixReanimatedIssue = () => {
  // FIXME remove this once this reanimated fix gets released
  // https://github.com/software-mansion/react-native-reanimated/issues/3355
  if (process.browser) {
    // @ts-ignore
    window._frameTimestamp = null
  }
}

fixReanimatedIssue()


import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import { withTRPC } from '@trpc/next'
import type { AppRouter } from 'api/src/index'
import { getSessionAuth } from '../lib/ssrHelpers'
import { AppContext } from 'next/app'
import { AppProps } from 'next/app'

interface MyAppProps extends AppProps {
  pageProps: {
    sessionToken: string
  }
}

function MyApp({
  Component,
  pageProps: { sessionToken, ...pageProps },
}: MyAppProps) {
  return (
    <>
      <Head>
        <title>Kaol Starter</title>
        <meta
          name="description"
          content="Expo + Next.js with Kaol. By @chamatt."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider sessionTokenServer={sessionToken}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const { req, res } = ctx || {}
  const { sessionToken } = getSessionAuth({ req, res })
  return {
    pageProps: {
      sessionToken: sessionToken,
    },
  }
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.browser) return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 4000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,

      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: async () => {
        const { req, res } = ctx || {}
        const { headers } = getSessionAuth({ req, res })
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
            ...headers,
          }
        }
        return {
          ...headers,
        }
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp)
