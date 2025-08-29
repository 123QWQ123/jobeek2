<template>
  <div class="w-box" v-click-outside="save">
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
        <div class="" v-if="isShown">
          <div class="row">
            <div class="mt-3">
              <CreateResumeVeeCoursesForm
                ref="educationElement"
                name="courses"
              />
            </div>
          </div>
        </div>
        <div class="empty-area" v-else>
          <span>Здесь вы можете указать</span>
          <button class="add" type="button" @click="isShown = !isShown">
            Добавить
          </button>
        </div>

        <transition>
          <span
            v-if="isSaved"
            class="p-3 d-inline-flex justify-content-center align-items-center"
            style="color: #0c0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="me-2"
            >
              <path
                fill="#0c0"
                d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"
              />
            </svg>
            Сохранен
          </span>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useResumeHooks from "~/hooks/useResumeHooks";
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { zod } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

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
    required: true,
  },
});

const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);
const dictionaryStore = useDictionaryStore();
const courses = ref(resumeStore.resume?.educations.courses ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const coursesScheme = zod.object({
  title: zod.string(),
  profession: zod.string(),
  organization: zod.string(),
  certificate_url: zod.string(),
  end_year: zod.number(),
});
const schema = computed(() => {
  const s = toTypedSchema(
    zod.object({
      courses: zod.array(coursesScheme).optional(),
    }),
  );
  return s;
});

const initialValues = ref({
  courses: [],
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
  validationSchema: schema,
});

const sectionData = ref({
  courses: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      if (newData.courses?.length > 0) {
        isShown.value = true;
      }
      resetForm({ values: newData });
    }
  },
);
const getFields = (newObject) => {
  return {
    courses: newObject?.educations?.courses.map((item) => ({
      title: item.title,
      organization: item.organization,
      profession: item.profession,
      end_year: item.end_year,
      certificate_url: item.certificate_url,
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

watch(
  () => courses.value,
  (newData) => {
    isChanged.value = true;
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

const { getSelectedProviders } = useResumeHooks();
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
const save = async (is_from_parent = false) => {
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }
  isFocused.value = false;
  const resData = await updateResume(resumeID.value, {
    form_data: "EDUCATION_DATA",
    educations: {
      courses: values.courses,
    },
    providers: getSelectedProviders(props.providers),
  });

  if (resData.status !== "success") {
    return handleErrorResponse(resData.data, true);
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = true;

  resetForm({ values });
};

const isCompleted = computed(() => {
  return resumeStore.resume?.educations.primary?.length > 0;
});

defineExpose({
  save,
});
</script>
