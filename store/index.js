import { setUserInformation, unsetUserInformation } from '~/utils/auth'

export const state = () => ({
  user: null,
  loading: false,
  error: null,
  success: null
})

export const getters = {
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  },
  success (state) {
    return state.success
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
  },
  setSuccess (state, payload) {
    state.success = payload
  },
  clearSuccess (state) {
    state.success = null
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
      .then(() => {
        commit('setLoading', false)
        commit('setSuccess', ['Further actions have been sent to the email you specified.'])
        this.$router.push('/')
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
      .then(res => {
        commit('setLoading', false)
        const newUser = {
          username: payload.username,
          token: res.data.key
        }
        commit('setUser', newUser)
        setUserInformation({
          token: res.data.key,
          username: payload.username
        })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  signUserOut ({commit}) {
    commit('setLoading', true)
    commit('clearError')

    let url = '/api' + process.env.SIGN_OUT_PATH
    this.$axios.post(url)
      .then(() => {
        commit('setLoading', false)
        commit('setUser', null)
        unsetUserInformation()
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
        commit('setSuccess', ['Email verified. You can log in.'])
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
        commit('setSuccess', ['Further actions have been sent to the email you specified.'])
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
        commit('setSuccess', ['New password was set.'])
        this.$router.push('/')
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
  },
  clearError ({commit}) {
    commit('clearError')
  },
  clearSuccess ({commit}) {
    commit('clearSuccess')
  },
  restoreUser ({commit}, payload) {
    const newUser = {
      username: payload.username,
      token: payload.key
    }
    commit('setUser', newUser)
  }
}
