<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Языки</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <CreateResumeForeignLanguagesVeeForm
          v-if="my_resume"
          name="languages"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";

import { useResumeStore } from "~/store/resume";

import { toTypedSchema } from "@vee-validate/zod";
import { z } from "~/hooks/ru-zod.js";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
});

const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const schema = computed(() => {
  return toTypedSchema(
    z.object({
      languages: z.array(
        z.object({
          language_id: z.number(),
          level_id: z.number(),
        }),
      ),
    }),
  );
});

const initialValues = ref({
  languages: [],
});
const {
  errors,
  values,
  setErrors,
  meta,
  validate,
  setValues,
  resetForm,
  resetField,
} = useForm({
  initialValues: initialValues,
  validationSchema: schema.value,
});

const fields = ref({
  hh: {
    languages: true,
  },
  superjob: {
    languages: true,
  },
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    languages: newObject.languages.map((item) => ({
      language_id: item.language.id,
      level_id: item.level.id,
    })),
  };
};
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = getFields(newResume);
    }
  },
);
onMounted(() => {
  const newResume = resumeStore.my_resume;
  if (newResume) {
    sectionData.value = getFields(newResume);
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
const isLoading = ref(false);
const save = async (is_from_parent = false) => {
  validate();

  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    return false;
  }
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";
  let resData = {};
  const jsonData = { ...values };

  jsonData.form_data = "LANGUAGES_DATA";

  resData = await updateResume(resumeID.value, jsonData);

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;
  setErrors({});
  resetForm({ values });
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  return true;
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

<style></style>
