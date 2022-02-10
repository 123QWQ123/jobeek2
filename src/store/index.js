import { createStore } from "vuex";
import VuexPersist from 'vuex-persist';
import axios from "axios";

const vuexPersist = new VuexPersist({
  key: 'jobeek-app',
  storage: window.localStorage
})

const store = createStore({
  state: {
    user: null,
  },

  getters: {
    isAuthenticated: state => !!state.user,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    logout(state) {
      state.user = null;
    }
  },

  actions: {
    async login({ commit }, form) {
      await axios.get('/sanctum/csrf-cookie');

      return new Promise((resolve, reject) => {
        axios
          .post('/api/auth/login', form)
          .then(({ data }) => {
            commit('setUser', data);
            resolve();
          })
          .catch(error => reject(error.response.data))
      })
    },

    logout({ commit }) {
      axios.post('/api/auth/logout').then(() => commit('logout'));
    },
  },

  modules: {},

  plugins: [vuexPersist.plugin],
});

export default store;
