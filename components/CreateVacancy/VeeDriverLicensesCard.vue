<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Водительские права</h3>
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
        <CreateResumeDriverLicensesForm name="driver_license_types" />
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

const schema = computed(() => {
  return zod.object({
    driver_license_types: zod.array(zod.number()).nonempty(),
  });
});

const initialValues = {
  driver_license_types: my_vacancy.value.driver_license_types.map(
    (item) => item.id,
  ),
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
  driver_license_types: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    driver_license_types: true,
  },
  superjob: {
    driver_license_types: true,
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
    driver_license_types: newObject.driver_license_types.map((item) => item.id),
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

  jsonData.action = "UpdateDriverLicenseTypes";
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
