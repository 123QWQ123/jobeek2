<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Тип вакансии({{ isChanged }})</h3>
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
      <div class="w-box-body" :class="{ collapse: isCollapsed }">
        <div class="input-row">
          <label>Тип вакансии:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              name="type_id"
              :options="dictionaryStore.vacancy_types_formatted"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="isAnonymous">
          <label>название компании для анонимных вакансий:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="custom_employer_name"
              placeholder="ООО"
            />
          </div>
        </div>

        <div class="input-row" v-if="isDirect">
          <label>URL отклика для прямых вакансий:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="response_url"
              placeholder="https://"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import { useDiff } from "~/composables/useDiff";
import { z } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import useProviderFields from "~/composables/useProviderFields.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import useProviders from "~/composables/useProviders.js";

const props = defineProps(["title"]);

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { providers } = useProviders();
const ID = computed(() => route.params.id);
const type = computed(() => route.query.type);
const { updateVacancy, updateDraft, getMyVacancy, getMyDraft } = vacancyStore;

const { employer } = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isAnonymous = computed(() => {
  if (values) {
    return values.type_id?.toString() === "48";
  }
  return false;
});
const isDirect = computed(() => {
  if (values) {
    return values.type_id?.toString() === "49";
  }
  return false;
});

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return z
      .object({
        type_id: z.number(),
        custom_employer_name: z.string().nullable(),
        response_url: z.string().nullable(),
      })
      .refine((data) => data.type_id === 48, {
        message: "custom_employer_name field is required",
        path: ["custom_employer_name"], // Pointing out which field is invalid
      });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    return z
      .object({
        type_id: z.number(),
        custom_employer_name: z.string().optional(),
        response_url: z.string().optional(),
      })
      .refine((data) => data.type_id === 48, {
        message: "custom_employer_name field is required",
        path: ["custom_employer_name"], // Pointing out which field is invalid
      });
  }
  return z.object({
    type_id: z.number(),
    custom_employer_name: z.string().nullable(),
    response_url: z.string().nullable(),
  });
});

const initialValues = {
  type_id: null,
};
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

const state = reactive({
  type_id: {
    is_hidden: false,
  },
  custom_employer_name: {
    is_hidden: false,
  },
  response_url: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    type_id: true,
    custom_employer_name: true,
    response_url: true,
  },
  superjob: {
    type_id: true,
    custom_employer_name: true,
    response_url: true,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
walkThroughFields(providers.value);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    type_id: newObject.type?.id,
    custom_employer_name: newObject.custom_employer_name,
    response_url: newObject.response_url,
  };
};
watch(
  () => vacancyStore.my_vacancy,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);

const dictionaryStore = useDictionaryStore();

const { getVacancyTypes } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getVacancyTypes();
  }, 500);
});
onMounted(() => {
  const newData = vacancyStore.my_vacancy;
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
  let jsonData = { ...values };
  let resData = {};

  jsonData.action = "UpdateType";
  if (type.value === "draft") {
    resData = await updateDraft(ID.value, jsonData);
  } else {
    resData = await updateVacancy(ID.value, jsonData);
  }

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
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
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return myVacancy.type_id !== null;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style>
.from-to-block {
}
</style>
