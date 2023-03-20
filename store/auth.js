import {navigateTo, useRuntimeConfig} from "nuxt/app";

let timer;
// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      isAuthed: false,
      isEmployerMode: false,
    }
  },
  getters: {
    token(state) {
      return state.user?.token;
    },
    userId(state) {
      return state.user?.userId;
    },
    isEmployer(state) {
      return state.isEmployerMode;
    }
  },
  actions: {
    toggleUserMode() {
      this.isEmployerMode = !this.isEmployerMode;
    },
    setUser(payload) {
      this.user = payload;
    },
    async verify(){
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.base + 'sanctum/csrf-cookie';

      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      }catch (error){
        if ('data' in error){
          return error.response.data;
        }
        return error;
      }
    },
    async signUp(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/register';
      try {
        await this.verify();

        const response = await axios.post(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            },
        );
        if ('data' in response){
          return {
            status: 'success',
            data: response.data.data
          };
        }else{
          return {
            status: 'error',
            data: response.message
          };
        }
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
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
    async confirmConfirmationCode(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/register/confirm';
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
        return {
          status: 'success',
          data: response.data.data
        };
      }catch (error){
        console.log(error);
        if ('data' in error.response){
          return {
            status: 'error',
            data: error.response.data
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async tryLogin() {

      const CONFIG = useRuntimeConfig();
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
          this.setUser(response.data.data.user);
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

    async signIn(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/login';
      try {
        await this.verify();
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
        if (response.status === 200) {
          localStorage.setItem('token', resData.token);
          this.setUser({
            user: resData.user,
          });
          this.isAuthed = true;
          return {
            status: 'success',
            data: this.user
          };
        }
        // const expiresIn = resData.expiresIn * 1000;
        // const expirationDate = new Date().getTime() + expiresIn;
        //

        // localStorage.setItem('tokenExpirationDate', expirationDate);

        // timer = setTimeout(() => {
        //   this.autoLogout();
        // }, expiresIn);

      }catch (error){
        if (error.response && 'data' in error.response){
          if ('errors' in error.response.data){
            return {
              status: 'error',
              message: error.response.data.message,
              errors: error.response.data.errors,
            };
          }else{
            return {
              status: 'error',
              message: error.response.message
            };
          }

        }
        return {
          status: 'error',
          message: error.message,
        };
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