export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      commit('setUser', req.user)
    }
  }
}

export const getters = {
  userPhoto(state) {
    return state.user.photos[0].value
  },
  userPhotoXL(state) {
    return state.user.photos[0].value.replace('_normal', '')
  }
}
