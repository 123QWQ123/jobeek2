import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: null,
      seeker: null,
      employer: null,
      specializations: [],
      pub_countries: [],
      pub_cities: [],
    }
  },
  getters: {
    countryOptions(){
        return this.pub_countries.map((item) => {
          return {name: item.name, value: item.id}
        });
    },
    cityOptions: (state) => {
        return state.pub_cities.map((item) => {
          return {name: item.name, value: item.id}
        });
    },
  },
  actions: {

    async getUser(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'auth/profile';
      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          this.user = response.data.data.user;
          this.seeker = this.user?.seeker;
          if (!this.seeker){
            this.seeker = {};
          }
          this.seeker.phone = this.user?.phone;
          this.seeker.email = this.user?.email;
          this.employer = this.user?.employer;
          if (!this.employer)
            this.employer = {};
          this.employer.phone = this.user?.phone;

        }
      }catch (error){
        console.log(error);
        return {
          status: 'error',
          message: error.message,
        };
      }
    },
    async getPublicCountries(payload) {
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'countries';

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          this.pub_countries = response.data;
        }
      }catch (error){
        this.pub_countries = []
        return {
          status: 'error',
          message: error.message,
        };
      }
    },

    async getPublicCities(payload) {
      const CONFIG = useRuntimeConfig();

      let url = CONFIG.public.apiBase + 'cities';

      if (payload && payload.country_id){
        url += '?pub_country_id=' + payload.country_id;
      }

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.get(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          this.pub_cities = response.data.data;
        }
      }catch (error){
        this.pub_cities = []
        return {
          status: 'error',
          message: error.message,
        };
      }
    },

    async update(payload) {
      const CONFIG = useRuntimeConfig();
      const authStore = useAuthStore();
      const {isEmployer} = authStore;
      let url = CONFIG.public.apiBase + 'auth/profile/update?type=employer';

      if (!isEmployer){
        url = CONFIG.public.apiBase + 'auth/profile/update?type=seeker';
      }

      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }
      try {
        const response = await axios.post(
            url,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            },
        );
        if ('data' in response){
          this.user = response.data.data.user;
          return {
            status: 'success',
          }
        }
      }catch (error){
        console.log(error);
        if ("response" in  error && error.response.data?.errors){
          return {
            status: 'error',
            message: error.message,
            errors: error.response.data.errors,
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },

    async upload(payload) {
      console.log(payload)
      const CONFIG = useRuntimeConfig();
      let url = CONFIG.public.apiBase + 'upload';
      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
      }

      try {
        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if ('data' in response){
          console.log(response.data);
          return {
            status: 'success',
            path: response.data.path
          }
        }
      }catch (error){
        console.log(error);
        if ("response" in  error && error.response.data?.errors){
          return {
            status: 'error',
            message: error.message,
            errors: error.response.data.errors,
          };
        }
        return {
          status: 'error',
          message: error.message,
        };
      }
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}