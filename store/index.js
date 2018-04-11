export const state = () => ({
  user: null,
  loading: false,
  error: null
})

export const getters = {
  user (state) {
    return state.user
  },
  orders (state) {
    return state.orders
  },
  totalPages (state) {
    return state.totalPages
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}

export const actions = {
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.SIGN_UP_PATH
    this.$axios.post(url, {
      username: payload.username,
      email: payload.email,
      password1: payload.password,
      password2: payload.confirmPassword
    })
      .then(user => {
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.SIGN_IN_PATH
    this.$axios.post(url, {
      username: payload.username,
      password: payload.password
    })
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  clearError ({commit}) {
    commit('clearError')
  },
  signUserOut ({commit}) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.SIGN_OUT_PATH
    this.$axios.post(url)
      .then(() => {
        commit('setLoading', false)
        commit('setUser', null)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  verifyEmail ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.VERIFY_EMAIL_PATH
    this.$axios.post(url, {
      key: payload.key
    })
      .then(() => {
        commit('setLoading', false)
        this.$router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  restorePassword ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.RESTORE_PASSWORD_PATH
    this.$axios.post(url, {
      email: payload.email
    })
      .then(() => {
        commit('setLoading', false)
        this.$router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  restorePasswordConfirm ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.RESTORE_PASSWORD_CONFIRM_PATH
    this.$axios.post(url, {
      uid: payload.uid,
      token: payload.token,
      new_password1: payload.new_password1,
      new_password2: payload.new_password2
    })
      .then(() => {
        commit('setLoading', false)
        this.$router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  }
}
