<template>
  <div v-if="isHidden" class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Биллинг({{ isChanged }})</h3>
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
              :options="vacancyBillingTypeOptions"
              name="billing_type_id"
              label="Выберите"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy.js";
import { useProfileStore } from "~/store/profile.js";
import { useRuntimeConfig } from "#app";
import { useDiff } from "~/composables/useDiff.js";
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
const isHidden = ref(providers.value.hh ?? false);
watch(
  () => providers.value,
  (newProviders) => {
    isHidden.value = newProviders?.hh;
  },
);
const vacancyBillingTypeOptions = computed(() => {
  return dictionaryStore.vacancy_billing_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

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

const schema = computed(() => {
  // if (providers.value.hh === true && providers.value.superjob === false) {
  //   return z.object({
  //     billing_type_id: z.number(),
  //   });
  // }
  // if (providers.value.hh === false && providers.value.superjob === true) {
  //   return z.object({
  //     billing_type_id: z.number(),
  //   });
  // }
  return zod.object({
    billing_type_id: zod.number(),
  });
});

const initialValues = {
  billing_type_id: null,
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
  billing_type_id: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    billing_type_id: true,
  },
  superjob: {
    billing_type_id: null,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
walkThroughFields(providers.value);
const dictionaryStore = useDictionaryStore();

const { getVacancyBillingTypes } = dictionaryStore;

onMounted(() => {
  walkThroughFields(providers.value);
  const newData = vacancyStore.my_vacancy;
  if (newData) {
    sectionData.value = getFields(newData);
  }
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    billing_type_id: newObject.billing_type?.id,
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
  await validate();
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
  jsonData.action = "UpdateBillingType";
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
