<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Детали резюме</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="input-row" v-if="!state.title.is_hidden">
          <label>Название:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <input
              v-model="state.title.val"
              @focusin="() => (errors.title = '')"
            />
            <div class="text-danger d-block" v-if="errors.title">
              {{ errors.title }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Специализация:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch
              :options="professionalRoleOptions"
              v-model="state.professional_roles.val"
              :label="'Выберите специализацию'"
              @input="updateProfessionalInput"
              @focusin="() => (errors.professional_roles = '')"
            ></MultiSelectWithSearch>
            <div class="text-danger d-block" v-if="errors.professional_roles">
              {{ errors.professional_roles }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.place_of_work_id.is_hidden">
          <label>Место работы:</label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="placeOfWorkOptions"
              v-model="state.place_of_work_id.val"
              :label="'Выберите'"
              @focusin="() => (errors.place_of_work_id = '')"
            ></CustomSelect>
            <div class="text-danger d-block" v-if="errors.place_of_work_id">
              {{ errors.place_of_work_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.schedules.is_hidden">
          <label>Графиков работы:</label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch
              :options="scheduleOptions"
              v-model="state.schedules.val"
              :label="'Выберите'"
              @focusin="() => (errors.schedules = '')"
            ></MultiSelectWithSearch>
            <div class="text-danger d-block" v-if="errors.schedules">
              {{ errors.schedules }}
            </div>
          </div>
        </div>
        <div class="input-row" v-if="!state.work_types.is_hidden">
          <label>Типов занятостей:</label>
          <div class="input-wrapper mt-2">
            <MultiSelectWithSearch
              :options="workTypeOptions"
              v-model="state.work_types.val"
              :label="'Выберите'"
              @focusin="() => (errors.work_types = '')"
            ></MultiSelectWithSearch>
            <div class="text-danger d-block" v-if="errors.work_types">
              {{ errors.work_types }}
            </div>
          </div>
        </div>

        <CreateResumeSalary
          v-model="salary"
          :fields_visibility="{ currency: state.currency.is_hidden }"
          :errors="errors"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";

const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const { employer } = profileStore;
const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const salary = ref({
  amount: null,
  currency: null,
});

watch(
  () => salary.value,
  (newData) => {
    state.salary.val = newData?.amount;
    state.currency.val = newData?.currency;
  },
);

const state = reactive({
  title: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  professional_roles: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  salary: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  currency: {
    val: "RUB",
    isValid: true,
    is_hidden: false,
  },
  work_types: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  schedules: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  place_of_work_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    schedules: true,
    currency: false,
  },
  superjob: {
    place_of_work_id: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);
watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  },
);

onMounted(() => {
  if (providers.value.length > 0) {
    walkThroughFields(props.providers);
  }
});

const professionalRoleOptions = ref([]);

const set = (key, val) => {
  state[key].val = val;
};

watch(
  () => useWatchStateValues(state, true, true, ["providers"]),
  (newState, oldState) => {
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  },
);

const sectionData = ref({});
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newData) {
      sectionData.value = {
        title: newData.title,
        salary: newData.salary,
        currency: newData.currency,
        place_of_work_id: newData.place_of_work?.id,
        work_types: Object.keys(newData.work_types),
        schedules: Object.keys(newData.schedules),
        professional_roles: newData.professional_roles.map((item) => item.id),
      };
    }
  },
);

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      state.title.val = newData.title;
      state.professional_roles.val = newData.professional_roles;
      state.work_types.val = newData.work_types;
      state.schedules.val = newData.schedules;
      state.salary.val = newData.salary;
      state.currency.val = newData.currency;
      salary.value = {
        amount: newData.salary,
        currency: newData.currency,
      };
      state.place_of_work_id.val = newData.place_of_work_id;
      state.work_types.val = newData.work_types;
    }
  },
);

const { searchCities, searchProfessionalRoles } = profileStore;
const updateProfessionalInput = async (newValue = "") => {
  let items = await searchProfessionalRoles();
  items = items.filter((item) => item.name.includes(newValue));
  professionalRoleOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const dictionaryStore = useDictionaryStore();
const { getPlaceOfWorks, getSchedules, getWorkTypes } = dictionaryStore;

const placeOfWorkOptions = computed(() => {
  return dictionaryStore.place_of_works.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const workTypeOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const scheduleOptions = computed(() => {
  return dictionaryStore.schedules.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

onMounted(() => {
  updateProfessionalInput();
  getSchedules();
  getWorkTypes();
  getPlaceOfWorks();
  setTimeout(async () => {}, 500);
});
const { errors, handleErrorResponse } = useFormValidation();

const isFocused = ref(false);
const save = async (is_from_parent = false) => {
  if (is_from_parent === true) {
    isFocused.value = true;
  }
  if (!isFocused.value) {
    return true;
  }
  if (isChanged.value) {
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = { ...useFormData(state) };

    jsonData.form_data = "PROFESSION_DETAILS_DATA";

    resData = await updateResume(resumeID.value, jsonData);

    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  } else {
    return true;
  }
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  if (myResume && !isCollapsed.value) {
    return myResume.address && myResume.address.address;
  }
  return false;
});

defineExpose({
  save,
});
</script>
