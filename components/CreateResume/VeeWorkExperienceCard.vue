<template>
  <div class="w-box" v-click-outside="save">
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
        <div class="form_content" v-if="isShown">
          <div class="row">
            <CreateResumeVeeWorkExperienceForm
              name="experience"
              ref="workExperienceElement"
            />
          </div>
        </div>

        <div class="empty-area" v-else>
          <span>Здесь вы можете указать</span>
          <button class="add" type="button" @click="isShown = !isShown">
            Добавить
          </button>
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
import { useDiff } from "~/composables/useDiff";
import { zod } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import useProviders from "~/composables/useProviders.js";
import { toTypedSchema } from "@vee-validate/zod";

const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);

const experience = ref(resumeStore.my_resume?.experience ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const { providers } = useProviders();
const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
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
      industries: zod.number().array().nonempty(),
      company_scope: zod.string().nullish().optional(),
    });
    return zod.object({
      experience: zod.array(experienceScheme).nonempty(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    const experienceScheme = zod.object({
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
    });
    return zod.object({
      experience: zod.array(experienceScheme).optional(),
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
    industries: zod.number().array().nonempty(),
    company_scope: zod.string(),
  });
  return zod.object({
    experience: zod.array(experienceScheme).nonempty(),
  });
});

const initialValues = ref({
  experience: [],
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

const sectionData = ref({
  experience: [],
});
const getFields = (newObject) => {
  return {
    experience: newObject.experience.map((item) => {
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
    }),
  };
};
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
      if (experience.value.length) {
        isShown.value = true;
      }
    }
  },
);
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = getFields(newResume);
    }
  },
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = getFields(resumeStore.my_resume);
  }
});

watch(
  () => isCollapsed.value,
  (newData) => {
    if (!newData) {
      isShown.value = true;
    }
  },
);

const { getResume, updateResume } = resumeStore;

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
    errorMessage.value = "Неправильные данные!";
    return false;
  }
  setErrors({});
  const payload = {
    form_data: "EXPERIENCE_DATA",
    ...values,
  };
  const resData = await updateResume(resumeID.value, payload);

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
  isUpdated.value = true;
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

defineExpose({
  save,
});
</script>

<style scoped></style>
