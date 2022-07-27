import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import { withTRPC } from '@trpc/next'
import type { AppRouter } from 'api/src/index'
import 'raf/polyfill'
import { NextPage, NextPageContext } from 'next'
// import { GetI } from 'next'
import serverCookies from 'cookies'
import clientCookies from 'js-cookie'

export const getInitialProps = async (ctx) => {}

function MyApp({
  Component,
  pageProps: { sessionToken, ...pageProps },
}: SolitoAppProps) {
  console.log('pageProps', pageProps)
  console.log('server session', sessionToken)
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
      <Provider sessionTokenServer="">
        <Component {...pageProps} s />
      </Provider>
    </>
  )
}

MyApp.getInitialProps = async ({ req, res }: NextPageContext) => {
  // const { req } = ctx
  let sessionToken = ''
  const isServer = !!req
  console.log('é do server', isServer)
  if (isServer) {
    const cookies = new serverCookies(req, res)
    console.log('server cookies', cookies)
    sessionToken = cookies.get('sessionToken')
  } else {
    sessionToken = clientCookies.get('sessionToken')
  }
  console.log('header', clientCookies, req?.headers)

  console.log('getInitialProps sessionToken:', sessionToken)
  return {
    props: {
      sessionToken,
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

    // const sessionToken
    console.log('caralho')
    // console.log('nextjs pica', ctx?.req?.headers)
    const getSessionAuth = () => {
      let sessionToken = ''
      if (ctx?.req) {
        const cookies = new serverCookies(ctx.req, ctx.res)
        sessionToken = cookies.get('sessionToken')
      } else {
        sessionToken = clientCookies.get('sessionToken')
      }
      if (!sessionToken) return undefined
      return {
        authorization: sessionToken ? `bearer ${sessionToken}` : undefined,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }

    console.log('getSessionAuth', getSessionAuth())
    return {
      url,

      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
            ...getSessionAuth(),
          }
        }
        return {
          ...getSessionAuth(),
        }
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp)
