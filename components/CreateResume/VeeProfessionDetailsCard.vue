<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Детали резюме({{ isChanged }}) - {{ isFocused }}</h3>
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
        <form @submit.prevent="onSubmit" :validation-schema="schema">
          <div class="input-row">
            <label for="name">Название вакансии<b>*</b></label>
            <div class="input-wrapper">
              <div class="c1 mt-1">
                <Field name="title" type="text" placeholder="Название" />
                <div class="text-danger d-block" v-if="errors.title">
                  {{ errors.title }}
                </div>
              </div>
            </div>
          </div>

          <div class="input-row">
            <label>Специализация:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                :options="professionalRoleOptions"
                v-model="professional_roles"
                @input="updateProfessionalInput"
                :placeholder="'Выберите'"
              />

              <FieldArray
                name="move_able_cities"
                :hidden="true"
                v-model="professional_roles"
              />
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

          <div class="input-row">
            <label>Графиков работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                :options="scheduleOptions"
                v-model="schedules"
                :placeholder="'Выберите'"
              />
              <FieldArray
                name="work_types"
                v-model="schedules"
                :hidden="true"
              />

              <div class="text-danger d-block" v-if="errors.schedules">
                {{ errors.schedules }}
              </div>
            </div>
          </div>

          <div class="input-row">
            <label>Тип работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                :options="workTypeOptions"
                v-model="work_types"
                :placeholder="'Выберите'"
              />
              <FieldArray
                name="work_types"
                v-model="work_types"
                :hidden="true"
              />

              <div class="text-danger d-block" v-if="errors.work_types">
                {{ errors.work_types }}
              </div>
            </div>
          </div>

          <div class="input-row">
            <label>Какой доход вы рассматриваете?</label>
            <div class="row-container">
              <div class="row">
                <div class="col-8">
                  <div class="input-wrapper w-100">
                    <div class="input-group">
                      <Field
                        name="amount"
                        v-model="salary"
                        placeholder="Укажите сумму"
                      />
                      <span
                        v-if="state.currency.is_hidden"
                        class="input-group-text"
                        >₽</span
                      >
                    </div>
                    <div class="text-danger d-block" v-if="errors.amount">
                      {{ errors.amount }}
                    </div>
                  </div>
                </div>
                <div class="col-4" v-if="!state.currency.is_hidden">
                  <CustomSelect
                    :label="'Валюта'"
                    :options="currencyOptions"
                    v-model="currency"
                  ></CustomSelect>

                  <div class="text-danger d-block" v-if="errors.currency">
                    {{ errors.currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useCurrencyOptions } from "~/composables/useCurrencyOptions.js";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

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

const currencyOptions = useCurrencyOptions();

const schema = computed(() => {
  return {
    title: "required|min:1|max:100",
    salary: "required|numeric",
    currency: {
      required: true,
      one_of: currencyOptions.map((item) => item.value),
    },
    professional_roles: "required",
    work_types: "required",
    schedules: "required",
  };
});

const initialValues = ref({
  title: null,
  professional_roles: [],
  work_types: [],
  schedules: [],
  salary: null,
  currency: null,
});
const {
  values,
  errors: veeErrors,
  defineField,
  meta,
  resetForm,
  setValues,
  setFieldTouched,
  handleSubmit,
} = useForm({
  initialValues: initialValues,
  initialTouched: true,
  validationSchema: schema,
});

const [title, titleProps] = defineField("title");
const [currency, currencyProps] = defineField("currency");
const [salary, salaryProps] = defineField("salary");
const [professional_roles, professional_rolesProps] =
  defineField("professional_roles");
const [work_types, work_typesProps] = defineField("work_types");
const [schedules, schedulesProps] = defineField("schedules");

watch(
  () => veeErrors.value,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      const frontErrors = {};
      Object.keys(newErrors).map(
        (item) => (frontErrors[item] = newErrors[item]),
      );
      errors.value = frontErrors;
    }
  },
);

const state = reactive({
  title: {
    is_hidden: false,
  },
  professional_roles: {
    is_hidden: false,
  },
  salary: {
    is_hidden: false,
  },
  currency: {
    is_hidden: false,
  },
  work_types: {
    is_hidden: false,
  },
  schedules: {
    is_hidden: false,
  },
  place_of_work_id: {
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
      setValues({
        ...newData,
      });
      initialValues.value = newData;
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
  if (meta.value.dirty && meta.value.valid) {
    state.isLoading = true;
    errors.value = {};
    state.errorMessage = "";
    let resData = {};

    resData = await updateResume(resumeID.value, {
      ...values,
      form_data: "PROFESSION_DETAILS_DATA",
    });

    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    resetForm({ values });
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
