import { createContext, useContext, useState, useCallback } from 'react'
import { apiFetch, ENDPOINTS, setToken, clearToken, getToken } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken())
  const [user, setUser] = useState(null)

  const login = useCallback(async (email, password) => {
    const data = await apiFetch(ENDPOINTS.login, {
      method: 'POST',
      auth: false,
      body: { email, password },
    })
    // Token is nested at data.authResponse.token (confirmed from Swagger)
    const receivedToken = data?.authResponse?.token
    if (!receivedToken) throw new Error('Login failed — no token received from server.')
    setToken(receivedToken)
    setTokenState(receivedToken)
    if (data?.user) setUser(data.user)
    return data
  }, [])

  const register = useCallback(async (name, email, phoneNumber, password) => {
    const data = await apiFetch(ENDPOINTS.createAdmin, {
      method: 'POST',
      auth: false,
      body: { name, email, phoneNumber, password },
    })
    const receivedToken = data?.authResponse?.token
    if (receivedToken) {
      setToken(receivedToken)
      setTokenState(receivedToken)
    }
    if (data?.user) setUser(data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setTokenState(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
