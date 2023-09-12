import {useRuntimeConfig} from "nuxt/app";

// no need to import defineStore and acceptHMRUpdate
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/auth";
import useApi from "~/hooks/useApi";
import vueNumberFormat from "~/plugins/vueNumberFormat";

export const useDictionaryStore = defineStore('dictionary', {
  state: () => {
    return {
      work_types: [],
      schedules: [],
      experiences: [],
      part_times: [],
      metros: [],
      driver_licenses: [],
      educations: [],
      genders: [],
      place_of_works: [],
      foreign_languages: [],
      language_levels: [],
      marital_statuses: [],
      children: [],
      vacancy_billing_types: [],
      vacancy_types: [],
      payment_period: [],
      addresses: [],
    }
  },
  getters: {
  },
  actions: {

    numberFormat (value) {
      return vueNumberFormat(value,  {});
    },
    async getWorkTypes(payload) {
      const {data} = await useApi('dictionaries?groups[]=work_type', {
        method: 'get',
        payload
      });
      console.log(data);
      if (data && 'data' in data){
        console.log(1);
        this.work_types = data.data?.work_type ?? [];
      }
      return data;
    },
    async getVacancyBillingTypes(payload) {
      const {data} = await useApi('dictionaries?groups[]=vacancy_billing_type', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.vacancy_billing_types = data.data?.vacancy_billing_type ?? [];
      }
      return data;
    },
    async getVacancyTypes(payload) {
      const {data} = await useApi('dictionaries?groups[]=vacancy_type', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.vacancy_types = data.data?.vacancy_type ?? [];
      }
      return data;
    },
    async searchAddresses(payload) {
      const {data} = await useApi('employer/addresses?providers[]=hh&page=0&per_page=100', {
        method: 'get',
        payload
      });
      if (data){
        this.addresses = data ?? [];
      }
      return data;
    },
    async searchMetro(payload) {
      const {data} = await useApi('metro', {
        method: 'get',
        payload
      });
      console.log(data);
      if (data){
        this.addresses = data ?? [];
      }
      return data;
    },
    async getGenders(payload) {
      const {data} = await useApi('dictionaries?groups[]=gender', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.genders = data.data?.gender ?? [];
      }
      return data;
    },
    async getChildren(payload) {
      const {data} = await useApi('dictionaries?groups[]=children', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.children = data.data?.children ?? [];
      }
      return data;
    },
    async getMaritalStatus(payload) {
      const {data} = await useApi('dictionaries?groups[]=marital_status', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.marital_statuses = data.data?.marital_status ?? [];
      }
      return data;
    },
    async getPlaceOfWorks(payload) {
      const {data} = await useApi('dictionaries?groups[]=place_of_work', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.place_of_works = data.data?.place_of_work ?? [];
      }
      return data;
    },
    async getForeignLanguages(payload) {
      const {data} = await useApi('languages', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.foreign_languages = data.data ?? [];
      }
      return data;
    },
    async getLanguageLevels(payload) {
      const {data} = await useApi('dictionaries?groups[]=language_level', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.language_levels = data.data?.language_level ?? [];
      }
      return data;
    },
    async getDriverLicenses(payload) {
      const {data} = await useApi('dictionaries?groups[]=driver_license_types', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.driver_licenses = data.data?.driver_license_types ?? [];
      }
      return data;
    },
    async getSchedules(payload = {}) {
      const {data} = await useApi('dictionaries?groups[]=schedule', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.schedules = data.data?.schedule ?? [];
      }
      return data;
    },
    async getExperiences(payload = {}) {
      const {data} = await useApi('dictionaries?groups[]=experience', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.experiences = data.data?.experience ?? [];
      }
      return data;
    },
    async getPartTimes(payload = {}) {
      const {data} = await useApi('dictionaries?groups[]=part_time', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.part_times = data.data?.part_time ?? [];
      }
      return data;
    },
    async getEducations(payload) {
      const {data} = await useApi('dictionaries?groups[]=education', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.educations = data.data?.education ?? [];
      }
      return data.data;
    },

    async getPaymentPeriodOptions(payload) {
      const {data} = await useApi('dictionaries?groups[]=payment_period', {
        method: 'get',
        payload
      });
      if (data && 'data' in data){
        this.payment_period = data.data?.payment_period ?? [];
      }
      return data.data;
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}