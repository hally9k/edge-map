import React, { useContext } from 'react'
import { AuthContext } from 'state/auth-context'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

export const Auth: React.FC<{}> = ({ children }) => {
  const [token, setToken] = useContext(AuthContext)
  const location = useLocation()
  const history = useHistory()

  if (token) {
    return <>{children}</>
  }

  const query = queryString.parse(location.hash)

  if (query.access_token) {
    setToken(query.access_token as string)
    history.push('/map')
  } else if (!token) {
    window.location.replace(
      'https://edge-tracking.auth.ap-southeast-2.amazoncognito.com/login?client_id=5hesu4pq2g2vespfb7ilf7bupt&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000'
    )
  }

  return null
}
