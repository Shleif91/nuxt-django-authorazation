import * as firebase from 'firebase'

export const state = () => ({
  user: null
})

export const getters = {
  user (state) {
    return state.user
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
