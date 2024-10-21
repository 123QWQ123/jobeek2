<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Контакты({{ isChanged }})</h3>
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
          <label>Имя:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="contacts.name"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.contacts.email.is_hidden">
          <label>Email:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="contacts.email"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.contacts.company_name.is_hidden">
          <label>Название компании:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="contacts.company_name"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.contacts.company_url.is_hidden">
          <label>Адрес сайта:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="contacts.company_url"
              placeholder="Введите"
            />
          </div>
        </div>
        <div class="input-row" v-if="!state.contacts.company_logo.is_hidden">
          <label>Лого URL:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput
              name="contacts.company_logo"
              placeholder="Введите"
            />
          </div>
        </div>

        <div
          class="input-row"
          v-if="!state.contacts.company_description.is_hidden"
        >
          <label>О компании(мин 10 символов):</label>
          <div class="input-wrapper mt-2">
            <VeeTipTapRichEditor
              name="contacts.company_description"
              placeholder="Введите"
            />
          </div>
        </div>

        <CreateVacancyVeeContactsPhones />

        <!--        {{ errors }}-->
        <!--        <br />-->
        <!--        <br />-->
        <!--        {{ meta }}-->
        <!--        <br />-->
        <!--        <br />-->

        {{ values }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import { useDiff } from "~/composables/useDiff";
import { zod } from "~/hooks/ru-zod.js";
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

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);
const dictionaryStore = useDictionaryStore();

const schema = computed(() => {
  return zod.object({
    contacts: zod.object({
      name: zod.string(),
      email: zod.string(),
      company_name: zod.string(),
      company_description: zod.string(),
      company_url: zod.string(),
      company_logo: zod.string(),
      phones: zod.object({
        phone: zod.string(),
        phone_comment: zod.string().optional().nullish(),
        additional_phone: zod.string().optional().nullish(),
        additional_phone_comment: zod.string().optional().nullish(),
      }),
    }),
  });
});

const initialValues = {
  contacts: {
    name: null,
    phones: {},
    email: null,
    company_name: null,
    company_url: null,
    company_logo: null,
    company_description: null,
  },
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
  contacts: {
    phones: {
      is_hidden: false,
    },
    name: {
      is_hidden: false,
    },
    email: {
      is_hidden: false,
    },
    company_name: {
      is_hidden: false,
    },
    company_url: {
      is_hidden: false,
    },
    company_logo: {
      is_hidden: false,
    },
    company_description: {
      is_hidden: false,
    },
  },
});

const fields = ref({
  hh: {
    contacts: true,
  },
  superjob: {
    contacts: true,
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
    contacts: {
      ...newObject.contacts,
      phones: {
        ...{
          ...newObject.contacts.phones,
          additional_phone:
            newObject.contacts.phones.additional_phone ?? undefined,
          additional_phone_comment:
            newObject.contacts.phones.additional_phone_comment ?? undefined,
        },
      },
    },
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
      resetForm({ values: { ...newData } });
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
  let jsonData = { ...JSON.parse(JSON.stringify(values)) };
  let resData = {};

  jsonData.action = "UpdateContacts";
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
