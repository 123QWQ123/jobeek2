<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Курсы</h3>
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
        <div>
          <div class="row">
            <div class="mt-3">
              <CreateResumeVeeCoursesForm
                ref="educationElement"
                name="courses"
              />
            </div>
          </div>
        </div>

        <!--        <transition>-->
        <!--          <span-->
        <!--            v-if="isSaved"-->
        <!--            class="p-3 d-inline-flex justify-content-center align-items-center"-->
        <!--            style="color: #0c0"-->
        <!--          >-->
        <!--            <svg-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--              width="24"-->
        <!--              height="24"-->
        <!--              viewBox="0 0 24 24"-->
        <!--              class="me-2"-->
        <!--            >-->
        <!--              <path-->
        <!--                fill="#0c0"-->
        <!--                d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"-->
        <!--              />-->
        <!--            </svg>-->
        <!--            Сохранен-->
        <!--          </span>-->
        <!--        </transition>-->
      </div>
    </transition>
  </div>
</template>

<script setup>
import useResumeHooks from "~/hooks/useResumeHooks";
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDictionaryStore } from "~/store/dictionary";
import { useForm } from "vee-validate";
import useProviders from "~/composables/useProviders.js";
import { toTypedSchema } from "@vee-validate/zod";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { zod } from "~/hooks/ru-zod.js";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
});

const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const educationElement = ref(null);
const isCollapsed = ref(false);
const isFocused = ref(false);
const errorMessage = ref(null);

const resumeID = computed(() => route.params.id);
const { providers } = useProviders();
const { my_resume } = storeToRefs(resumeStore);

const schema = computed(() => {
  const baseScheme = {
    organization: zod.string(),
    end_year: zod.number(),
    profession: zod.string().nullish().optional(),
    certificate_url: zod.string().nullish().optional(),
  };

  return zod.object({
    courses: zod
      .array(
        zod.object({
          ...baseScheme,
          title:
            providers.hh || (!providers.hh && !providers.superjob)
              ? zod.string()
              : zod.string().nullish().optional(),
        }),
      )
      .optional(),
  });
});

const initialValues = ref({
  courses: my_resume.value.educations?.courses.map((item) => ({
    title: item.title,
    organization: item.organization,
    profession: item.profession,
    end_year: item.end_year,
    certificate_url: item.certificate_url,
  })),
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

const { getSelectedProviders } = useResumeHooks();
const { updateResume } = resumeStore;

const { errors: serverErrors } = useFormValidation();
watch(serverErrors, (newErrors) => {
  if (Object.keys(newErrors).length) setErrors({ ...newErrors });
});

const save = async () => {
  await validate();
  if (!isFocused.value) {
    return;
  }
  if (!meta.value.dirty) return true;
  if (!meta.value.valid) return false;

  const resData = await updateResume(resumeID.value, {
    form_data: "EDUCATION_DATA",
    educations: { courses: values.courses },
    providers: getSelectedProviders(providers.value),
  });
  isFocused.value = false;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.errors) setErrors({ ...resData.errors });
    return;
  }

  errorMessage.value = null;
  resetForm({ values });
};

const isCompleted = computed(() => {
  return my_resume.value?.educations.primary?.length > 0;
});
</script>
