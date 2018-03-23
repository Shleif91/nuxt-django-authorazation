import * as firebase from 'firebase'

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
    let useFirebase = false
    commit('setLoading', true)
    commit('clearError')
    if (useFirebase) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
    } else {
      let url = '/api' + process.env.SIGN_UP_PATH
      this.$axios.post(url, {
        username: payload.username,
        email: payload.email,
        password1: payload.password,
        password2: payload.confirmPassword
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
    }
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
    firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
