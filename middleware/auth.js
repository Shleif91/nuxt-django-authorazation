export default function ({ store, redirect, route }) {
  if (route.path === '/signup' || route.path === '/signin') {
    return null
  }

  if (!store.getters.user) {
    return redirect('/signin')
  }
}
