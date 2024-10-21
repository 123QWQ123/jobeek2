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

    <div class="text-danger d-block p-4">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <form @submit.prevent="" @focusin="errorMessage = ''">
          <div class="input-row">
            <label for="name">Название вакансии<b>*</b></label>
            <div class="input-wrapper">
              <div class="c1 mt-1">
                <ResumeTextInput name="title" />
              </div>
            </div>
          </div>

          <div class="input-row">
            <label>Специализация:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <CreateResumeVeeProfessionalDetailsProfessionalRoles
                name="professional_roles"
              />
            </div>
          </div>

          <div class="input-row" v-show="!state.place_of_work_id.is_hidden">
            <label>Место работы:</label>
            <div class="input-wrapper mt-2">
              <VeeCustomSelect
                name="place_of_work_id"
                :options="placeOfWorkOptions"
                :label="'Выберите'"
              ></VeeCustomSelect>
            </div>
          </div>

          <div class="input-row" v-show="!state.schedules.is_hidden">
            <label>Графиков работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                :options="dictionaryStore.schedules_formatted"
                name="schedules"
                placeholder="Выберите"
              />
            </div>
          </div>

          <div class="input-row">
            <label>Тип работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <CreateResumeVeeProfessionalDetailsWorkTypes name="work_types" />
            </div>
          </div>

          <div class="input-row">
            <label>Какой доход вы рассматриваете?</label>
            <div class="row-container">
              <div class="row">
                <div class="col-8">
                  <div
                    class="mb-3"
                    :class="{
                      'input-wrapper': !state.currency.is_hidden,
                      'input-group': state.currency.is_hidden,
                    }"
                  >
                    <Field
                      v-show="!state.salary.is_hidden"
                      name="salary"
                      :class="{ 'form-control': state.currency.is_hidden }"
                      type="number"
                      placeholder="Укажите сумму"
                    />
                    <span
                      class="input-group-text"
                      v-show="state.currency.is_hidden"
                      >₽</span
                    >
                  </div>

                  <div class="text-danger">
                    <ErrorMessage name="salary" />
                  </div>
                </div>
                <div class="col-4" v-show="!state.currency.is_hidden">
                  <VeeCustomSelect
                    name="currency"
                    :label="'Валюта'"
                    :options="currencyOptions"
                  />
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
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
import { zod } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useResumeStore } from "~/store/resume";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import useProviders from "~/composables/useProviders.js";

const dictionaryStore = useDictionaryStore();

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

const route = useRoute();
const resumeID = computed(() => route.params.id);
const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);
const isSaved = ref(false);
const isCollapsed = ref(false);
const isUpdated = ref(false);
const { providers } = useProviders();
const currencyOptions = useCurrencyOptions();

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return zod.object({
      title: zod.string().min(2),
      salary: zod.number(),
      currency: zod.string().nullable().optional(),
      place_of_work_id: zod.number().nullable(),
      professional_roles: zod.array(zod.number()).nonempty(),
      work_types: zod.array(zod.number()).nonempty(),
      schedules: zod.array(zod.number()).optional(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    return zod.object({
      title: zod.string().nullable().optional(),
      salary: zod.number().min(2),
      currency: zod.string().nullable().optional(),
      place_of_work_id: zod.number().nullable(),
      professional_roles: zod.array(zod.number()).nonempty(),
      work_types: zod.array(zod.number()).nonempty(),
      schedules: zod.array(zod.number()).optional(),
    });
  }
  return zod.object({
    title: zod.string().min(2),
    professional_roles: zod.array(zod.number()).nonempty(),
    work_types: zod.array(zod.number()).nonempty(),
    schedules: zod.array(zod.number()).optional(),
    salary: zod.number().nullable(),
    currency: zod.string(),
    place_of_work_id: zod.number().nullable(),
  });
});

const initialValues = {
  title: null,
  professional_roles: [],
  work_types: [],
  schedules: [],
  place_of_work_id: null,
  salary: null,
  currency: "RUB",
};
const { values, meta, resetForm, setErrors, validate, getErrors, errors } =
  useForm({
    initialValues: initialValues,
    initialTouched: true,
    validationSchema: toTypedSchema(schema.value),
  });

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
    professional_roles: true,
    title: true,
    schedules: true,
    work_types: true,
    place_of_work_id: null,
    salary: false,
    currency: false,
  },
  superjob: {
    professional_roles: true,
    title: true,
    schedules: null,
    work_types: false,
    place_of_work_id: false,
    salary: false,
    currency: null,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);

watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    title: newObject.title,
    salary: newObject.salary,
    currency: newObject.currency,
    place_of_work_id: newObject.place_of_work?.id ?? null,
    work_types: Object.keys(newObject.work_types).map((item) => parseInt(item)),
    schedules: Object.keys(newObject.schedules).map((item) => parseInt(item)),
    professional_roles: newObject.professional_roles.map((item) => item.id),
  };
};
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);
onMounted(() => {
  const newData = resumeStore.my_resume;
  if (newData) {
    sectionData.value = getFields(newData);
  }
});

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);

const { getPlaceOfWorks, getSchedules } = dictionaryStore;

const placeOfWorkOptions = computed(() => {
  return dictionaryStore.place_of_works.map((item) => ({
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
  getSchedules();
  getPlaceOfWorks();
});
const { errors: serverErrors, handleErrorResponse } = useFormValidation();
watch(
  () => serverErrors.value,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      const backendErrors = {};
      Object.keys(newErrors).map(
        (item) => (backendErrors[item] = newErrors[item]),
      );
      setErrors(backendErrors);
    }
  },
);

const isFocused = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.dirty) {
    return true;
  }

  if (!meta.value.valid) {
    errorMessage.value = "Запольните все поля";
    return false;
  }
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";

  let resData = await updateResume(resumeID.value, {
    ...JSON.parse(JSON.stringify(values)),
    form_data: "PROFESSION_DETAILS_DATA",
  });

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  setErrors({});
  resetForm({ values });
  isSaved.value = false;
  isUpdated.value = false;
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
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
