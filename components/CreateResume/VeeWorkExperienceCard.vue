<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Опыт работы</h3>
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
        <div class="form_content">
          <div class="row">
            <CreateResumeVeeWorkExperienceForm
              name="experience"
              ref="workExperienceElement"
            />
          </div>
        </div>

        <div class="text-danger">
          <ErrorMessage name="experience" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { zod } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: false,
  },
  errors: {
    default: {},
    required: false,
  },
});

const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);

const { my_resume, providers } = storeToRefs(resumeStore);
const experience = ref(my_resume.value?.experience ?? []);

const isCollapsed = ref(false);
const schema = computed(() => {
  if (providers.value.hh && !providers.value.superjob) {
    const experienceScheme = zod.object({
      profession: zod.string(),
      responsibilities: zod.string(),
      company: zod.string(),
      achievements: zod.string(),
      start_year: zod.number(),
      start_month: zod.string(),
      end_year: zod.number(),
      end_month: zod.string(),
      until_today: zod.boolean().nullable().optional(),
      city_id: zod.number(),
      // city_name: z.boolean().nullable().optional(),
      company_url: zod.string().nullish().optional(),
      industries: zod.number().array().min(1, "Обязательное поле"),
      company_scope: zod.string().nullish().optional(),
    });
    return zod.object({
      experience: zod.array(experienceScheme).min(1, "Обязательное поле"),
    });
  }
  if (!providers.value.hh && providers.value.superjob) {
    const experienceScheme = zod
      .object({
        profession: zod.string(),
        responsibilities: zod.string(),
        company: zod.string(),
        achievements: zod.string().nullable(),
        start_year: zod.number(),
        start_month: zod.string(),
        end_year: zod.number().nullish().optional(),
        end_month: zod.string().nullish().optional(),
        until_today: zod.boolean().nullable().optional(),
        city_id: zod.number(),
        // city_name: z.boolean().nullable().optional(),
        company_url: zod.string().nullish().optional(),
        industries: zod.number().array().nullable(),
        company_scope: zod.string().nullish().optional(),
      })
      .nullable();
    return zod.object({
      experience: zod.array(experienceScheme).nullable(),
    });
  }

  const experienceScheme = zod.object({
    profession: zod.string(),
    responsibilities: zod.string(),
    company: zod.string(),
    achievements: zod.string(),
    start_year: zod.number(),
    start_month: zod.string(),
    end_year: zod.number(),
    end_month: zod.string(),
    until_today: zod.boolean().nullable().optional(),
    city_id: zod.number(),
    // city_name: z.boolean().nullable().optional(),
    company_url: zod.string(),
    industries: zod.number().array().min(1, "Обязательное поле"),
    company_scope: zod.string(),
  });
  return zod.object({
    experience: zod.array(experienceScheme).nullable(),
  });
});

const initialValues = ref({
  experience:
    my_resume.value.experience?.length > 0
      ? my_resume.value.experience?.map((item) => {
          return {
            industries: item.industries.map((sub_item) => sub_item.id) ?? [],
            city_id: item.city?.id,
            end_month: String(item.end_month).padStart(2, 0),
            start_month: String(item.start_month).padStart(2, 0),
            profession: item.profession,
            company: item.company,
            company_url: item.company_url,
            company_scope: item.company_scope,
            start_year: item.start_year,
            end_year: item.end_year,
            until_today: item.until_today,
            responsibilities: item.responsibilities,
            achievements: item.achievements,
          };
        })
      : null,
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
const isLoading = ref(false);
const save = async (is_from_parent = false) => {
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }

  const payload = {
    form_data: "EXPERIENCE_DATA",
    ...values,
  };
  const resData = await updateResume(resumeID.value, payload);
  isFocused.value = false;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  errorMessage.value = "";
  setErrors({});
  resetForm({ values });
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};

const isCompleted = computed(() => {
  return resumeStore.resume?.work_histories?.length > 0;
});

watch(
  () => props.errors,
  (newVal) => {
    setErrors(newVal);
  },
  { immediate: true },
);
</script>

<style scoped></style>
