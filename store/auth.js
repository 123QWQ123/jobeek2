import {navigateTo, useRuntimeConfig} from "nuxt/app";

let timer;
// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

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
    async signUp(payload) {
      console.log(payload)
      const CONFIG = useRuntimeConfig();
      console.log(CONFIG.public.apiBase);
      let url = CONFIG.public.apiBase + 'auth/register';
      await this.verify();
      try {

        const response = await axios.post(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            },
        );
        console.log(response)
      }catch (error){
        // console.log(error);

        return error.response.data;
      }
      // const resData = await response;
      // const expiresIn = resData.expiresIn * 1000;
      // const expirationDate = new Date().getTime() + expiresIn;
      //
      // localStorage.setItem('token', resData.idToken);
      // localStorage.setItem('userId', resData.localId);
      // localStorage.setItem('tokenExpirationDate', expirationDate);
      //
      // timer = setTimeout(() => {
      //   this.autoLogout();
      // }, expiresIn);

      // if (response.ok) {
      //   this.setUser({
      //     token: resData.idToken,
      //     userId: resData.localId,
      //   });
      //   this.isAuthed = true;
      // }
    },

    async tryLogin() {
      const CONFIG = useRuntimeConfig();
      console.log(CONFIG.public.apiBase);
      let url = CONFIG.public.apiBase + 'auth/profile';
      const token = localStorage.getItem('token');
      // const userId = localStorage.getItem('userId');
      // const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
      // const expiresIn = tokenExpirationDate - new Date().getTime();

      if (token) {
        try{
          const response = await axios.get(
              url,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              },
          );
          this.setUser(response.data.data);
          this.isAuthed = true;
        }catch (error){
          this.logout();
        }

        return;
      }
      this.setUser(null);
      this.isAuthed = false;
      // if (expiresIn < 0) {
      //   this.autoLogout();
      //   return;
      // }
      //
      // timer = setTimeout(function () {
      //   this.autoLogout();
      // }, expiresIn);

    },

    clearAuth() {
      localStorage.removeItem('token');
      // localStorage.removeItem('userId');
      // localStorage.removeItem('tokenExpirationDate');
    },

    async verify(){
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.base + 'sanctum/csrf-cookie';

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },

    async signIn(payload) {
      const CONFIG = useRuntimeConfig();
      console.log(CONFIG.public.apiBase);
      let url = CONFIG.public.apiBase + 'auth/login';

      await this.verify();
      try {

        const response = await axios.post(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            },
        );
        const resData = response.data.data;
        console.log(resData)
        if (response.status === 200) {
          localStorage.setItem('token', resData.token);
          this.setUser({
            user: resData.user,
          });
          this.isAuthed = true;
          return this.user;
        }
        // const expiresIn = resData.expiresIn * 1000;
        // const expirationDate = new Date().getTime() + expiresIn;
        //

        // localStorage.setItem('tokenExpirationDate', expirationDate);

        // timer = setTimeout(() => {
        //   this.autoLogout();
        // }, expiresIn);

      }catch (error){
        console.log(error);
        return error.response.data;
      }



    },

    autoLogout() {
      this.logout();
    },

    logout() {
      this.clearAuth();
      this.setUser(null);
      this.isAuthed = false;
      navigateTo('/');
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}