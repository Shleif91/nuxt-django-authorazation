import { getUserFromCookie } from '~/utils/auth'

export default function ({ store, redirect, route, isServer, req }) {
  if (route.path === '/signup' || route.path === '/signin') return
  if (route.path.includes('/confirm-email/')) return
  if (route.path === '/restore-password') return
  if (route.path.includes('/reset/')) return

  if (!store.getters.user) {
    if (isServer && req) {
      const user = getUserFromCookie(req)
      if (user) {
        store.dispatch('restoreUser', user)
        return
      }
    }

    return redirect('/signin')
  }
}
