<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Языки</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div v-if="errorMessage" class="text-danger">
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
import { useRoute } from "vue-router";
import { computed, ref, watch, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useResumeStore } from "~/store/resume";
import useFormValidation from "~/composables/useFormValidation";
import { zod } from "~/hooks/ru-zod.js";

const route = useRoute();
const resumeStore = useResumeStore();
const { updateResume } = resumeStore;

const resumeID = computed(() => route.params.id);
const my_resume = computed(() => resumeStore.my_resume);
const isCollapsed = ref(false);
const isFocused = ref(false);
const errorMessage = ref("");

const schema = toTypedSchema(
  zod.object({
    languages: zod.array(
      zod.object({
        language_id: zod.number(),
        level_id: zod.number(),
      }),
    ),
  }),
);

const initialValues = computed(() => ({
  languages:
    my_resume.value?.languages.map(({ language, level }) => ({
      language_id: language.id,
      level_id: level.id,
    })) || [],
}));

const { values, meta, errors, validate, setErrors, resetForm } = useForm({
  initialValues: initialValues.value,
  validationSchema: schema,
});

watch(my_resume, (newResume) => {
  resetForm({ values: initialValues.value });
});

const { errors: serverErrors } = useFormValidation();
watch(serverErrors, (newErrors) => {
  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
  }
});

const save = async () => {
  await validate();
  if (!isFocused.value) {
    return;
  }
  if (!meta.value.dirty) return true;
  if (!meta.value.valid) return false;

  errorMessage.value = "";
  const jsonData = { ...values, form_data: "LANGUAGES_DATA" };

  const resData = await updateResume(resumeID.value, jsonData);
  isFocused.value = false;
  if (resData.status !== "success") {
    errorMessage.value = resData.message || "Ошибка сервера";
    if (resData.errors) setErrors(resData.errors);
    return false;
  }

  resetForm({ values });
  return true;
};

const isCompleted = computed(() => {
  const address = my_resume.value?.address;
  return Boolean(address?.address && !isCollapsed.value);
});
</script>

<style></style>
