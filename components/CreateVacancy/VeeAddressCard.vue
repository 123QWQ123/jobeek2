<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Адрес({{ isChanged }})</h3>
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
        <div class="input-row" v-if="!state.address_id.is_hidden">
          <label>Список Адресов компании:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="dictionaryStore.addresses_formatted"
              name="address_id"
              label="Выберите"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.address.is_hidden">
          <label>Адрес:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyTextInput name="address" placeholder="Введите" />
          </div>
        </div>

        <div class="input-row" v-if="!state.show_metro_only.is_hidden">
          <label>Метро:</label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCheckboxInput
              name="show_metro_only"
              label="показывать только метро для указанного адреса"
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
const { searchAddresses } = dictionaryStore;
const addressErrorMessage = ref(null);
onMounted(() => {
  setTimeout(async () => {
    if (props.providers.hh) {
      const resData = await searchAddresses();
      if (resData.hasOwnProperty("message")) {
        addressErrorMessage.value = resData.message;
      }
    }
  }, 500);
});

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const schema = computed(() => {
  return zod.object({
    address: zod.object({
      address_id: zod.number(),
      address: zod.string(),
      show_metro_only: zod.boolean(),
    }),
  });
});

const initialValues = {
  address: {
    address_id: null,
    address: null,
    show_metro_only: false,
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
  address: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    address: true,
  },
  superjob: {
    address: true,
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
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }
  isFocused.value = false;
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
