let timer;
// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      isAuthed: false
    }
  },
  getters: {
    token(state) {
      return state.user?.token;
    },
    userId(state) {
      return state.user?.userId;
    }
  },
  actions: {
    setUser(payload) {
      this.user = payload;
    },
    async signUp(params) {

      const resData = await this.auth({
        ...params,
        mode: 'sign-up'
      })
      return resData;
    },
    async auth(payload) {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqQbWUrb3GEN9WwBlfQhdjmcq4Scn7uk0';
      if (payload.mode === 'sign-up') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqQbWUrb3GEN9WwBlfQhdjmcq4Scn7uk0';
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          returnSecureToken: true
        })
      });
      const resData = await response.json();
      const expiresIn = resData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', resData.idToken);
      localStorage.setItem('userId', resData.localId);
      localStorage.setItem('tokenExpirationDate', expirationDate);

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      if (response.ok) {
        this.setUser({
          token: resData.idToken,
          userId: resData.localId,
        });
        this.isAuthed = true;
      }
      return resData;
    },

    tryLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');

      const expiresIn = tokenExpirationDate - new Date().getTime();

      if (token && userId) {
        this.user = { token: token, userId: userId };
        this.isAuthed = true;
      }

      if (expiresIn < 0) {
        this.autoLogout();
        return;
      }

      timer = setTimeout(function () {
        this.autoLogout();
      }, expiresIn);

    },

    clearAuth() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpirationDate');
    },

    async signIn(params) {
      const resData = this.auth({
        ...params,
        mode: 'log-in'
      })
      return resData;
    },

    autoLogout() {
      this.logout();
    },

    logout() {
      clearTimeout(timer);
      this.clearAuth();
      this.user = {};
      this.isAuthed = false;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}