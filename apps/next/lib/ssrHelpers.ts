import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'
import clientCookies from 'js-cookie'

export const getSessionAuth = ({
  req,
  res,
}: {
  req: IncomingMessage | undefined
  res: ServerResponse | undefined
}) => {
  let sessionToken
  if (req && res) {
    const cookies = new Cookies(req, res)
    sessionToken = cookies.get('sessionToken')
  } else {
    sessionToken = clientCookies.get('sessionToken')
  }
  if (!sessionToken)
    return {
      headers: undefined,
      sessionToken: undefined,
    }
  return {
    headers: {
      authorization: sessionToken ? `Bearer ${sessionToken}` : undefined,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    sessionToken,
  }
}
