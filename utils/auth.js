import Cookie from 'js-cookie'

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!tokenCookie) return
  const token = tokenCookie.split('=')[1]
  const usernameCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!usernameCookie) return
  const username = usernameCookie.split('=')[1]
  return {token: token, username: username}
}

export const setUserInformation = (payload) => {
  Cookie.set('username', payload.username)
  Cookie.set('token', payload.token)
}

export const unsetUserInformation = () => {
  Cookie.remove('username')
  Cookie.remove('token')
}
