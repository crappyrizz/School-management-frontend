const BASE_URL = 'https://sms-app-ktto.onrender.com'

export const ENDPOINTS = {
  login: '/api/v1/auth/login',
  createAdmin: '/api/v1/auth/create-admin',
  updateUser: '/api/v1/users/update',
}

const TOKEN_KEY = 'sms_token'

export function getToken() { 
    return localStorage.getItem(TOKEN_KEY)
 }
export function setToken(token) { 
    localStorage.setItem(TOKEN_KEY, token)
 }
export function clearToken() { 
    localStorage.removeItem(TOKEN_KEY)
 }

export async function apiFetch(path, options = {}) {
  const { method = 'GET', body, auth = true } = options

  const headers = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const token = getToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

