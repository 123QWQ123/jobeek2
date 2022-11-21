export default {
  namespaced: true,
  actions: {
    logout({ commit }) {
      window.api.call("post", "/api/auth/logout").then(() => commit("UPDATE_USER_LOGOUT"));
    },
  },
  mutations: {
    UPDATE_USER(state, user) {
      console.log(user)
      state.user = user;
    },
    UPDATE_USER_LOGOUT(state, user) {
      state.user = user;
    },
  },
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
  },
};
