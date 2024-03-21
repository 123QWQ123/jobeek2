<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Тестов или экзаменов</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>
    <div
      class="text-danger d-block p-4"
      v-if="errors.message"
      v-click-outside="(e) => (errors.message = '')"
    >
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
              <CreateResumeVeeTestsAndExamsForm
                ref="educationElement"
                name="completed_test_or_exams"
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
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import useProviders from "~/composables/useProviders.js";

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
const completed_test_or_exams = ref(
  resumeStore.resume?.educations.completed_test_or_exams ?? [],
);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const { providers } = useProviders();
const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    const testScheme = z.object({
      name: z.string(),
      profession: z.string(),
      organization: z.string(),
      year: z.number(),
    });
    return z.object({
      completed_test_or_exams: z.array(testScheme).optional(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    const testScheme = z.object({
      name: z.string(),
      profession: z.string(),
      organization: z.string(),
      year: z.number(),
    });
    return z.object({
      completed_test_or_exams: z.array(testScheme).optional(),
    });
  }

  const testScheme = z.object({
    name: z.string(),
    profession: z.string(),
    organization: z.string(),
    year: z.number(),
  });
  return z.object({
    completed_test_or_exams: z.array(testScheme).optional(),
  });
});

const initialValues = ref({
  completed_test_or_exams: [],
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
  educations: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      if (newData.completed_test_or_exams?.length > 0) {
        isShown.value = true;
      }
      resetForm({ values: newData });
    }
  },
);
const getFields = (newObject) => {
  return {
    completed_test_or_exams: newObject?.educations?.completed_test_or_exams.map(
      (item) => ({
        name: item.name,
        organization: item.organization,
        profession: item.profession,
        year: item.year,
      }),
    ),
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
  () => completed_test_or_exams.value,
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
      console.log(backendErrors);
      setErrors(backendErrors);
    }
  },
);
const isFocused = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();

  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    return false;
  }
  setErrors({});
  const resData = await updateResume(resumeID.value, {
    form_data: "EDUCATION_DATA",
    educations: {
      completed_test_or_exams: values.completed_test_or_exams,
    },
    providers: getSelectedProviders(props.providers),
  });

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
};

const isCompleted = computed(() => {
  return resumeStore.resume?.educations.primary?.length > 0;
});

defineExpose({
  save,
});
</script>
