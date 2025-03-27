<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
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
              <ResumeTextInput name="title" :value="my_resume.title" />
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
const isCollapsed = ref(false);
const { providers } = useProviders();
const currencyOptions = useCurrencyOptions();

const schema = computed(() => {
  const baseSchema = {
    professional_roles: zod.array(zod.number()).nonempty(),
    work_types: zod.array(zod.number()).nonempty(),
    schedules: zod.array(zod.number()).optional(),
    place_of_work_id: zod.number().nullable(),
    salary: zod.number().nullable(),
  };

  if (providers.value.hh && !providers.value.superjob) {
    return zod.object({
      ...baseSchema,
      title: zod.string().min(2),
      currency: zod.string().nullable().optional(),
    });
  }

  if (!providers.value.hh && providers.value.superjob) {
    return zod.object({
      ...baseSchema,
      title: zod.string().nullable().optional(),
      salary: zod.number().min(2),
      currency: zod.string().nullable().optional(),
    });
  }

  return zod.object({
    ...baseSchema,
    title: zod.string().min(2),
    currency: zod.string(),
  });
});

// todo попросить Унана переделать формат ответа: work_types:{81: "Полная занятость", 82: "Частичная занятость", 83: "Временная работа", 88: "Проектная работа"}
const initialValues = {
  title: my_resume.value?.title ?? "",
  professional_roles:
    my_resume.value?.professional_roles.map((item) => item.id) ?? [],
  work_types: Object.keys(my_resume.value?.work_types).map(Number) ?? [],
  schedules: Object.keys(my_resume.value?.schedules).map(Number) ?? [],
  place_of_work_id: my_resume.value?.place_of_work?.id ?? null,
  salary: my_resume.value?.salary ?? null,
  currency: my_resume.value?.currency ?? "RUB",
};
const { values, meta, resetForm, setErrors, validate, errors } = useForm({
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

walkThroughFields(providers.value);

const placeOfWorkOptions = computed(() =>
  dictionaryStore.place_of_works.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);

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
  if (!isFocused.value || !meta.value.dirty || !meta.value.valid) {
    return false;
  }

  setErrors({});
  errorMessage.value = "";
  isFocused.value = false;

  try {
    const resData = await updateResume(resumeID.value, {
      ...values,
      form_data: "PROFESSION_DETAILS_DATA",
    });
    resetForm({ values });
    if (resData.status !== "success") {
      errorMessage.value = resData.message;
      if (resData.errors) setErrors(resData.errors);
      return false;
    }

    return is_from_parent ? Promise.resolve(true) : true;
  } catch (error) {
    errorMessage.value = "Произошла ошибка при сохранении";
    return false;
  }
};

const isCompleted = computed(() => {
  return my_resume.value?.address?.address && !isCollapsed.value;
});
</script>
