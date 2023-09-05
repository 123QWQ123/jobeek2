import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: null,
      seeker: null,
      employer: null,
      specializations: [],
      countries: [],
      regions: [],
      cities: [],
      providers: {
        hh: false,
        superjob: false
      }
    }
  },
  getters: {
    countryOptions(state){
        return state.countries.map((item) => {
          return {name: item.name, value: item.id}
        });
    },
    cityOptions: (state) => {
        return state.cities.map((item) => {
          return {name: item.name, value: item.id}
        });
    },
  },
  actions: {

    async getConnectedSeekerProviders(payload) {
      const {data} = await useApi('seeker/used_providers', {
        method: 'get',
        payload
      });
      console.log(data);
      if (data && 'data' in data){
        console.log(data.data);
        this.providers = data.data;
        // this.providers.hh = providers.hh;
        // this.providers.superjob = providers.superjob;
        return this.providers;
      }
      return data;
    },

    async getCountries(payload = {}) {
      const {data} = await useApi('area/countries', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        if (data.data.hasOwnProperty('countries')){
          this.countries = data.data.countries;
        }else{
          this.countries = data.data;
        }
      }
      return data;
    },

    async searchPhone(payload = {}) {
      // domain/api/
      console.log(payload);
      const {data} = await useApi('scam/getPhoneInfo', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.searched_phones = data.data;
        return data.data;
      }
      return data;
    },

    async getRegions(payload = {}) {
      const {data} = await useApi('area/regions', {
        method: 'get',
        payload
      });
      if ('data' in data){
        this.regions = data.data.regions;
      }
      return data;
    },
    async getCities(payload = {}) {
      const {data} = await useApi('area/cities', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        if (data.data.hasOwnProperty('cities')){
          this.cities = data.data.cities;
        }else{
          this.cities = data.data;
        }
      }
      return data;
    },
    async searchCities(payload = {}) {
      const {data} = await useApi('area', {
        method: 'get',
        payload
      });
      if (data.status === 'failed'){
        return [];
      }
      return data ?? [];
    },
    async getCountryCities(payload = {}) {
      const response = await useApi('area/cities', {
        method: 'get',
        payload
      });
      if (response.status === 'success'){
        return response.data.data;
      }
      return [];
    },
    async getUser(payload = "") {
      const {isEmployer} = useAuthStore();
      let url = 'seeker/profile';
      if (isEmployer){
        url = 'employer/profile';
        return this.getEmployer(url);
      }else{
        return this.getSeeker(url);
      }
    },
    async getSeeker(url = "") {
      const {data} = await useApi(url, {
        method: 'get',
      });
      if (data && 'data' in data){
        this.seeker = data.data;
        this.user = {phone: this.seeker?.phone};
      }
      return data;
    },
    async getEmployer(url = "") {
      const response = await useApi(url, {
        method: 'get',
      });
      if (response && response.data && 'data' in response.data){
        this.employer = response.data.data;
        this.user = {phone: this.employer?.phone};
      }
      return response;
    },
    async updateSeeker(payload) {
      const response = await useApi('seeker/profile', {
        method: 'put',
        content_type: 'multipart/form-data',
        payload
      });
      console.log(response);
      if ('data' in response){
        this.user = response.data?.data;
      }
      return response;
    },
    async updateEmployer(payload) {
      const response = await useApi('employer/profile', {
        method: 'put',
        content_type: 'multipart/form-data',
        payload
      });
      if ('data' in response){
        this.user = response.data?.data;
      }
      return response;
    },

    async sendMessage(payload) {
      return await useApi('support', {
        method: 'post',
        payload
      });
    },
    async confirmEmail(payload) {
      return await useApi('profile/email/confirmation', {
        method: 'post',
        payload
      });
    },
    async verifyEmailConfirmation(payload) {
      return await useApi('profile/email/verify', {
        method: 'post',
        payload
      });
    },

    async getSeekerProvidersAuthEndpoints(payload, redirect_to = '/profile/service-verify') {
      const {data} = await useApi('services/auth/redirect-url?profile=seeker&redirect_to=' + redirect_to, {
        method: 'get',
        payload
      });
      if ('data' in data){
        return data.data;
      }
      return data;
    },

    async getEmployerProvidersAuthEndpoints(payload) {
      const {data} = await useApi('services/auth/redirect-url?profile=seeker', {
        method: 'get',
        payload
      });
      if ('data' in data){
        return data.data;
      }
      return data;
    },

    async upload(payload) {
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