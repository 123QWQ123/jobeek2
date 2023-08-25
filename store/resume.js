import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";

export const useResumeStore = defineStore('resume', {
  state: () => {
    return {
      resumes: [],
      resume: null,
      total: 0,
      my_total: 0,
      data: null,
      current_page: 1,
      my_resumes: [],
      my_favorite_resumes: [],
      specializations: [],
      industries: [],
      areas: [],
      countries: [],
      regions: [],
      cities: [],
      work_types: [],
      schedules: [],
      experiences: [],
      part_times: [],
      metros: [],
      providers: {
        hh: null,
        superjob: null
      },
    }
  },
  getters: {
    top_10: (state) => {
      return state.resumes.slice(0, 10);
    },
    top_20: (state) => {
      return state.resumes.slice(0, 20);
    },
    top_30: (state) => {
      return state.resumes.slice(0, 30);
    },
  },
  actions: {
    async getAreas(payload) {
      console.log(payload);
      const {data} = await useApi('area', {
        method: 'get',
        payload
      });
      if (data){
        this.areas = data;
      }
      return data;
    },
    async getResumes(payload, add = false) {
      const {data} = await useApi('resumes/search', {
        method: 'get',
        payload
      });
      if (data && 'items' in data){
        if (add){
          this.resumes = this.resumes.concat(data.items);
          this.current_page++;
        }else{
          this.resumes = data.items;
          this.current_page = 1;
        }
        this.total = data.found;
      }
      return data;
    },
    async createResume( payload, content_type = 'application/json') {
      const response = await useApi('seeker/resumes/create', {
        method: 'post',
        content_type,
        payload
      });
      // if ('data' in response){
      //   this.resume = response.data;
      // }
      return response;
    },
    async updateResume(id, payload, content_type = 'application/json') {
      const response = await useApi('seeker/resumes/' + id, {
        method: 'PUT',
        content_type,
        payload
      });
      // if ('data' in response && response.data.status === 'success'){
      //   this.resume = response.data;
      // }
      return response;
    },
    async getResume(id, payload) {
      const {data} = await useApi('seeker/resumes/' + id, {
        method: 'get',
        payload
      });
      if (data){
        this.resume = data.data;
      }
      return data;
    },
    async clearResumes() {
      this.resumes = [];
    },
    async getMyResumes(payload) {
      const response = await useApi('seeker/resumes', {
        method: 'get',
        payload
      });
      console.log(response);
      if (response && 'data' in response && 'items' in response.data){
        this.my_resumes = response.data.items;
        this.my_total = response.data.found;
        this.current_page = response.data.current_page;
      }
      return response;
    },
    async getMyFavoriteVacancies(payload) {
      const {data} = await useApi('resumes/search', {
        method: 'get',
        payload
      });
      if ('items' in data){
        this.my_favorite_vacancies = data.items;
        if (payload.page) {
          this.current_page = payload.page;
        }
      }
      return data;
    },
    async getRegions(payload = {}) {
      const {data} = await useApi('area/regions', {
        method: 'get',
        payload
      });
      if (data){
        this.regions = data.data.regions;
      }
      return data;
    },
    async getCities(payload = {}) {
      console.log(payload)
      const {data} = await useApi('area/cities', {
        method: 'get',
        payload
      });
      if (data){
        console.log(data)
        this.cities = data.data.cities;
      }
      return data;
    },
    async getSpecializations(payload) {
      const {data} = await useApi('specializations', {
        method: 'get',
        payload
      });
      if (data){
        this.specializations = data.data;
      }
      return data;
    },
    async getWorkTypes(payload) {
      const {data} = await useApi('dictionaries?group=work_type', {
        method: 'get',
        payload
      });
      if (data){
        this.work_types = data.data.work_type;
      }
      return data;
    },
    async getSchedules(payload = {}) {
      const {data} = await useApi('dictionaries?group=schedule', {
        method: 'get',
        payload
      });
      if (data){
        this.schedules = data.data.schedule;
      }
      return data;
    },
    async getExperiences(payload = {}) {
      const {data} = await useApi('dictionaries?group=experience', {
        method: 'get',
        payload
      });
      if (data){
        this.experiences = data.data.experience;
      }
      return data;
    },
    async getPartTimes(payload = {}) {
      const {data} = await useApi('dictionaries?group=part_time', {
        method: 'get',
        payload
      });
      if (data){
        this.part_times = data.data.part_time;
      }
      return data;
    },
    async getIndustries(payload) {
      const {data} = await useApi('industries', {
        method: 'get',
        payload
      });
      if (data){
        this.industries = data.data;
      }
      return data.data;
    },
    async getMetros(payload) {
      const {data} = await useApi('metro', {
        method: 'get',
        payload
      });
      if (data){
        this.metros = data.data;
      }
      return data.data;
    },

    async addToFavorite(payload) {
      const response = await useApi('resume/favorite', {
        method: 'post',
        payload
      });
      return response;
    },

    async removeFromFavorite(payload) {
      const response = await useApi('resume/favorite', {
        method: 'delete',
        payload
      });
      return response;
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useResumeStore, import.meta.hot));
}