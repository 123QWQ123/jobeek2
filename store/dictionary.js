// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";
import vueNumberFormat from "~/plugins/vueNumberFormat.js";

export const useDictionaryStore = defineStore("dictionary", {
  state: () => {
    return {
      work_types: [],
      hh_work_types: [],
      superjob_work_types: [],
      schedules: [],
      experiences: [],
      part_times: [],
      metros: [],
      driver_licenses: [],
      educations: [],
      resume_educations: [],
      genders: [],
      resume_genders: [],
      place_of_works: [],
      foreign_languages: [],
      language_levels: [],
      marital_statuses: [],
      resume_marital_statuses: [],
      children: [],
      vacancy_billing_types: [],
      vacancy_types: [],
      payment_period: [],
      addresses: [],
      metro: [],
      working_days: [],
      working_time_intervals: [],
      working_time_modes: [],
      extend_vac: [],
      covid_vaccination_requirement: [],
      subscription_keywords_srws: [],
      subscription_keywords_skwc: [],
      relocation_types: [],
      business_trips: [],
      preferred_contact_types: [],
      resume_education_forms: [],
      travel_times: [],
      resume_children: [],
      resume_access_types: [],
      resume_language_levels: [],
    };
  },
  getters: {
    addresses_formatted() {
      return this.addresses.map((item) => ({
        name: item.raw,
        value: item.id,
      }));
    },
    vacancy_types_formatted() {
      return this.vacancy_types.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    payment_period_formatted() {
      return this.payment_period.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    work_types_formatted() {
      return this.work_types.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    experiences_formatted() {
      return this.experiences.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    schedules_formatted() {
      return this.schedules.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    working_days_formatted() {
      return this.working_days.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    working_time_intervals_formatted() {
      return this.working_time_intervals.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    working_time_modes_formatted() {
      return this.working_time_modes.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    extend_vac_formatted() {
      return this.extend_vac.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    educations_formatted() {
      return this.educations.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    place_of_works_formatted() {
      return this.place_of_works.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    marital_statuses_formatted() {
      return this.marital_statuses.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    genders_formatted() {
      return this.genders.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    children_formatted() {
      return this.children.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
    covid_vaccination_requirement_formatted() {
      return this.covid_vaccination_requirement.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    },
  },
  actions: {
    numberFormat(value) {
      return vueNumberFormat(value, {});
    },
    async getWorkTypes(payload) {
      if (this.work_types.length > 0) {
        return this.work_types;
      }
      const { data } = await useApi("dictionaries?groups[]=work_type", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.work_types = data.data?.work_type ?? [];
      }
      return data;
    },
    async getHHWorkTypes(payload) {
      if (this.hh_work_types.length > 0) {
        return this.hh_work_types;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=work_type&providers[]=hh",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.hh_work_types = data.data?.work_type ?? [];
      }
      return [];
    },
    async getSuperjobWorkTypes(payload) {
      if (this.superjob_work_types.length > 0) {
        return this.superjob_work_types;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=work_type&providers[]=superjob",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.superjob_work_types = data.data?.work_type ?? [];
      }
      return [];
    },
    async getVacancyBillingTypes(payload) {
      if (this.vacancy_billing_types.length > 0) {
        return this.vacancy_billing_types;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=vacancy_billing_type",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.vacancy_billing_types = data.data?.vacancy_billing_type ?? [];
      }
      return data;
    },
    async getResumeAccessTypes(payload) {
      if (this.resume_access_types.length > 0) {
        return this.resume_access_types;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=resume_access_type_merge",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.resume_access_types = data.data?.resume_access_type_merge ?? [];
      }
      return data;
    },
    async getVacancyTypes(payload) {
      if (this.vacancy_types.length > 0) {
        return this.vacancy_types;
      }
      const { data } = await useApi("dictionaries?groups[]=vacancy_type", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.vacancy_types = data.data?.vacancy_type ?? [];
      }
      return data;
    },
    async searchAddresses(payload) {
      if (this.addresses.length > 0) {
        return this.addresses;
      }
      const response = await useApi(
        "employer/addresses?providers[]=hh&page=0&per_page=100",
        {
          method: "get",
          payload,
        },
      );
      console.log(response);
      if (response && "data" in response) {
        if (
          response &&
          "data" in response &&
          response.data.hasOwnProperty("data")
        ) {
          this.addresses = response.data ?? [];
          return this.addresses;
        }
        this.addresses = response.data ?? [];
        return this.addresses;
      } else {
      }
      return response;
    },
    async searchMetro(payload) {
      if (this.metro.length > 0) {
        return this.metro;
      }
      const { data } = await useApi("metro", {
        method: "get",
        params: payload,
      });
      if (data) {
        this.metro = data.data ?? [];
        return this.metro;
      }
      return data;
    },
    async getGenders(payload, is_for_resume = false) {
      if (is_for_resume) {
        if (this.resume_genders.length > 0) {
          return this.resume_genders;
        }
        const { data } = await useApi("dictionaries?groups[]=gender_resume", {
          method: "get",
          payload,
        });
        if (data && "data" in data) {
          this.resume_genders = data.data?.gender_resume ?? [];
        }
        return data;
      } else {
        if (this.genders.length > 0) {
          return this.genders;
        }
        const { data } = await useApi("dictionaries?groups[]=gender", {
          method: "get",
          payload,
        });
        if (data && "data" in data) {
          this.genders = data.data?.gender ?? [];
        }
        return data;
      }
    },
    async getChildren(payload) {
      if (this.children.length > 0) {
        return this.children;
      }
      const { data } = await useApi("dictionaries?groups[]=children", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.children = data.data?.children ?? [];
      }
      return data;
    },
    async getResumeChildren(payload) {
      if (this.resume_children.length > 0) {
        return this.children;
      }
      const { data } = await useApi("dictionaries?groups[]=children_resume", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.resume_children = data.data?.children_resume ?? [];
      }
      return data;
    },
    async getMaritalStatus(payload) {
      if (this.marital_statuses.length > 0) {
        return this.marital_statuses;
      }
      const { data } = await useApi("dictionaries?groups[]=marital_status", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.marital_statuses = data.data?.marital_status ?? [];
      }
      return data;
    },
    async getMaritalStatusForResume(payload) {
      if (this.resume_marital_statuses.length > 0) {
        return this.resume_marital_statuses;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=marital_status_resume",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.resume_marital_statuses = data.data?.marital_status_resume ?? [];
      }
      return data;
    },
    async getTravelTimeOptions(payload) {
      if (this.travel_times.length > 0) {
        return this.travel_times;
      }
      const { data } = await useApi("dictionaries?groups[]=travel_time", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.travel_times = data.data?.travel_time ?? [];
      }
      return data;
    },
    async getPlaceOfWorks(payload) {
      if (this.place_of_works.length > 0) {
        return this.place_of_works;
      }
      const { data } = await useApi("dictionaries?groups[]=place_of_work", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.place_of_works = data.data?.place_of_work ?? [];
      }
      return data;
    },
    async getForeignLanguages(payload) {
      if (this.foreign_languages.length > 0) {
        return this.foreign_languages;
      }
      const { data } = await useApi("languages", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.foreign_languages = data.data ?? [];
      }
      return data;
    },
    async getLanguageLevels(payload) {
      if (this.language_levels.length > 0) {
        return this.language_levels;
      }
      const { data } = await useApi("dictionaries?groups[]=language_level", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.language_levels = data.data?.language_level ?? [];
      }
      return data;
    },
    async getResumeLanguageLevels(payload) {
      if (this.resume_language_levels.length > 0) {
        return this.resume_language_levels;
      }
      const { data } = await useApi("dictionaries?groups[]=lang_level_resume", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.resume_language_levels = data.data?.lang_level_resume ?? [];
      }
      return data;
    },
    async getDriverLicenses(payload) {
      if (this.driver_licenses.length > 0) {
        return this.driver_licenses;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=driver_license_types",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.driver_licenses = data.data?.driver_license_types ?? [];
      }
      return data;
    },
    async getSchedules(payload = {}) {
      if (this.schedules.length > 0) {
        return this.schedules;
      }
      const { data } = await useApi("dictionaries?groups[]=schedule", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.schedules = data.data?.schedule ?? [];
      }
      return data;
    },
    async getExperiences(payload = {}) {
      if (this.experiences.length > 0) {
        return this.experiences;
      }
      const { data } = await useApi("dictionaries?groups[]=experience", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.experiences = data.data?.experience ?? [];
      }
      return data;
    },
    async getPartTimes(payload = {}) {
      if (this.part_times.length > 0) {
        return this.part_times;
      }
      const { data } = await useApi("dictionaries?groups[]=part_time", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.part_times = data.data?.part_time ?? [];
      }
      return data;
    },
    async getPaymentPeriodOptions(payload) {
      if (this.payment_period.length > 0) {
        return this.payment_period;
      }
      const { data } = await useApi("dictionaries?groups[]=payment_period", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.payment_period = data.data?.payment_period ?? [];
      }
      return data.data;
    },

    async getWorkingDayOptions(payload) {
      if (this.working_days.length > 0) {
        return this.working_days;
      }
      const { data } = await useApi("dictionaries?groups[]=working_days", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.working_days = data.data?.working_days ?? [];
      }
      return data.data;
    },
    async getWorkingTimeIntervalsOptions(payload) {
      if (this.working_time_intervals.length > 0) {
        return this.working_time_intervals;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=working_time_intervals",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.working_time_intervals = data.data?.working_time_intervals ?? [];
      }
      return data.data;
    },
    async getWorkingTimeModesOptions(payload) {
      if (this.working_time_modes.length > 0) {
        return this.working_time_modes;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=working_time_modes",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.working_time_modes = data.data?.working_time_modes ?? [];
      }
      return data.data;
    },
    async getExtendVacOptions(payload) {
      if (this.extend_vac.length > 0) {
        return this.extend_vac;
      }
      const { data } = await useApi("dictionaries?groups[]=extend_vac", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.extend_vac = data.data?.extend_vac ?? [];
      }
      return data.data;
    },
    async getCovidVacRequirements(payload) {
      const nullableOption = { id: null, name: "Не выбран" };
      if (this.covid_vaccination_requirement.length > 0) {
        return this.covid_vaccination_requirement;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=covid_vaccination_requirement",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.covid_vaccination_requirement =
          data.data?.covid_vaccination_requirement ?? [];
        this.covid_vaccination_requirement.unshift(nullableOption);
        return this.covid_vaccination_requirement;
      }
      return data.data;
    },

    async getEducations(payload) {
      if (this.educations.length > 0) {
        return this.educations;
      }
      const { data } = await useApi("dictionaries?groups[]=education", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.educations = data.data?.education ?? [];
      }
      return data.data;
    },
    async getResumeEducations(payload) {
      if (this.resume_educations.length > 0) {
        return this.resume_educations;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=education_type_resume",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.resume_educations = data.data?.education_type_resume ?? [];
      }
      return data.data;
    },
    async getResumeEducationForms(payload) {
      if (this.resume_education_forms.length > 0) {
        return this.resume_education_forms;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=education_form_resume",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.resume_education_forms = data.data?.education_form_resume ?? [];
      }
      return data.data;
    },
    async getSubscriptionKeywordsSrws(payload) {
      if (this.subscription_keywords_srws.length > 0) {
        return this.subscription_keywords_srws;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=subscriptionKeywords_srws",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.subscription_keywords_srws =
          data.data?.subscriptionKeywords_srws ?? [];
      }
      return data.data;
    },
    async getSubscriptionKeywordsSkwc(payload) {
      if (this.subscription_keywords_skwc.length > 0) {
        return this.subscription_keywords_skwc;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=subscriptionKeywords_skwc",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.subscription_keywords_skwc =
          data.data?.subscriptionKeywords_skwc ?? [];
      }
      return data.data;
    },
    async getRelocationTypes(payload) {
      if (this.relocation_types.length > 0) {
        return this.relocation_types;
      }
      const { data } = await useApi("dictionaries?groups[]=relocation_type", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.relocation_types = data.data?.relocation_type ?? [];
      }
      return data.data;
    },
    async getBusinessTrips(payload) {
      if (this.business_trips.length > 0) {
        return this.business_trips;
      }
      const { data } = await useApi("dictionaries?groups[]=business_trip", {
        method: "get",
        payload,
      });
      if (data && "data" in data) {
        this.business_trips = data.data?.business_trip ?? [];
      }
      return data.data;
    },
    async getPreferredContactTypes(payload) {
      if (this.preferred_contact_types.length > 0) {
        return this.preferred_contact_types;
      }
      const { data } = await useApi(
        "dictionaries?groups[]=preferred_contact_type",
        {
          method: "get",
          payload,
        },
      );
      if (data && "data" in data) {
        this.preferred_contact_types = data.data?.preferred_contact_type ?? [];
      }
      return data.data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
