import {navigateTo, useRuntimeConfig} from "nuxt/app";

let timer;
// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      employer: null,
      seeker: null,
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
          console.log(response)
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
        if (error.response && 'data' in error.response){
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
    async confirmPhoneCode(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/register/confirm';
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
        if ('token' in response.data?.data){
          console.log(response.data?.data);
          localStorage.setItem('token', response.data?.data.token);
        }
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
    async sendRecoveryCode(payload) {

      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/forgot-password';
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
        console.log(response);

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
    async recoverPasswordCode(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/check-reset-password-code';
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
    async resetPassword(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/reset-password';
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
    async tryLogin(token = "") {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'seeker/profile';
      let url2 = CONFIG.public.apiBase + 'employer/profile';
      if (!token)
        token = localStorage.getItem('token');
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
          this.user = response.data.data;
          this.seeker = this.user;
          this.isAuthed = true;

          const response2 = await axios.get(
              url2,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              },
          );
          this.user = {...response2.data.data};
          this.employer = this.user;


        }catch (error){
          // console.log(error);
          console.log('UnAuthorized');
          // this.logout();
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
          console.log(resData.user);
          this.user = resData.user;
          // this.setUser({
          //   user: resData.user,
          // });
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