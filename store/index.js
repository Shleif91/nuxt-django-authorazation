import * as firebase from 'firebase'

export const state = () => ({
  user: null,
  loading: false,
  error: null,
  totalPages: 1,
  orders: [
    // {id: 1, title: 'Яблоки срочно', cityFrom: 'Минск', cityWhere: 'Москва', cargo: 'Яблоки'},
    // {id: 2, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
    // {id: 3, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
    // {id: 4, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
    // {id: 5, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'}
  ]
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
        console.log(error)
      })
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
        console.log(error)
      })
  }
}
