import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'

type TokenStateTuple = [string | null, Dispatch<SetStateAction<string | null>>]

const AuthContext = React.createContext<TokenStateTuple>(['', () => {}])

export const LOCAL_STORAGE_TOKEN_KEY = 'edge-tracking:token'

const AuthContextProvider: React.FC<{}> = ({ children }) => {
  const [localStorageChecked, setLocalStorageChecked] = useState(false)

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (localStorageChecked) {
      if (token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      }
    }
  }, [token, localStorageChecked])

  useEffect(() => {
    const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    if (localStorageToken) {
      setToken(localStorageToken)
    }

    setLocalStorageChecked(true)
  }, [])

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {localStorageChecked && children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
