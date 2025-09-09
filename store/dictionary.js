// no need to import defineStore and acceptHMRUpdate
import { acceptHMRUpdate, defineStore } from "pinia";
import useApi from "~/hooks/useApi";

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
      vacancy_search_fields: [],
    };
  },
  persist: false,
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
      const { $formatNumber } = useNuxtApp();
      return $formatNumber(value, {});
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
      return this.work_types;
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
      return this.hh_work_types;
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
      return this.superjob_work_types;
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
      return this.vacancy_billing_types;
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
      return this.resume_access_types;
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
      return this.vacancy_types;
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
      return this.addresses;
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
      return this.metro;
    },
    async getDictionaries(groups = []) {
      let groups_to_fetch = [];
      /**
       * Mapping between API parameters and store state fields.
       * Object keys are parameter/group names used in API requests,
       * values are property names in the current store instance.
       * @type {Record<string, string>}
       */
      const paramToStateMap = {
        work_type: "work_types",
        schedule: "schedules",
        place_of_work: "place_of_works",
        education_type_resume: "resume_educations",
        preferred_contact_type: "preferred_contact_types",
        education_form_resume: "resume_education_forms",
        driver_license_types: "driver_licenses",
        resume_access_type_merge: "resume_access_types",
        gender_resume: "resume_genders",
        gender: "genders",
        relocation_type: "relocation_types",
        business_trip: "business_trips",
        lang_level_resume: "resume_language_levels",
        marital_status_resume: "resume_marital_statuses",
        travel_time: "travel_times",
        children_resume: "resume_children",
        experience: "experiences",
        working_days: "working_days",
        working_time_intervals: "working_time_intervals",
        working_time_modes: "working_time_modes",
        extend_vac: "extend_vac",
        education: "educations",
        marital_status: "marital_statuses",
        children: "children",
        vacancy_search_fields: "vacancy_search_fields",
        covid_vaccination_requirement: "covid_vaccination_requirement",
      };

      for (const group of groups) {
        if (
          Object.hasOwn(this, paramToStateMap[group]) &&
          this[paramToStateMap[group]].length === 0
        ) {
          groups_to_fetch.push(group);
        }
      }

      if (groups_to_fetch.length === 0) {
        return [];
      }

      const { data } = await useApi("dictionaries", {
        method: "get",
        params: {
          groups: groups_to_fetch,
        },
      });
      for (const group of groups_to_fetch) {
        if (Object.hasOwn(this, paramToStateMap[group])) {
          this[paramToStateMap[group]] = data.data[group] ?? [];
        } else {
          console.error(
            `Dictionary group ${paramToStateMap[group]} not found. Please check your request.`,
          );
        }
      }
      return data.data ?? [];
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
        return this.resume_genders;
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
        return this.genders;
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
      return this.children;
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
      return this.resume_children;
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
      return this.marital_statuses;
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
      return this.resume_marital_statuses;
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
      return this.travel_times;
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
      return this.place_of_works;
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
      return this.foreign_languages;
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
      return this.language_levels;
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
      return this.resume_language_levels;
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
      return this.driver_licenses;
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
      return this.schedules;
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
      return this.experiences;
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
      return this.part_times;
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
      return this.payment_period;
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
      return this.working_days;
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
      return this.working_time_intervals;
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
      return this.working_time_modes;
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
      return this.extend_vac;
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
      return this.covid_vaccination_requirement;
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
      return this.educations;
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
      return this.resume_educations;
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
      return this.resume_education_forms;
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
      return this.subscription_keywords_srws;
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
      return this.subscription_keywords_skwc;
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
      return this.relocation_types;
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
      return this.business_trips;
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
      return this.preferred_contact_types;
    },
  },
  share: {
    // An array of fields that the plugin will ignore.
    omit: [],
    // Override global config for this store.
    enable: false,
    initialize: false,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
