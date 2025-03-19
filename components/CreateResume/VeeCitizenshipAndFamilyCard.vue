<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Гражданство и Семья</h3>
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
        <div class="row w-100 mt-2" v-show="!state.citizenship.is_hidden">
          <div class="col-12">
            <label for="about_me">Гражданство</label>
            <VeeMultiSelectWithSearch
              :options="countryOptions"
              name="citizenship"
              placeholder="Выберите"
            />
          </div>
        </div>
        <div class="row w-100 mt-4">
          <div class="col-12">
            <label for="about_me">Страны разрешено работать</label>
            <VeeMultiSelectWithSearch
              :options="countryOptions"
              name="work_tickets"
              placeholder="Выберите"
            />
          </div>
        </div>
        <div class="row w-100 mt-4" v-show="!state.marital_status_id.is_hidden">
          <div class="input-row">
            <label for="remote-work">Семейное положение</label>
            <div class="input-wrapper">
              <VeeCustomSelect
                label="Выберите"
                :options="maritalStatusOptions"
                name="marital_status_id"
              ></VeeCustomSelect>
            </div>
          </div>
        </div>
        <div class="row w-100 mt-4" v-show="!state.travel_time_id.is_hidden">
          <div class="input-row">
            <label for="remote-work">Желательное время в пути до работы</label>
            <div class="input-wrapper">
              <VeeCustomSelect
                :options="travelTimeOptions"
                label="Выберите"
                name="travel_time_id"
              ></VeeCustomSelect>
            </div>
          </div>
        </div>
        <div class="row w-100 mt-4" v-show="!state.children_id.is_hidden">
          <div class="input-row">
            <label for="remote-work">Наличие детей</label>
            <div class="input-wrapper">
              <VeeCustomSelect
                :options="childrenOptions"
                label="Выберите"
                name="children_id"
              ></VeeCustomSelect>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { useDictionaryStore } from "~/store/dictionary";
import { toTypedSchema } from "@vee-validate/zod";
import { zod } from "~/hooks/ru-zod.js";
import useProviders from "~/composables/useProviders.js";
import useProviderFields from "~/composables/useProviderFields.js";

const resumeStore = useResumeStore();
const profileStore = useProfileStore();

const dictionaryStore = useDictionaryStore();

const { getCountries } = profileStore;
await getCountries();
const countryOptions = computed(() =>
  profileStore.countries.map((item) => ({ name: item.name, value: item.id })),
);
const maritalStatusOptions = computed(() =>
  dictionaryStore.resume_marital_statuses.map((item) => ({
    value: item.id,
    name: item.name,
  })),
);
const travelTimeOptions = computed(() =>
  dictionaryStore.travel_times.map((item) => ({
    value: item.id,
    name: item.name,
  })),
);
const childrenOptions = computed(() =>
  dictionaryStore.resume_children.map((item) => ({
    value: item.id,
    name: item.name,
  })),
);

const route = useRoute();
const resumeID = computed(() => route.params.id);
const { seeker } = profileStore;
const { my_resume } = storeToRefs(resumeStore);
const isCollapsed = ref(false);
const { providers } = useProviders();
const state = reactive({
  citizenship: {
    is_hidden: false,
  },
  work_tickets: {
    is_hidden: false,
  },
  children_id: {
    is_hidden: false,
  },
  marital_status_id: {
    is_hidden: false,
  },
  travel_time_id: {
    is_hidden: false,
  },
});
const fields = ref({
  hh: {
    citizenship: true,
    work_tickets: false,
    children_id: null,
    marital_status_id: null,
    travel_time_id: true,
  },
  superjob: {
    citizenship: false,
    work_tickets: null,
    travel_time_id: null,
    children_id: false,
    marital_status_id: false,
  },
});
const { walkThroughFields } = useProviderFields(state, fields);

watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

walkThroughFields(providers.value);

const schema = computed(() => {
  return zod.object({
    citizenship: zod.array(zod.number()).nonempty(),
    work_tickets: zod.number().array().nonempty(),
    marital_status_id: zod.number().optional(),
    travel_time_id: zod.number(),
    children_id: zod.number().nullable().optional(),
  });
});
const initialValues = ref({
  citizenship: my_resume.value?.citizenship.map((item) => item.id),
  work_tickets: my_resume.value?.work_tickets.map((item) => item.id),
  children_id: my_resume.value?.children?.id ?? null,
  marital_status_id: my_resume.value?.marital_status?.id ?? null,
  travel_time_id: my_resume.value?.travel_time?.id,
});
const {
  values,
  errors,
  meta,
  resetForm,
  setValues,
  setErrors,
  handleSubmit,
  validate,
} = useForm({
  initialValues: initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

const { updateResume } = resumeStore;

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
const errorMessage = ref(null);

const save = async (is_from_parent = false) => {
  await validate();
  if (!meta.value.dirty || !meta.value.valid) return false;

  const resData = await updateResume(resumeID.value, {
    form_data: "CITIZENSHIP_AND_FAMILY_DATA",
    ...values,
  });

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    resData.errors && setErrors(resData.errors);
    return false;
  }

  resetForm({ values });
  return is_from_parent ? Promise.resolve(true) : true;
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  return Boolean(
    myResume?.citizenship?.length &&
      myResume.travel_time?.id &&
      myResume.marital_status?.id &&
      myResume.children?.id,
  );
});

defineExpose({
  save,
});
</script>
