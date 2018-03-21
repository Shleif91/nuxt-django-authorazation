import * as firebase from 'firebase'

export const state = () => ({
  user: null
})

export const getters = {
  user (state) {
    return state.user
  },
  orders (state) {
    return [
      // {id: 1, title: 'Яблоки срочно', cityFrom: 'Минск', cityWhere: 'Москва', cargo: 'Яблоки'},
      // {id: 2, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
      // {id: 3, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
      // {id: 4, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'},
      // {id: 5, title: 'Окна срочно', cityFrom: 'Москва', cityWhere: 'Минск', cargo: 'Окна'}
    ]
  },
  totalPages () {
    return 5
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  signUserUp ({commit}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        console.log(error)
      })
  },
  signUserIn ({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
