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
    login({ commit }, form) {
      axios.get('/sanctum/csrf-cookie').then(() => {
        axios.post('/login', form).then(({ data }) => commit('setUser', data))
      });
    },

    logout({ commit }) {
      axios.post('/logout').then(() => commit('logout'));
    }
  },

  modules: {},

  plugins: [vuexPersist.plugin],
});

export default store;
